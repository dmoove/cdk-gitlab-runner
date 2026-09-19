import { Duration, Stack } from 'aws-cdk-lib';
import {
  IAutoScalingGroup,
  LifecycleTransition,
} from 'aws-cdk-lib/aws-autoscaling';
import { Rule } from 'aws-cdk-lib/aws-events';
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
  Chain,
  Choice,
  Condition,
  DefinitionBody,
  Fail,
  IStateMachine,
  JsonPath,
  LogLevel,
  Pass,
  StateMachine,
  Succeed,
  TaskInput,
  Wait,
  WaitTime,
} from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import { DrainFunction, DrainFunctionProps } from './drain-function';

/**
 * Properties for {@link DrainStateMachine}.
 */
export interface DrainStateMachineProps {
  /**
   * Configuration for the underlying {@link DrainFunction}.
   */
  readonly functionProps: DrainFunctionProps;
  /**
   * AutoScaling group that hosts the runner instances.
   */
  readonly autoScalingGroup: IAutoScalingGroup;
  /**
   * How long the state machine waits for running jobs before the instance
   * is terminated anyway. Also used as the heartbeat timeout of the
   * lifecycle hook.
   *
   * @default Duration.minutes(60)
   */
  readonly maxDrainDuration?: Duration;
  /**
   * Interval between two checks for running jobs.
   *
   * @default Duration.minutes(5)
   */
  readonly drainInterval?: Duration;
}

/**
 * Exposed interface of a drain state machine construct.
 */
export interface IDrainStateMachine {
  /**
   * Lambda function responsible for draining the instance.
   */
  readonly drainFunction: DrainFunction;
  /**
   * Step Functions state machine used for draining.
   */
  readonly stateMachine: IStateMachine;
}

/**
 * Construct that provisions the resources required to gracefully drain and
 * terminate runner instances.
 *
 * An AutoScaling lifecycle hook holds terminating instances. An EventBridge
 * rule starts the state machine, which pauses the runner through the
 * {@link DrainFunction} and re-checks every `drainInterval` until no job is
 * running. Then the runner is deleted from GitLab and the instance is
 * released. After `maxDrainDuration` the lifecycle action is abandoned so a
 * stuck job cannot block scale-in forever.
 */
export class DrainStateMachine extends Construct implements IDrainStateMachine {
  readonly drainFunction: DrainFunction;
  readonly stateMachine: IStateMachine;
  private readonly maxDrainDuration: Duration;
  private readonly drainInterval: Duration;

  /**
   * Create a new drain state machine.
   *
   * @param scope - construct scope
   * @param id - id of the construct
   * @param props - configuration for the drain behaviour
   */
  constructor(scope: Construct, id: string, props: DrainStateMachineProps) {
    super(scope, id);

    this.maxDrainDuration = props.maxDrainDuration ?? Duration.minutes(60);
    this.drainInterval = props.drainInterval ?? Duration.minutes(5);
    if (this.drainInterval.toSeconds() > this.maxDrainDuration.toSeconds()) {
      throw new Error('drainInterval must not exceed maxDrainDuration');
    }

    this.drainFunction = this.createDrainFunction(props);
    const drainLogGroup = this.createLogGroup();
    const definition = this.createStateMachineDefinition();
    this.stateMachine = this.createStateMachine(definition, drainLogGroup);

    this.createLifecycleHook(props);
  }

  /**
   * Number of drain attempts before the lifecycle action is abandoned.
   */
  private get maxAttempts(): number {
    return Math.max(
      1,
      Math.floor(
        this.maxDrainDuration.toSeconds() / this.drainInterval.toSeconds(),
      ),
    );
  }

  /**
   * Create the lambda function which handles the draining logic.
   */
  private createDrainFunction(props: DrainStateMachineProps): DrainFunction {
    return new DrainFunction(this, 'DrainFunction', {
      gitEndpoint: props.functionProps.gitEndpoint,
      secret: props.functionProps.secret,
      autoScalingGroup: props.autoScalingGroup,
    });
  }

  /**
   * Create a log group for state machine logs.
   */
  private createLogGroup(): LogGroup {
    return new LogGroup(this, 'LogGroup', {
      retention: RetentionDays.ONE_MONTH,
    });
  }

  /**
   * Build the step function definition that manages the drain process.
   *
   * ```
   * Init -> Drain -> Choice -+- drained  -> Succeed
   *           ^              +- draining, attempts < max -> Increment -> Wait -+
   *           |              +- draining, attempts >= max -> Abandon -> Fail   |
   *           |              +- otherwise -> Fail                              |
   *           +----------------------------------------------------------------+
   * ```
   */
  private createStateMachineDefinition(): Chain {
    const init = new Pass(this, 'Init', {
      result: { value: { attempts: 0 } },
      resultPath: '$.drain',
    });

    const drainTask = new LambdaInvoke(this, 'Drain', {
      lambdaFunction: this.drainFunction,
      payload: TaskInput.fromObject({
        detail: JsonPath.objectAt('$.detail'),
        action: 'drain',
      }),
      resultSelector: { 'status.$': '$.Payload.status' },
      resultPath: '$.taskresult',
      retryOnServiceExceptions: true,
    });

    const abandonTask = new LambdaInvoke(this, 'Abandon', {
      lambdaFunction: this.drainFunction,
      payload: TaskInput.fromObject({
        detail: JsonPath.objectAt('$.detail'),
        action: 'abandon',
      }),
      resultPath: '$.taskresult',
    });

    const increment = new Pass(this, 'Increment', {
      parameters: {
        'attempts.$': 'States.MathAdd($.drain.attempts, 1)',
      },
      resultPath: '$.drain',
    });

    const wait = new Wait(this, 'Wait', {
      time: WaitTime.duration(this.drainInterval),
    });

    const succeed = new Succeed(this, 'Drained');
    const abandoned = new Fail(this, 'Abandoned', {
      error: 'DrainTimeout',
      cause: `Runner still had running jobs after ${this.maxDrainDuration.toHumanString()}`,
    });
    const failed = new Fail(this, 'Failed', {
      error: 'DrainFailed',
      cause: 'Drain function returned an unexpected status',
    });

    const draining = Condition.stringEquals('$.taskresult.status', 'draining');

    const choice = new Choice(this, 'CheckStatus')
      .when(Condition.stringEquals('$.taskresult.status', 'drained'), succeed)
      .when(
        Condition.and(
          draining,
          Condition.numberLessThan('$.drain.attempts', this.maxAttempts),
        ),
        increment.next(wait).next(drainTask),
      )
      .when(draining, abandonTask.next(abandoned))
      .otherwise(failed);

    return Chain.start(init).next(drainTask).next(choice);
  }

  /**
   * Instantiate the state machine resource.
   */
  private createStateMachine(
    definition: Chain,
    drainLogGroup: LogGroup,
  ): StateMachine {
    return new StateMachine(this, 'GitLabTerminateStateMachine', {
      definitionBody: DefinitionBody.fromChainable(definition),
      timeout: this.maxDrainDuration.plus(Duration.minutes(10)),
      logs: {
        destination: drainLogGroup,
        level: LogLevel.ALL,
      },
    });
  }

  /**
   * Create an AutoScaling lifecycle hook to start the state machine on
   * instance termination.
   */
  private createLifecycleHook(props: DrainStateMachineProps): void {
    const lifecycleHookTerminate = props.autoScalingGroup.addLifecycleHook(
      'TerminateLifecycle',
      {
        lifecycleTransition: LifecycleTransition.INSTANCE_TERMINATING,
        heartbeatTimeout: this.maxDrainDuration,
      },
    );

    new Rule(this, 'eventRule', {
      eventPattern: {
        account: [Stack.of(this).account],
        detailType: ['EC2 Instance-terminate Lifecycle Action'],
        detail: {
          AutoScalingGroupName: [props.autoScalingGroup.autoScalingGroupName],
          LifecycleHookName: [lifecycleHookTerminate.lifecycleHookName],
        },
      },
    }).addTarget(new SfnStateMachine(this.stateMachine));
  }
}
