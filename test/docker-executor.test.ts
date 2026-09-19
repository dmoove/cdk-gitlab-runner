import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { InstanceType, MachineImage, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import {
  DockerExecutor,
  DockerExecutorProps,
  DockerExecutorType,
  GitLabConfig,
  RunnerType,
} from '../src';

describe('DockerExecutor', () => {
  let app: App;
  let stack: Stack;
  let template: Template;
  let vpc: Vpc;
  let tokenSecret: ISecret;
  let config: GitLabConfig;
  let baseProps: Omit<DockerExecutorProps, 'dockerExecutorType'>;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
    vpc = new Vpc(stack, 'VPC');
    tokenSecret = new Secret(stack, 'GitLabTokenSecret');
    config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
    baseProps = {
      instanceType: new InstanceType('t3.micro'),
      machineImage: MachineImage.latestAmazonLinux2023(),
      vpcConfig: { vpc },
      tokenSecret,
      gitlabUrl: 'https://gitlab.com',
      config,
    };
  });

  test('creates an autoscaling executor from a launch template', () => {
    new DockerExecutor(stack, 'DockerExecutorASG', {
      ...baseProps,
      dockerExecutorType: DockerExecutorType.AUTOSCALING,
      autoscalingConfig: { minCapacity: 1, maxCapacity: 3 },
      volumeSize: 120,
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::AutoScaling::AutoScalingGroup', {
      MinSize: '1',
      MaxSize: '3',
      DesiredCapacity: Match.absent(),
      LaunchTemplate: Match.objectLike({
        LaunchTemplateId: Match.anyValue(),
      }),
    });
    template.resourceCountIs('AWS::AutoScaling::LaunchConfiguration', 0);
    template.hasResourceProperties('AWS::EC2::LaunchTemplate', {
      LaunchTemplateData: Match.objectLike({
        InstanceType: 't3.micro',
        MetadataOptions: { HttpTokens: 'required' },
        BlockDeviceMappings: [
          Match.objectLike({
            DeviceName: '/dev/xvda',
            Ebs: Match.objectLike({ VolumeSize: 120 }),
          }),
        ],
      }),
    });
    template.resourceCountIs('AWS::AutoScaling::LifecycleHook', 1);
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('creates single instance executor when specified', () => {
    new DockerExecutor(stack, 'DockerExecutorInstance', {
      ...baseProps,
      dockerExecutorType: DockerExecutorType.SINGLE_INSTANCE,
      volumeSize: 100,
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::Instance', {
      InstanceType: 't3.micro',
      ImageId: Match.objectLike({
        Ref: Match.anyValue(),
      }),
      BlockDeviceMappings: [
        Match.objectLike({ Ebs: Match.objectLike({ VolumeSize: 100 }) }),
      ],
    });
    template.hasResourceProperties('AWS::EC2::LaunchTemplate', {
      LaunchTemplateData: { MetadataOptions: { HttpTokens: 'required' } },
    });
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 0);
  });

  test('writes config, registration and bootstrap script into cfn-init', () => {
    new DockerExecutor(stack, 'DockerExecutorInstance', {
      ...baseProps,
      dockerExecutorType: DockerExecutorType.SINGLE_INSTANCE,
      tags: ['build', ' '],
      registration: {
        runner_type: RunnerType.GROUP,
        group_id: 42,
        run_untagged: true,
        description: 'my runner',
      },
      runnerVersion: '18.0.0',
    });

    template = Template.fromStack(stack);
    const [instance] = Object.values(
      template.findResources('AWS::EC2::Instance'),
    ) as { Metadata: { 'AWS::CloudFormation::Init': unknown } }[];
    const init = JSON.stringify(instance.Metadata['AWS::CloudFormation::Init']);

    expect(init).toContain('/etc/gitlab-runner/config.toml');
    expect(init).toContain('/etc/gitlab-runner/registration.json');
    expect(init).toContain('/etc/gitlab-runner/start.sh');
    expect(init).toContain('PRIVATE-TOKEN');
    expect(init).toContain('user/runners');
    expect(init).toContain('v18.0.0/rpm/gitlab-runner_$ARCH.rpm');
    expect(init).toContain('amazon-ecr-credential-helper');
    expect(init).not.toContain('api/v4/runners"');

    // registration.json is an Fn::Join (account and region tokens); compare
    // on the unescaped text instead of parsing it.
    const registration = init.replace(/\\+"/g, '"');
    expect(registration).toContain('"runner_type":"group_type"');
    expect(registration).toContain('"group_id":42');
    expect(registration).toContain('"run_untagged":true');
    expect(registration).toContain('"description":"my runner"');
    const tagList = /"tag_list":\[[^\]]*\]/.exec(registration)?.[0];
    expect(tagList).toContain('"build",');
    expect(tagList).toContain('"docker","runner"]');
    expect(tagList).not.toContain('" "');
  });

  test('throws error if autoscaling config is missing for autoscaling executor', () => {
    expect(() => {
      new DockerExecutor(stack, 'DockerExecutorError', {
        ...baseProps,
        dockerExecutorType: DockerExecutorType.AUTOSCALING,
      });
    }).toThrow('Autoscaling config is required for autoscaling executor');
  });

  test('validates the autoscaling capacities', () => {
    expect(() => {
      new DockerExecutor(stack, 'DockerExecutorError', {
        ...baseProps,
        dockerExecutorType: DockerExecutorType.AUTOSCALING,
        autoscalingConfig: {
          minCapacity: 1,
          maxCapacity: 2,
          desiredCapacity: 5,
        },
      });
    }).toThrow(
      'autoscalingConfig.desiredCapacity should never exceed maxCapacity',
    );
    expect(() => {
      new DockerExecutor(stack, 'DockerExecutorError2', {
        ...baseProps,
        dockerExecutorType: DockerExecutorType.AUTOSCALING,
        autoscalingConfig: {
          minCapacity: 5,
          maxCapacity: 8,
          desiredCapacity: 1,
        },
      });
    }).toThrow(
      'autoscalingConfig.desiredCapacity should never be lower than minCapacity',
    );
    expect(() => {
      new DockerExecutor(stack, 'DockerExecutorError3', {
        ...baseProps,
        dockerExecutorType: DockerExecutorType.AUTOSCALING,
        autoscalingConfig: { minCapacity: 5, maxCapacity: 2 },
      });
    }).toThrow('autoscalingConfig.minCapacity must not exceed maxCapacity');
  });

  test('validates the runner registration', () => {
    expect(() => {
      new DockerExecutor(stack, 'DockerExecutorError', {
        ...baseProps,
        dockerExecutorType: DockerExecutorType.SINGLE_INSTANCE,
        registration: { runner_type: RunnerType.PROJECT },
      });
    }).toThrow('A project runner requires projectId');
  });

  test('adds tagging permissions and permissions to use and decrypt the secret', () => {
    new DockerExecutor(stack, 'DockerExecutorASG', {
      ...baseProps,
      dockerExecutorType: DockerExecutorType.SINGLE_INSTANCE,
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          {
            Action: Match.arrayWith([
              'ec2:CreateTags',
              'ec2:DescribeInstances',
            ]),
            Resource: '*',
            Effect: 'Allow',
            Condition: {
              StringEquals: {
                'aws:ResourceTag/aws:cloudformation:stack-name':
                  Match.anyValue(),
              },
            },
          },
          {
            Action: Match.arrayWith([
              'secretsmanager:GetSecretValue',
              'secretsmanager:DescribeSecret',
            ]),
            Effect: 'Allow',
            Resource: {
              Ref: Match.anyValue(),
            },
          },
        ]),
      },
    });
  });
});
