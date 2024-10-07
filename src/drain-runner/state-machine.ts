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

export interface DrainStateMachineProps {
  readonly functionProps: DrainFunctionProps;
  readonly autoScalingGroup: IAutoScalingGroup;
}

export interface IDrainStateMachine {
  readonly drainFunction: DrainFunction;
  readonly stateMachine: IStateMachine;
}

export class DrainStateMachine extends Construct implements IDrainStateMachine {
  readonly drainFunction: DrainFunction;
  readonly stateMachine: IStateMachine;

  constructor(scope: Construct, id: string, props: DrainStateMachineProps) {
    super(scope, id);

    this.drainFunction = this.createDrainFunction(props);
    const drainLogGroup = this.createLogGroup();
    const definition = this.createStateMachineDefinition();
    this.stateMachine = this.createStateMachine(definition, drainLogGroup);

    this.attachPolicies(props);
    this.createLifecycleHook(props);
  }

  private createDrainFunction(props: DrainStateMachineProps): DrainFunction {
    return new DrainFunction(this, 'DrainFunction', {
      gitEndpoint: props.functionProps.gitEndpoint,
      secret: props.functionProps.secret,
      autoScalingGroup: props.autoScalingGroup,
    });
  }

  private createLogGroup(): LogGroup {
    return new LogGroup(this, 'LogGroup', {
      retention: RetentionDays.ONE_MONTH,
    });
  }

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
