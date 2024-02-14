import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { AmazonLinuxImage, InstanceType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { DrainFunction } from '../src/drain-runner/drain-function';

describe('DrainFunction', () => {
  let stack: Stack;
  let secret: Secret;
  let vpc: Vpc;
  let asg: AutoScalingGroup;
  let drainFunction: DrainFunction;
  let template: Template;

  beforeEach(() => {
    stack = new Stack();
    secret = new Secret(stack, 'Secret');
    vpc = new Vpc(stack, 'VPC');
    asg = new AutoScalingGroup(stack, 'ASG', {
      instanceType: new InstanceType('t2.micro'),
      machineImage: new AmazonLinuxImage(),
      vpc,
    });
    drainFunction = new DrainFunction(stack, 'DrainFunction', {
      secret: secret,
      gitEndpoint: 'https://gitlab.com',
      autoScalingGroup: asg,
    });
    template = Template.fromStack(stack);
  });

  it('should create a DrainFunction with the correct properties', () => {
    expect(drainFunction).toBeDefined();
    template.hasResourceProperties('AWS::Lambda::Function', {
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

  it('should add the necessary policies to the role', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          {
            Action: ['ec2:DescribeInstances', 'ec2:DescribeTags'],
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
  });
});
