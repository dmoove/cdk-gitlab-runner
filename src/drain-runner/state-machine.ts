import { Duration, Stack } from 'aws-cdk-lib';
import {
  IAutoScalingGroup,
  LifecycleTransition,
} from 'aws-cdk-lib/aws-autoscaling';
import { Rule } from 'aws-cdk-lib/aws-events';
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
  Chain,
  Choice,
  Condition,
  Fail,
  IStateMachine,
  LogLevel,
  StateMachine,
  Succeed,
  Wait,
  WaitTime,
  DefinitionBody,
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
 * A Lambda function is invoked through a Step Functions state machine which is
 * triggered by AutoScaling lifecycle hooks. The function pauses the runner and
 * waits until no jobs are running before allowing the instance to terminate.
 */
export class DrainStateMachine extends Construct implements IDrainStateMachine {
  readonly drainFunction: DrainFunction;
  readonly stateMachine: IStateMachine;

  /**
   * Create a new drain state machine.
   *
   * @param scope - construct scope
   * @param id - id of the construct
   * @param props - configuration for the drain behaviour
   */
  constructor(scope: Construct, id: string, props: DrainStateMachineProps) {
    super(scope, id);

    this.drainFunction = this.createDrainFunction(props);
    const drainLogGroup = this.createLogGroup();
    const definition = this.createStateMachineDefinition();
    this.stateMachine = this.createStateMachine(definition, drainLogGroup);

    this.attachPolicies(props);
    this.createLifecycleHook(props);
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
   */
  private createStateMachineDefinition(): Chain {
    const terminateTask = new LambdaInvoke(this, 'terminateTask', {
      lambdaFunction: this.drainFunction,
      resultPath: '$.taskresult',
    });

    const choiceState = new Choice(this, 'choiceState');

    const waitState = new Wait(this, 'waitState', {
      time: WaitTime.duration(Duration.minutes(5)),
    }).next(terminateTask);

    const successState = new Succeed(this, 'successState');
    const failState = new Fail(this, 'failState');

    return Chain.start(terminateTask).next(
      choiceState
        .when(
          Condition.stringEquals('$.taskresult.Payload.body', 'Success'),
          successState,
        )
        .when(
          Condition.stringEquals('$.taskresult.Payload.body', 'Heartbeat'),
          waitState,
        )
        .otherwise(failState),
    );
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
      logs: {
        destination: drainLogGroup,
        level: LogLevel.ERROR,
      },
    });
  }

  /**
   * Attach IAM permissions required by the drain function.
   */
  private attachPolicies(props: DrainStateMachineProps): void {
    this.drainFunction.addToRolePolicy(
      new PolicyStatement({
        actions: ['ec2:DescribeInstances'],
        resources: ['*'],
      }),
    );

    this.drainFunction.addToRolePolicy(
      new PolicyStatement({
        actions: [
          'autoscaling:RecordLifecycleActionHeartbeat',
          'autoscaling:CompleteLifecycleAction',
        ],
        resources: [props.autoScalingGroup.autoScalingGroupArn],
      }),
    );
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
        heartbeatTimeout: Duration.minutes(30),
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
