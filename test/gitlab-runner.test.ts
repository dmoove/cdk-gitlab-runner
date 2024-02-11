import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { DockerExecutorType } from '../src/executor/docker/enums';
import { GitLabRunner } from '../src/gitlab-runner/gitlab-runner';

describe('GitLabRunner', () => {
  let app: App;
  let stack: Stack;
  let template: Template;
  let vpc: Vpc;
  let token: Secret;

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

  test('adds cache with default configurations', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunnerCache', {
      runnerConfig: {
        token,
      },
    });

    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      machineImage: MachineImage.latestAmazonLinux2023(),
      instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
      vpcConfig: {
        vpc,
      },
    });
    runner.addCache();

    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::S3::Bucket', 1);
  });

  test('adds a single instance docker executor', () => {
    const runner = new GitLabRunner(stack, 'MyGitLabRunnerMultipleExecutors', {
      runnerConfig: {
        token,
      },
    });

    runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
      machineImage: MachineImage.latestAmazonLinux2023(),
      instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
      vpcConfig: {
        vpc,
      },
    });
    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Instance', 1);
  });
});
