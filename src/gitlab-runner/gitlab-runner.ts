import { Duration } from 'aws-cdk-lib';
import { IMachineImage, IVpc, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { GitLabCacheBucket } from '../cache/cache-bucket';
import { GitLabConfig } from '../config-generator/config-generator';
import { AutoScalingConfig, DockerExecutor } from '../executor';
import { DockerExecutorType } from '../executor/docker/enums';

export interface GitLabRunnerProps {
  /**
   * which encryption key to use
   *
   * @default - customer key per gitlab runner instance
   */
  readonly encryptionKey?: Key;

  /**
   * basic runner configuration
   */
  readonly runnerConfig: RunnerConfig;
}

export interface RunnerConfig {
  /**
   * The maximum number of concurrent jobs that the GitLab Runner will run.
   *
   * @default - 2
   */
  readonly concurrent?: number;
  /**
   * The GitLab Runner registration token.
   */
  readonly token: ISecret;
  /**
   * The GitLab URL.
   *
   * @default - https://gitlab.com/
   */
  readonly url?: string;
}

export interface DockerExecutorAttributes {
  readonly instanceType: InstanceType;
  readonly machineImage: IMachineImage;
  readonly vpc: IVpc;
  readonly autoscalingConfig?: AutoScalingConfig;
  readonly tags?: string[];
  readonly configProp?: DockerExecutorConfigProps;
}

export interface DockerExecutorConfigProps {
  /**
   * default image for docker executor
   *
   * @default - ubuntu:latest
   */
  readonly image?: string;
  /**
   * default privileged for docker executor
   *
   * @default - false
   */
  readonly privileged?: boolean;
  /**
   * default volumes for docker executor
   *
   * @default - []
   */
  readonly volumes?: string[];
}

export interface IGitLabRunner {
  /**
   * The AWS KMS key used for encrypting stored data by the GitLab Runner.
   */
  readonly encryptionKey: Key;

  /**
   * Configuration details for the GitLab Runner, including job concurrency and authentication details.
   */
  readonly glConfig: GitLabConfig;

  /**
   * The secret used for token authentication.
   */
  readonly tokenSecret: ISecret;

  /**
   * Adds a Docker executor to the GitLab Runner configuration.
   *
   * @default - no docker executor added to the configuration.
   * @param type - the type of Docker executor.
   * @param props - properties for the Docker executor.
   * @returns - the GitLabRunner instance.
   * @example
   * runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
   *   image: 'ubuntu:latest',
   *   privileged: true,
   *   volumes: ['/var/run/docker.sock:/var/run/docker.sock'],
   * });
   */
  addDockerExecutor(
    type: DockerExecutorType,
    props: DockerExecutorAttributes
  ): void;

  /**
   * Adds a cache to the GitLab Runner configuration.
   * @param bucketPrefix - the prefix for the S3 bucket used for caching.
   * @param cacheDuration - the duration for which the cache is valid.
   */
  addCache(bucketPrefix?: string, cacheDuration?: Duration): void;
}

export class GitLabRunner extends Construct implements IGitLabRunner {
  readonly encryptionKey: Key;
  readonly glConfig: GitLabConfig;
  readonly tokenSecret: ISecret;

  constructor(scope: Construct, id: string, props: GitLabRunnerProps) {
    super(scope, id);

    this.tokenSecret = props.runnerConfig.token;

    this.glConfig = new GitLabConfig({
      concurrent: props.runnerConfig.concurrent ?? 2,
      gitlabUrl: props.runnerConfig.url ?? 'https://gitlab.com/',
    });

    this.encryptionKey =
      props.encryptionKey ?? new Key(this, 'GitLabRunnerKey');
  }

  addDockerExecutor(type: DockerExecutorType, props: DockerExecutorAttributes) {
    this.glConfig.addDockerExecutor(props.configProp);

    new DockerExecutor(this, 'DockerExecutor', {
      config: this.glConfig,
      dockerExecutorType: type,
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      vpc: props.vpc,
      autoscalingConfig: props.autoscalingConfig,
      tags: props.tags,
      tokenSecret: this.tokenSecret,
    });
  }

  addCache(bucketPrefix?: string, cacheDuration?: Duration) {
    const cacheBucket = new GitLabCacheBucket(this, 'GitLabCacheBucket', {
      encryptionKey: this.encryptionKey,
      bucketNamePrefix: bucketPrefix,
      cacheDuration: cacheDuration,
    });

    this.glConfig.addCache(this, cacheBucket);
  }
}
