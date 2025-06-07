import { Duration } from 'aws-cdk-lib';
import { IMachineImage, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { VpcConfig } from 'aws-cdk-lib/aws-stepfunctions-tasks';
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

  /**
   * basic cache configuration
   */
  readonly cacheConfig?: CacheConfig;
}

export interface CacheConfig {
  /**
   * Wheter a cache should be enabled
   *
   * @default - false
   */
  readonly enabled: boolean;
  /**
   * The prefix used for the bucket
   *
   * @default - {account}-{region}-gitlab-cache
   */
  readonly bucketPrefix?: string;
  /**
   * The duration for which the cache is valid.
   *
   * @default - 7
   */
  readonly cacheDuration?: Duration;
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
  /**
   * The instance type of the GitLab Runner.
   */
  readonly instanceType: InstanceType;
  /**
   * The machine image of the GitLab Runner.
   */
  readonly machineImage: IMachineImage;
  /**
   * The VPC configuration of the GitLab Runner.
   */
  readonly vpcConfig: VpcConfig;
  /**
   * The autoscaling configuration of the GitLab Runner.
   */
  readonly autoscalingConfig?: AutoScalingConfig;
  /**
   * The tags of the GitLab Runner.
   */
  readonly tags?: string[];
  /**
   * Target number of pending jobs per runner used for scaling.
   *
   * @default - disabled
   */
  readonly pendingJobsTarget?: number;
  /**
   * The configuration of the Docker executor.
   */
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
  /**
   * Whether to disable IPv4 for the GitLab Runner.
   *
   * @default - false
   */
  readonly disableIpv4?: boolean;
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
   * The URL of the gitlab instance
   */
  readonly gitlabUrl: string;

  /**
   * Adds a Docker executor to the GitLab Runner configuration.
   *
   * @default - no docker executor added to the configuration.
   * @param executorType - the type of Docker executor.
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
    executorType: DockerExecutorType,
    props: DockerExecutorAttributes,
  ): void;
}

/**
 * CDK construct that configures a GitLab runner.
 *
 * The construct manages the base runner configuration and allows adding
 * Docker executors and optional caching. The resulting configuration is
 * stored in {@link glConfig} and used by the executor constructs.
 */
export class GitLabRunner extends Construct implements IGitLabRunner {
  readonly encryptionKey: Key;
  readonly glConfig: GitLabConfig;
  readonly tokenSecret: ISecret;
  readonly gitlabUrl: string;
  private configurationActions: Array<(config: GitLabConfig) => void> = [];

  /**
   * Creates a new {@link GitLabRunner} construct.
   *
   * @param scope - construct scope
   * @param id - id of the construct
   * @param props - runner configuration properties
   */
  constructor(scope: Construct, id: string, props: GitLabRunnerProps) {
    super(scope, id);

    this.tokenSecret = props.runnerConfig.token;
    this.gitlabUrl = props.runnerConfig.url ?? 'https://gitlab.com/';

    this.glConfig = new GitLabConfig({
      concurrent: props.runnerConfig.concurrent ?? 2,
      gitlabUrl: this.gitlabUrl,
    });

    this.encryptionKey =
      props.encryptionKey ?? new Key(this, 'GitLabRunnerKey');

    if (props.cacheConfig) {
      this.addCache(
        props.cacheConfig.bucketPrefix,
        props.cacheConfig.cacheDuration,
      );
    }
  }

  /**
   * Adds a Docker executor to the GitLab Runner configuration.
   * @param executorType
   * @param props
   */
  addDockerExecutor(
    executorType: DockerExecutorType,
    props: DockerExecutorAttributes,
  ) {
    this.configurationActions.push((config: GitLabConfig) =>
      config.addDockerExecutor(props.configProp),
    );

    this.applyConfigurationChanges();

    new DockerExecutor(this, 'DockerExecutor', {
      config: this.glConfig,
      dockerExecutorType: executorType,
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      vpcConfig: props.vpcConfig,
      autoscalingConfig: props.autoscalingConfig,
      tags: props.tags,
      pendingJobsTarget: props.pendingJobsTarget,
      tokenSecret: this.tokenSecret,
      gitlabUrl: this.gitlabUrl,
    });
  }

  /**
   * Adds a cache to the GitLab Runner configuration.
   * @param bucketPrefix - the prefix for the S3 bucket used for caching.
   * @param cacheDuration - the duration for which the cache is valid.
   * @example
   * runner.addCache('my-cache', Duration.days(7));
   */
  private addCache(bucketPrefix?: string, cacheDuration?: Duration) {
    this.configurationActions.push((config: GitLabConfig) => {
      const cacheBucket = new GitLabCacheBucket(this, 'GitLabCacheBucket', {
        encryptionKey: this.encryptionKey,
        bucketNamePrefix: bucketPrefix,
        cacheDuration: cacheDuration,
      });

      config.addCache(this, cacheBucket);
    });
  }

  /**
   * Apply all queued configuration changes to the internal GitLab config.
   *
   * Each call to {@link addDockerExecutor} or {@link addCache} pushes a
   * configuration action into an internal array. This helper executes all
   * actions so that the current state is reflected in {@link glConfig}.
   */
  private applyConfigurationChanges() {
    this.configurationActions.forEach((action) => action(this.glConfig));
  }
}
