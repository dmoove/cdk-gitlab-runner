import { Duration, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { AmazonLinuxImage, InstanceType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { DrainFunction } from '../src/drain-runner/drain-function';
import { DrainStateMachine } from '../src/drain-runner/state-machine';

describe('DrainFunction', () => {
  let stack: Stack;
  let secret: Secret;
  let asg: AutoScalingGroup;
  let template: Template;

  beforeEach(() => {
    stack = new Stack();
    secret = new Secret(stack, 'Secret');
    const vpc = new Vpc(stack, 'VPC');
    asg = new AutoScalingGroup(stack, 'ASG', {
      instanceType: new InstanceType('t2.micro'),
      machineImage: new AmazonLinuxImage(),
      vpc,
    });
    new DrainFunction(stack, 'DrainFunction', {
      secret: secret,
      gitEndpoint: 'https://gitlab.com',
      autoScalingGroup: asg,
    });
    template = Template.fromStack(stack);
  });

  it('uses a supported runtime and the bundled handler', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs22.x',
      Handler: 'index.handler',
      Architectures: ['arm64'],
      Environment: {
        Variables: {
          SECRET_ARN: Match.objectLike({
            Ref: Match.stringLikeRegexp('Secret'),
          }),
          GIT_ENDPOINT: 'https://gitlab.com',
        },
      },
    });
  });

  it('adds the necessary policies to the role exactly once', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          {
            Action: 'ec2:DescribeTags',
            Effect: 'Allow',
            Resource: '*',
          },
          {
            Action: [
              'autoscaling:RecordLifecycleActionHeartbeat',
              'autoscaling:CompleteLifecycleAction',
            ],
            Effect: 'Allow',
            Resource: Match.objectLike({
              'Fn::Join': Match.anyValue(),
            }),
          },
        ]),
      },
    });
    template.resourceCountIs('AWS::IAM::Policy', 1);
  });
});

describe('DrainStateMachine', () => {
  let stack: Stack;
  let asg: AutoScalingGroup;

  beforeEach(() => {
    stack = new Stack();
    const vpc = new Vpc(stack, 'VPC');
    asg = new AutoScalingGroup(stack, 'ASG', {
      instanceType: new InstanceType('t2.micro'),
      machineImage: new AmazonLinuxImage(),
      vpc,
    });
  });

  it('creates a lifecycle hook, rule and state machine with a bounded wait', () => {
    new DrainStateMachine(stack, 'Drain', {
      autoScalingGroup: asg,
      functionProps: {
        secret: new Secret(stack, 'Secret'),
        gitEndpoint: 'https://gitlab.com',
        autoScalingGroup: asg,
      },
      maxDrainDuration: Duration.minutes(30),
      drainInterval: Duration.minutes(10),
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::AutoScaling::LifecycleHook', {
      LifecycleTransition: 'autoscaling:EC2_INSTANCE_TERMINATING',
      HeartbeatTimeout: 1800,
    });
    template.hasResourceProperties('AWS::Events::Rule', {
      EventPattern: Match.objectLike({
        'detail-type': ['EC2 Instance-terminate Lifecycle Action'],
      }),
    });
    const [stateMachine] = Object.values(
      template.findResources('AWS::StepFunctions::StateMachine'),
    ) as { Properties: { DefinitionString: unknown } }[];
    // The definition is an Fn::Join of escaped JSON fragments; unescape once.
    const definition = JSON.stringify(
      stateMachine.Properties.DefinitionString,
    ).replace(/\\+"/g, '"');
    expect(definition).toContain('"TimeoutSeconds":2400');
    expect(definition).toContain('"NumericLessThan":3');
    expect(definition).toContain('States.MathAdd');
    expect(definition).toContain('"Seconds":600');
    expect(definition).toContain('"action":"abandon"');
    // drain function, state machine role, EventBridge target role
    template.resourceCountIs('AWS::IAM::Policy', 3);
  });

  it('rejects an interval longer than the maximum duration', () => {
    expect(
      () =>
        new DrainStateMachine(stack, 'Drain', {
          autoScalingGroup: asg,
          functionProps: {
            secret: new Secret(stack, 'Secret'),
            gitEndpoint: 'https://gitlab.com',
            autoScalingGroup: asg,
          },
          maxDrainDuration: Duration.minutes(5),
          drainInterval: Duration.minutes(10),
        }),
    ).toThrow('drainInterval must not exceed maxDrainDuration');
  });
});
