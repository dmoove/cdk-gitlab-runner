import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { InstanceType, MachineImage, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { DockerExecutor, DockerExecutorType, GitLabConfig } from '../src';

describe('DockerExecutor', () => {
  let app: App;
  let stack: Stack;
  let template: Template;
  let vpc: Vpc;
  let tokenSecret: ISecret;
  let config: GitLabConfig;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
    vpc = new Vpc(stack, 'VPC');
    tokenSecret = new Secret(stack, 'GitLabTokenSecret');
    config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
  });

  test('creates autoscaling executor when specified', () => {
    new DockerExecutor(stack, 'DockerExecutorASG', {
      dockerExecutorType: DockerExecutorType.AUTOSCALING,
      autoscalingConfig: { minCapacity: 1, maxCapacity: 3, desiredCapacity: 2 },
      instanceType: new InstanceType('t3.micro'),
      machineImage: MachineImage.latestAmazonLinux2023(),
      vpcConfig: { vpc },
      tokenSecret,
      gitlabUrl: 'https://gitlab.com',
      config,
    });

    template = Template.fromStack(stack);

    // Assert AutoScalingGroup is created
    template.hasResourceProperties('AWS::AutoScaling::AutoScalingGroup', {
      MinSize: '1',
      MaxSize: '3',
      DesiredCapacity: '2',
    });

    template.hasResourceProperties('AWS::AutoScaling::LaunchConfiguration', {
      ImageId: Match.objectLike({
        Ref: Match.anyValue(),
      }),
      InstanceType: 't3.micro',
    });
  });

  test('creates single instance executor when specified', () => {
    new DockerExecutor(stack, 'DockerExecutorInstance', {
      dockerExecutorType: DockerExecutorType.SINGLE_INSTANCE,
      autoscalingConfig: { minCapacity: 1, maxCapacity: 3, desiredCapacity: 2 },
      instanceType: new InstanceType('t3.micro'),
      machineImage: MachineImage.latestAmazonLinux2023(),
      vpcConfig: { vpc },
      tokenSecret,
      gitlabUrl: 'https://gitlab.com',
      config,
    });

    template = Template.fromStack(stack);

    // Assert EC2 Instance is created
    template.hasResourceProperties('AWS::EC2::Instance', {
      InstanceType: 't3.micro',
      ImageId: Match.objectLike({
        Ref: Match.anyValue(),
      }),
    });
  });

  test('throws error if autoscaling config is missing for autoscaling executor', () => {
    expect(() => {
      new DockerExecutor(stack, 'DockerExecutorError', {
        dockerExecutorType: DockerExecutorType.AUTOSCALING,
        instanceType: new InstanceType('t3.micro'),
        machineImage: MachineImage.latestAmazonLinux2023(),
        vpcConfig: { vpc },
        tokenSecret,
        gitlabUrl: 'https://gitlab.com',
        config,
      });
    }).toThrowError('Autoscaling config is required for autoscaling executor');
  });

  test('adds tagging permissions and permissions to use and decrypt the secret', () => {
    new DockerExecutor(stack, 'DockerExecutorASG', {
      dockerExecutorType: DockerExecutorType.AUTOSCALING,
      autoscalingConfig: { minCapacity: 1, maxCapacity: 3, desiredCapacity: 2 },
      instanceType: new InstanceType('t3.micro'),
      machineImage: MachineImage.latestAmazonLinux2023(),
      vpcConfig: { vpc },
      tokenSecret,
      gitlabUrl: 'XXXXXXXXXXXXXXXXXX',
      config,
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          {
            Action: [
              'secretsmanager:GetSecretValue',
              'secretsmanager:DescribeSecret',
            ],
            Effect: 'Allow',
            Resource: {
              Ref: Match.anyValue(),
            },
          },
          {
            Action: ['ec2:CreateTags', 'ec2:DescribeInstances'],
            Resource: ['*'],
            Effect: 'Allow',
            Conditions: {
              StringEquals: {
                'aws:ResourceTag/aws:cloudformation:stack-name':
                  Stack.of(stack).stackName,
              },
            },
          },
        ]),
      },
    });
  });
});
