import { App, Duration, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { RunnerType } from '../src/config-generator/registration';
import { DockerExecutorType } from '../src/executor/docker/enums';
import { GitLabRunner } from '../src/gitlab-runner/gitlab-runner';

describe('GitLabRunner', () => {
  let app: App;
  let stack: Stack;
  let template: Template;
  let vpc: Vpc;
  let token: Secret;

  const executorProps = () => ({
    machineImage: MachineImage.latestAmazonLinux2023(),
    instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
    vpcConfig: { vpc },
  });

  /** Returns the generated config.toml of the first EC2 instance. */
  const configToml = (tpl: Template): string => {
    const [instance] = Object.values(
      tpl.findResources('AWS::EC2::Instance'),
    ) as {
      Metadata: {
        'AWS::CloudFormation::Init': {
          gitlabconfig: { files: Record<string, { content: unknown }> };
        };
      };
    }[];
    // The content is an Fn::Join of escaped fragments; unescape once.
    return JSON.stringify(
      instance.Metadata['AWS::CloudFormation::Init'].gitlabconfig.files[
        '/etc/gitlab-runner/config.toml'
      ].content,
    ).replace(/\\+"/g, '"');
  };

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');

    vpc = new Vpc(stack, 'Vpc');
    token = new Secret(stack, 'Token');
  });

  test('initializes with default properties', () => {
    new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: {
        token,
      },
    });
    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::KMS::Key', 1);
    template.resourceCountIs('AWS::S3::Bucket', 0);
  });

  test('uses provided encryption key', () => {
    const encryptionKey = new Key(stack, 'ProvidedKey');

    new GitLabRunner(stack, 'MyGitLabRunnerWithKey', {
      encryptionKey: encryptionKey,
      runnerConfig: {
        token,
      },
    });

    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::KMS::Key', 1);
  });

  test('adds cache and grants the executor access to it', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunnerCache', {
      runnerConfig: {
        token,
      },
      cacheConfig: {
        enabled: true,
      },
    });

    runner.addDockerExecutor(
      DockerExecutorType.SINGLE_INSTANCE,
      executorProps(),
    );

    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: Match.arrayWith(['s3:GetObject*', 's3:PutObject']),
          }),
          Match.objectLike({
            Action: Match.arrayWith(['kms:Decrypt', 'kms:Encrypt']),
          }),
        ]),
      },
    });
    expect(configToml(template)).toContain('Type = "s3"');
  });

  test('does not create a cache when it is disabled', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: { token },
      cacheConfig: { enabled: false },
    });
    runner.addDockerExecutor(
      DockerExecutorType.SINGLE_INSTANCE,
      executorProps(),
    );
    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::S3::Bucket', 0);
    expect(runner.cacheBucket).toBeUndefined();
    expect(configToml(template)).not.toContain('[runners.cache]');
  });

  test('adds a single instance docker executor with the docker settings', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: {
        token,
        concurrent: 4,
      },
    });

    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      ...executorProps(),
      configProp: {
        image: 'alpine:3.20',
        privileged: true,
        env: { FOO: 'bar' },
      },
    });
    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Instance', 1);
    const toml = configToml(template);
    expect(toml).toContain('concurrent = 4');
    expect(toml).toContain('image = "alpine:3.20"');
    expect(toml).toContain('privileged = true');
    expect(toml).toContain('FOO=bar');
    expect(runner.executors).toHaveLength(1);
  });

  test('adds an autoscaling executor with drain state machine', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: { token },
    });

    runner.addDockerExecutor(DockerExecutorType.AUTOSCALING, {
      ...executorProps(),
      autoscalingConfig: { minCapacity: 0, maxCapacity: 4 },
      maxDrainDuration: Duration.minutes(20),
    });
    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::AutoScaling::AutoScalingGroup', {
      MinSize: '0',
      MaxSize: '4',
    });
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs22.x',
    });
    template.hasResourceProperties('AWS::AutoScaling::LifecycleHook', {
      HeartbeatTimeout: 1200,
    });
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('supports multiple executors with distinct ids', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: { token },
      cacheConfig: { enabled: true },
    });

    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      ...executorProps(),
      id: 'Small',
      tags: ['small'],
    });
    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      ...executorProps(),
      id: 'Large',
      tags: ['large'],
      instanceType: InstanceType.of(InstanceClass.M6A, InstanceSize.XLARGE),
    });
    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Instance', 2);
    template.resourceCountIs('AWS::S3::Bucket', 1);
    expect(runner.executors).toHaveLength(2);
  });

  test('rejects duplicate executor ids', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: { token },
    });
    runner.addDockerExecutor(
      DockerExecutorType.SINGLE_INSTANCE,
      executorProps(),
    );

    expect(() =>
      runner.addDockerExecutor(
        DockerExecutorType.SINGLE_INSTANCE,
        executorProps(),
      ),
    ).toThrow('already has an executor with id "DockerExecutor"');
  });

  test('passes the subnet selection to the instance', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: { token },
    });
    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      ...executorProps(),
      vpcConfig: { vpc, vpcSubnets: { subnetType: SubnetType.PUBLIC } },
    });
    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::Instance', {
      SubnetId: { Ref: Match.stringLikeRegexp('VpcPublicSubnet') },
    });
  });

  test('builds the runner registration from the runner config', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: {
        token,
        runnerType: RunnerType.GROUP,
        groupId: 7,
        runUntagged: true,
        locked: true,
        maximumTimeout: Duration.hours(2),
        runnerVersion: '18.5.0',
      },
    });
    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      ...executorProps(),
      tags: ['gpu'],
    });
    template = Template.fromStack(stack);

    const [instance] = Object.values(
      template.findResources('AWS::EC2::Instance'),
    ) as { Metadata: { 'AWS::CloudFormation::Init': unknown } }[];
    const init = JSON.stringify(
      instance.Metadata['AWS::CloudFormation::Init'],
    ).replace(/\\+"/g, '"');
    expect(init).toContain('"runner_type":"group_type"');
    expect(init).toContain('"group_id":7');
    expect(init).toContain('"run_untagged":true');
    expect(init).toContain('"locked":true');
    expect(init).toContain('"maximum_timeout":7200');
    expect(init).toContain('"gpu"');
    expect(init).toContain('v18.5.0/rpm');
  });

  test('rejects a group runner without group id', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunner', {
      runnerConfig: { token, runnerType: RunnerType.GROUP },
    });

    expect(() =>
      runner.addDockerExecutor(
        DockerExecutorType.SINGLE_INSTANCE,
        executorProps(),
      ),
    ).toThrow('A group runner requires groupId');
  });
});
