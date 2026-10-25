import { App, Duration, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { RunnerType } from '../src/config-generator/registration';
import {
  DockerAutoscalerExecutorAttributes,
  MANAGER_ENTRY_POINT,
  MANAGER_START_SCRIPT,
} from '../src/executor/docker-autoscaler/docker-autoscaler-executor';
import { GitLabRunner } from '../src/gitlab-runner/gitlab-runner';

describe('DockerAutoscalerExecutor', () => {
  let stack: Stack;
  let vpc: Vpc;
  let token: Secret;

  const graviton = InstanceType.of(InstanceClass.T4G, InstanceSize.LARGE);

  const props = (): DockerAutoscalerExecutorAttributes => ({
    instanceType: graviton,
    vpcConfig: { vpc },
    maxInstances: 4,
  });

  const runner = (concurrent?: number) =>
    new GitLabRunner(stack, 'Runner', {
      runnerConfig: {
        token,
        concurrent,
        runnerType: RunnerType.GROUP,
        groupId: 7,
      },
    });

  type ContainerDefinition = {
    Environment: { Name: string; Value: unknown }[];
    Secrets: { Name: string; ValueFrom: unknown }[];
    Image: unknown;
    Command: string[];
    EntryPoint: string[];
  };

  /** Returns the container definition of the runner manager. */
  const container = (template: Template): ContainerDefinition => {
    const [taskDefinition] = Object.values(
      template.findResources('AWS::ECS::TaskDefinition'),
    ) as { Properties: { ContainerDefinitions: ContainerDefinition[] } }[];
    return taskDefinition.Properties.ContainerDefinitions[0];
  };

  /** Returns the config.toml passed to the manager, tokens unescaped. */
  const configToml = (template: Template): string => {
    const variable = container(template).Environment.find(
      (env) => env.Name === 'RUNNER_CONFIG',
    );
    return JSON.stringify(variable?.Value)
      .replace(/\\n/g, '\n')
      .replace(/\\+"/g, '"');
  };

  beforeEach(() => {
    const app = new App();
    stack = new Stack(app, 'TestStack', {
      env: { account: '123456789012', region: 'eu-central-1' },
    });
    vpc = new Vpc(stack, 'Vpc');
    token = new Secret(stack, 'Token');
  });

  test('runs one runner manager on Fargate', () => {
    runner().addDockerAutoscalerExecutor(props());
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::ECS::Cluster', 1);
    template.hasResourceProperties('AWS::ECS::Service', {
      LaunchType: 'FARGATE',
      DesiredCount: 1,
      DeploymentConfiguration: Match.objectLike({
        MinimumHealthyPercent: 0,
        MaximumPercent: 100,
      }),
      NetworkConfiguration: {
        AwsvpcConfiguration: Match.objectLike({ AssignPublicIp: 'DISABLED' }),
      },
    });
    template.hasResourceProperties('AWS::ECS::TaskDefinition', {
      Cpu: '256',
      Memory: '512',
      RuntimePlatform: {
        CpuArchitecture: 'ARM64',
        OperatingSystemFamily: 'LINUX',
      },
    });

    const definition = container(template);
    expect(definition.Image).toBe('gitlab/gitlab-runner:alpine-v19.3.1');
    expect(definition.EntryPoint).toEqual(MANAGER_ENTRY_POINT);
    expect(definition.Command).toEqual([MANAGER_START_SCRIPT]);
    expect(definition.Secrets.map((secret) => secret.Name)).toEqual([
      'RUNNER_TOKEN',
    ]);
    expect(definition.Environment.map((env) => env.Name)).toEqual([
      'RUNNER_CONFIG',
      'RUNNER_ID',
    ]);
  });

  test('generates a docker-autoscaler config for the AutoScaling group', () => {
    runner().addDockerAutoscalerExecutor({
      ...props(),
      capacityPerInstance: 2,
      maxUseCount: 10,
      idlePolicies: [
        {
          idleCount: 2,
          idleTime: Duration.minutes(30),
          periods: ['* 7-19 * * mon-fri'],
          timezone: 'Europe/Zurich',
        },
      ],
      configProp: { image: 'alpine:3', privileged: true, env: { FOO: 'bar' } },
    });
    const toml = configToml(Template.fromStack(stack));

    expect(toml).toContain('concurrent = 8');
    expect(toml).toContain('log_format = "json"');
    expect(toml).toContain('executor = "docker-autoscaler"');
    expect(toml).toContain('token = "{TOKEN}"');
    expect(toml).toContain('image = "alpine:3"');
    expect(toml).toContain('privileged = true');
    expect(toml).toContain('FOO=bar');
    expect(toml).not.toContain('ecr-login');
    expect(toml).toContain('plugin = "aws:1"');
    expect(toml).toContain('capacity_per_instance = 2');
    expect(toml).toContain('max_use_count = 10');
    expect(toml).toContain('max_instances = 4');
    expect(toml).toContain('instance_ready_command');
    expect(toml).toContain('[runners.autoscaler.plugin_config]');
    expect(toml).toMatch(/name = "",\{"Ref":"\w*AutoScalingGroup/);
    expect(toml).toContain('region = "eu-central-1"');
    expect(toml).toContain('username = "ec2-user"');
    expect(toml).toContain('use_external_addr = false');
    expect(toml).toContain('[[runners.autoscaler.policy]]');
    expect(toml).toContain('idle_count = 2');
    expect(toml).toContain('idle_time = "1800s"');
    expect(toml).toContain('periods = [ "* 7-19 * * mon-fri" ]');
    expect(toml).toContain('timezone = "Europe/Zurich"');
  });

  test('defaults to no idle instances and honours runnerConfig.concurrent', () => {
    runner(3).addDockerAutoscalerExecutor(props());
    const toml = configToml(Template.fromStack(stack));

    expect(toml).toContain('concurrent = 3');
    expect(toml).toContain('idle_count = 0');
    expect(toml).toContain('idle_time = "1200s"');
    expect(toml).not.toContain('periods');
  });

  test('creates an AutoScaling group that the runner owns', () => {
    runner().addDockerAutoscalerExecutor(props());
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::AutoScaling::AutoScalingGroup', {
      MinSize: '0',
      MaxSize: '4',
      NewInstancesProtectedFromScaleIn: true,
      DesiredCapacity: Match.absent(),
    });
    template.resourceCountIs('AWS::AutoScaling::ScalingPolicy', 0);
    template.hasResourceProperties('AWS::EC2::LaunchTemplate', {
      LaunchTemplateData: Match.objectLike({
        InstanceType: 't4g.large',
        MetadataOptions: Match.objectLike({
          HttpTokens: 'required',
          HttpPutResponseHopLimit: 1,
        }),
      }),
    });
    const [suspend] = Object.values(template.findResources('Custom::AWS'));
    expect(JSON.stringify(suspend)).toMatch(/SuspendProcesses.*AZRebalance/);
    // The arm64 Amazon Linux 2023 image is picked for Graviton.
    expect(JSON.stringify(template.toJSON().Parameters)).toContain('arm64');
  });

  test('allows SSH to the instances only from the manager', () => {
    runner().addDockerAutoscalerExecutor(props());
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
      IpProtocol: 'tcp',
      FromPort: 22,
      ToPort: 22,
      SourceSecurityGroupId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('ManagerSecurityGroup'),
          'GroupId',
        ],
      },
    });
  });

  test('grants the fleeting plugin access to the AutoScaling group', () => {
    runner().addDockerAutoscalerExecutor(props());
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: [
              'autoscaling:SetDesiredCapacity',
              'autoscaling:SetInstanceProtection',
              'autoscaling:TerminateInstanceInAutoScalingGroup',
            ],
          }),
          Match.objectLike({
            Action: 'ec2-instance-connect:SendSSHPublicKey',
            Condition: {
              StringEquals: {
                'ec2:ResourceTag/aws:autoscaling:groupName': Match.anyValue(),
              },
            },
          }),
        ]),
      },
    });
  });

  test('creates the runner through a custom resource', () => {
    runner().addDockerAutoscalerExecutor({ ...props(), tags: ['arm'] });
    const template = Template.fromStack(stack);

    const [resource] = Object.values(
      template.findResources('Custom::GitLabRunnerRegistration'),
    ) as { Properties: { Registration: unknown } }[];
    const registration = JSON.stringify(resource.Properties.Registration);
    expect(registration).toContain('group_type');
    expect(registration).toContain('arm');
    expect(registration).toContain('123456789012');
    template.resourceCountIs('AWS::SecretsManager::Secret', 2);
  });

  test('supports spot and several instance types', () => {
    runner().addDockerAutoscalerExecutor({
      ...props(),
      spot: true,
      additionalInstanceTypes: [
        InstanceType.of(InstanceClass.M7G, InstanceSize.LARGE),
      ],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::AutoScaling::AutoScalingGroup', {
      MixedInstancesPolicy: {
        InstancesDistribution: Match.objectLike({
          OnDemandPercentageAboveBaseCapacity: 0,
          SpotAllocationStrategy: 'price-capacity-optimized',
        }),
        LaunchTemplate: Match.objectLike({
          Overrides: [
            { InstanceType: 't4g.large' },
            { InstanceType: 'm7g.large' },
          ],
        }),
      },
    });
  });

  test('grants the cache bucket to the manager', () => {
    const gitlab = new GitLabRunner(stack, 'Runner', {
      runnerConfig: { token },
      cacheConfig: { enabled: true },
    });
    gitlab.addDockerAutoscalerExecutor({
      ...props(),
      vpcConfig: { vpc, vpcSubnets: { subnetType: SubnetType.PUBLIC } },
      assignPublicIp: true,
    });
    const template = Template.fromStack(stack);

    expect(configToml(template)).toContain('Type = "s3"');
    template.hasResourceProperties('AWS::ECS::Service', {
      NetworkConfiguration: {
        AwsvpcConfiguration: Match.objectLike({ AssignPublicIp: 'ENABLED' }),
      },
    });
    template.hasResourceProperties('AWS::IAM::Policy', {
      Roles: [{ Ref: Match.stringLikeRegexp('TaskDefinitionTaskRole') }],
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: Match.arrayWith(['s3:GetObject*', 's3:PutObject']),
          }),
        ]),
      },
    });
  });

  test('can be combined with a Docker executor of the same runner', () => {
    const gitlab = runner();
    gitlab.addDockerAutoscalerExecutor({ ...props(), id: 'Arm' });
    gitlab.addDockerAutoscalerExecutor({
      ...props(),
      id: 'X86',
      instanceType: InstanceType.of(InstanceClass.M7A, InstanceSize.LARGE),
    });

    expect(gitlab.autoscalerExecutors).toHaveLength(2);
    expect(() =>
      gitlab.addDockerAutoscalerExecutor({ ...props(), id: 'Arm' }),
    ).toThrow('already has an executor with id "Arm"');
  });

  test.each([
    [{ maxInstances: 0 }, 'maxInstances must be a positive integer'],
    [{ capacityPerInstance: 0 }, 'capacityPerInstance must be a positive'],
    [{ maxUseCount: 1.5 }, 'maxUseCount must be a positive integer'],
    [{ idlePolicies: [{ idleCount: -1 }] }, 'idleCount must not be negative'],
    [
      {
        additionalInstanceTypes: [
          InstanceType.of(InstanceClass.M7A, InstanceSize.LARGE),
        ],
      },
      'must match the architecture',
    ],
  ])('rejects invalid settings %#', (override, message) => {
    expect(() =>
      runner().addDockerAutoscalerExecutor({ ...props(), ...override }),
    ).toThrow(message);
  });
});
