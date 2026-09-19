import { Duration } from 'aws-cdk-lib';
import { IMachineImage, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { IKey, Key } from 'aws-cdk-lib/aws-kms';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { GitLabCacheBucket } from '../cache/cache-bucket';
import {
  DockerRunnerConfig,
  GitLabConfig,
} from '../config-generator/config-generator';
import {
  DEFAULT_RUNNER_VERSION,
  RunnerAccessLevel,
  RunnerRegistration,
  RunnerType,
} from '../config-generator/registration';
import { AutoScalingConfig, DockerExecutor, VpcConfig } from '../executor';
import { DockerExecutorType } from '../executor/docker/enums';

export interface GitLabRunnerProps {
  /**
   * KMS key used to encrypt the cache bucket.
   *
   * @default - a new customer managed key per GitLabRunner
   */
  readonly encryptionKey?: IKey;

  /**
   * Basic runner configuration.
   */
  readonly runnerConfig: RunnerConfig;

  /**
   * Cache configuration.
   *
   * @default - no cache
   */
  readonly cacheConfig?: CacheConfig;
}

export interface CacheConfig {
  /**
   * Whether an S3 cache bucket is created and configured for the runners.
   */
  readonly enabled: boolean;
  /**
   * Prefix of the bucket name.
   *
   * @default - {account}-{region}-gitlab-cache
   */
  readonly bucketPrefix?: string;
  /**
   * How long cached objects are kept.
   *
   * @default Duration.days(7)
   */
  readonly cacheDuration?: Duration;
}

export interface RunnerConfig {
  /**
   * Maximum number of jobs one runner instance executes at the same time.
   *
   * @default 2
   */
  readonly concurrent?: number;
  /**
   * Secret with the GitLab access token used to create, pause and delete
   * runners. The secret must be a JSON document of the form
   * `{"PrivateToken": "<token>"}`. The token needs the scopes
   * `create_runner`, `manage_runner` and `read_api`.
   */
  readonly token: ISecret;
  /**
   * The GitLab URL.
   *
   * @default https://gitlab.com/
   */
  readonly url?: string;
  /**
   * Scope of the runners created for the instances.
   *
   * @default RunnerType.INSTANCE
   */
  readonly runnerType?: RunnerType;
  /**
   * Group the runners belong to. Required for `RunnerType.GROUP`.
   */
  readonly groupId?: number;
  /**
   * Project the runners belong to. Required for `RunnerType.PROJECT`.
   */
  readonly projectId?: number;
  /**
   * Whether the runners pick up jobs without tags.
   *
   * @default false
   */
  readonly runUntagged?: boolean;
  /**
   * Whether the runners are locked to their project.
   *
   * @default false
   */
  readonly locked?: boolean;
  /**
   * Whether the runners may run jobs of unprotected refs.
   *
   * @default RunnerAccessLevel.NOT_PROTECTED
   */
  readonly accessLevel?: RunnerAccessLevel;
  /**
   * Maximum job duration enforced by the runner. At least 10 minutes.
   *
   * @default - GitLab default
   */
  readonly maximumTimeout?: Duration;
  /**
   * Description shown in GitLab. The instance id is appended.
   *
   * @default - "<stack>/<executor>"
   */
  readonly description?: string;
  /**
   * GitLab runner version installed on the instances.
   *
   * @default DEFAULT_RUNNER_VERSION
   */
  readonly runnerVersion?: string;
}

export interface DockerExecutorAttributes {
  /**
   * Construct id of the executor. Must be unique per GitLabRunner.
   *
   * @default DockerExecutor
   */
  readonly id?: string;
  /**
   * The instance type of the executor.
   */
  readonly instanceType: InstanceType;
  /**
   * The machine image of the executor. Amazon Linux 2023 is expected.
   */
  readonly machineImage: IMachineImage;
  /**
   * The VPC configuration of the executor.
   */
  readonly vpcConfig: VpcConfig;
  /**
   * The autoscaling configuration. Required for
   * `DockerExecutorType.AUTOSCALING`.
   */
  readonly autoscalingConfig?: AutoScalingConfig;
  /**
   * GitLab runner tags of this executor.
   */
  readonly tags?: string[];
  /**
   * Settings of the `[runners.docker]` section.
   */
  readonly configProp?: DockerRunnerConfig;
  /**
   * Size of the root EBS volume in GiB.
   *
   * @default DEFAULT_VOLUME_SIZE
   */
  readonly volumeSize?: number;
  /**
   * How long a terminating autoscaling instance waits for running jobs.
   *
   * @default Duration.minutes(60)
   */
  readonly maxDrainDuration?: Duration;
}

export interface IGitLabRunner {
  /**
   * The AWS KMS key used for encrypting the cache bucket.
   */
  readonly encryptionKey: IKey;

  /**
   * The secret holding the GitLab access token.
   */
  readonly tokenSecret: ISecret;

  /**
   * The URL of the GitLab instance.
   */
  readonly gitlabUrl: string;

  /**
   * The cache bucket, when caching is enabled.
   */
  readonly cacheBucket?: GitLabCacheBucket;

  /**
   * The executors added so far.
   */
  readonly executors: DockerExecutor[];

  /**
   * Adds a Docker executor to the GitLab Runner.
   *
   * @param executorType - the type of Docker executor.
   * @param props - properties for the Docker executor.
   * @returns the created executor.
   * @example
   * runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
   *   instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
   *   machineImage: MachineImage.latestAmazonLinux2023(),
   *   vpcConfig: { vpc },
   *   configProp: { privileged: true },
   * });
   */
  addDockerExecutor(
    executorType: DockerExecutorType,
    props: DockerExecutorAttributes,
  ): DockerExecutor;
}

/**
 * CDK construct that configures a GitLab runner.
 *
 * The construct holds the shared settings (GitLab URL, token secret,
 * registration options, optional cache bucket) and creates one
 * `config.toml` and one executor per {@link addDockerExecutor} call.
 */
export class GitLabRunner extends Construct implements IGitLabRunner {
  readonly encryptionKey: IKey;
  readonly tokenSecret: ISecret;
  readonly gitlabUrl: string;
  readonly cacheBucket?: GitLabCacheBucket;
  readonly executors: DockerExecutor[] = [];
  private readonly runnerConfig: RunnerConfig;

  /**
   * Creates a new {@link GitLabRunner} construct.
   *
   * @param scope - construct scope
   * @param id - id of the construct
   * @param props - runner configuration properties
   */
  constructor(scope: Construct, id: string, props: GitLabRunnerProps) {
    super(scope, id);

    this.runnerConfig = props.runnerConfig;
    this.tokenSecret = props.runnerConfig.token;
    this.gitlabUrl = props.runnerConfig.url ?? 'https://gitlab.com/';

    this.encryptionKey =
      props.encryptionKey ?? new Key(this, 'GitLabRunnerKey');

    if (props.cacheConfig?.enabled) {
      this.cacheBucket = new GitLabCacheBucket(this, 'GitLabCacheBucket', {
        encryptionKey: this.encryptionKey,
        bucketNamePrefix: props.cacheConfig.bucketPrefix,
        cacheDuration: props.cacheConfig.cacheDuration,
      });
    }
  }

  /**
   * Adds a Docker executor to the GitLab Runner.
   *
   * Every executor gets its own runner configuration, so different
   * executors can use different images, tags and instance types.
   *
   * @param executorType - single instance or autoscaling
   * @param props - executor properties
   * @returns the created executor
   */
  addDockerExecutor(
    executorType: DockerExecutorType,
    props: DockerExecutorAttributes,
  ): DockerExecutor {
    const id = props.id ?? 'DockerExecutor';
    if (this.node.tryFindChild(id)) {
      throw new Error(
        `GitLabRunner already has an executor with id "${id}". Set a unique "id" per executor.`,
      );
    }

    const config = new GitLabConfig({
      concurrent: this.runnerConfig.concurrent ?? 2,
      gitlabUrl: this.gitlabUrl,
    });
    config.addDockerExecutor(props.configProp);
    if (this.cacheBucket) {
      config.addCache(this, this.cacheBucket);
    }

    const executor = new DockerExecutor(this, id, {
      config,
      dockerExecutorType: executorType,
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      vpcConfig: props.vpcConfig,
      autoscalingConfig: props.autoscalingConfig,
      tags: props.tags,
      volumeSize: props.volumeSize,
      maxDrainDuration: props.maxDrainDuration,
      tokenSecret: this.tokenSecret,
      gitlabUrl: this.gitlabUrl,
      cacheBucket: this.cacheBucket,
      registration: this.createRegistration(id),
      runnerVersion: this.runnerConfig.runnerVersion ?? DEFAULT_RUNNER_VERSION,
    });

    this.executors.push(executor);
    return executor;
  }

  /**
   * Builds the `POST /user/runners` request body for an executor.
   */
  private createRegistration(executorId: string): RunnerRegistration {
    const config = this.runnerConfig;
    return {
      runner_type: config.runnerType ?? RunnerType.INSTANCE,
      group_id: config.groupId,
      project_id: config.projectId,
      description: config.description ?? `${this.node.path}/${executorId}`,
      run_untagged: config.runUntagged ?? false,
      locked: config.locked ?? false,
      access_level: config.accessLevel ?? RunnerAccessLevel.NOT_PROTECTED,
      maximum_timeout: config.maximumTimeout?.toSeconds(),
    };
  }
}
