import * as toml from '@iarna/toml';
import { Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GitLabCacheBucket } from '../cache/cache-bucket';
import { GlConfig } from '../types/runner-config';
import { CacheType, GitlabExecutor } from './enums';

/**
 * Volumes mounted into every job container by default.
 */
export const DEFAULT_VOLUMES: readonly string[] = [
  '/var/run/docker.sock:/var/run/docker.sock',
  '/cache:/cache',
];

/**
 * Image used for jobs that do not specify one.
 */
export const DEFAULT_DOCKER_IMAGE = 'ubuntu:24.04';

/**
 * Properties for the GitLabConfig class.
 */
export interface GlConfigGeneratorProps {
  /**
   * How many jobs can run concurrently on one runner instance.
   */
  readonly concurrent: number;

  /**
   * The GitLab URL.
   */
  readonly gitlabUrl: string;

  /**
   * Log format of the runner process (`runner`, `text` or `json`).
   *
   * @default - runner default (`runner`)
   */
  readonly logFormat?: string;
}

/**
 * Settings of the `[runners.docker]` section in `config.toml`.
 */
export interface DockerRunnerConfig {
  /**
   * Default image for jobs that do not set one.
   *
   * @default DEFAULT_DOCKER_IMAGE
   */
  readonly image?: string;

  /**
   * Run job containers in privileged mode (needed for Docker-in-Docker).
   *
   * @default false
   */
  readonly privileged?: boolean;

  /**
   * Volumes mounted into job containers.
   *
   * @default DEFAULT_VOLUMES
   */
  readonly volumes?: string[];

  /**
   * Disable the runner cache for the Docker executor.
   *
   * @default false
   */
  readonly disableCache?: boolean;

  /**
   * Additional environment variables passed to every job.
   */
  readonly env?: Record<string, string>;
}

/**
 * Idle policy of the Docker Autoscaler executor. Several policies with
 * different `periods` describe a schedule, for example warm instances
 * during office hours only. The last matching policy wins.
 */
export interface AutoscalerIdlePolicy {
  /**
   * Number of idle job slots kept ready while the policy is active.
   */
  readonly idleCount: number;

  /**
   * How long an idle instance is kept before it is removed.
   *
   * @default Duration.minutes(20)
   */
  readonly idleTime?: Duration;

  /**
   * Cron expressions of the periods in which the policy is active, for
   * example `* 7-19 * * mon-fri`.
   *
   * @default - always active
   */
  readonly periods?: string[];

  /**
   * Time zone of `periods`, for example `Europe/Zurich`.
   *
   * @default - UTC
   */
  readonly timezone?: string;
}

/**
 * Settings of the `[runners.autoscaler]` section of the Docker Autoscaler
 * executor with the AWS fleeting plugin.
 */
export interface AutoscalerRunnerConfig {
  /**
   * Fleeting plugin reference, installed with `gitlab-runner fleeting
   * install`.
   */
  readonly plugin: string;
  /** Number of jobs running at the same time on one instance. */
  readonly capacityPerInstance: number;
  /** Number of jobs an instance runs before it is replaced. */
  readonly maxUseCount: number;
  /** Highest number of instances. */
  readonly maxInstances: number;
  /** Name of the AutoScaling group managed by the plugin. */
  readonly autoScalingGroupName: string;
  /** Region of the AutoScaling group. */
  readonly region: string;
  /**
   * SSH user on the instances.
   *
   * @default ec2-user
   */
  readonly username?: string;
  /**
   * Connect to the public address of the instances.
   *
   * @default false
   */
  readonly useExternalAddr?: boolean;
  /**
   * Command run on every new instance; the instance is used once it
   * succeeds.
   *
   * @default - none
   */
  readonly instanceReadyCommand?: string;
  /**
   * Idle policies.
   *
   * @default - no idle instances
   */
  readonly policies?: AutoscalerIdlePolicy[];
}

/**
 * @deprecated Use {@link DockerRunnerConfig}. `gitlabImage` became `image`.
 */
export type ConfigDockerExecutor = DockerRunnerConfig;

export interface IGitLabConfig {
  /**
   * Adds the Docker executor section to the configuration.
   *
   * @param props The properties for the executor.
   */
  addDockerExecutor(props?: DockerRunnerConfig): void;

  /**
   * Adds the Docker Autoscaler executor with its `[runners.docker]` and
   * `[runners.autoscaler]` sections to the configuration.
   *
   * @param docker - Docker settings applied on the autoscaled instances
   * @param autoscaler - autoscaler and fleeting plugin settings
   */
  addDockerAutoscaler(
    docker: DockerRunnerConfig | undefined,
    autoscaler: AutoscalerRunnerConfig,
  ): void;

  /**
   * Adds an S3 cache to the configuration.
   * @param scope construct used to resolve the region
   * @param bucket cache bucket
   */
  addCache(scope: Construct, bucket: GitLabCacheBucket): void;

  /**
   * Generates the GitLab configuration as a TOML string.
   */
  generateToml(): string;
}

/**
 * Generates the `config.toml` of one runner instance.
 *
 * One instance runs exactly one runner process with one `[[runners]]`
 * section, so the generator manages a single runner entry. The runner
 * authentication token is left as the placeholder `{TOKEN}` and replaced by
 * the bootstrap script after the runner has been created.
 */
export class GitLabConfig implements IGitLabConfig {
  private readonly config: GlConfig;

  constructor(props: GlConfigGeneratorProps) {
    this.config = {
      concurrent: props.concurrent,
      ...(props.logFormat ? { log_format: props.logFormat } : {}),
      runners: [
        {
          url: props.gitlabUrl,
          token: '{TOKEN}',
          executor: GitlabExecutor.DOCKER,
          environment: [],
        },
      ],
    };
  }

  /**
   * Add the Docker executor configuration to the generated config.
   *
   * Calling it again replaces the previous Docker settings.
   *
   * @param props - optional docker specific settings
   */
  public addDockerExecutor(props?: DockerRunnerConfig) {
    this.setDocker(GitlabExecutor.DOCKER, props);
    this.addEnvironments({
      // Let the runner pull from ECR with the instance role.
      DOCKER_AUTH_CONFIG: '{ "credsStore": "ecr-login" }',
      ...props?.env,
    });
  }

  /**
   * Add the Docker Autoscaler executor configuration.
   *
   * Calling it again replaces the previous Docker and autoscaler settings.
   * Images are pulled by the Docker daemon of the autoscaled instances.
   *
   * @param docker - optional docker specific settings
   * @param autoscaler - autoscaler and fleeting plugin settings
   */
  public addDockerAutoscaler(
    docker: DockerRunnerConfig | undefined,
    autoscaler: AutoscalerRunnerConfig,
  ) {
    this.setDocker(GitlabExecutor.DOCKER_AUTOSCALER, docker);
    this.addEnvironments({ ...docker?.env });

    this.runner.autoscaler = {
      plugin: autoscaler.plugin,
      capacity_per_instance: autoscaler.capacityPerInstance,
      max_use_count: autoscaler.maxUseCount,
      max_instances: autoscaler.maxInstances,
      ...(autoscaler.instanceReadyCommand
        ? { instance_ready_command: autoscaler.instanceReadyCommand }
        : {}),
      plugin_config: {
        name: autoscaler.autoScalingGroupName,
        region: autoscaler.region,
      },
      connector_config: {
        username: autoscaler.username ?? 'ec2-user',
        use_external_addr: autoscaler.useExternalAddr ?? false,
      },
      policy: (autoscaler.policies ?? [{ idleCount: 0 }]).map((policy) => ({
        idle_count: policy.idleCount,
        idle_time: `${(policy.idleTime ?? Duration.minutes(20)).toSeconds()}s`,
        ...(policy.periods ? { periods: [...policy.periods] } : {}),
        ...(policy.timezone ? { timezone: policy.timezone } : {}),
      })),
    };
  }

  /**
   * Enable S3 caching for the runner using the provided bucket.
   */
  public addCache(scope: Construct, bucket: GitLabCacheBucket) {
    this.runner.cache = {
      Type: CacheType.S3,
      Shared: true,
      s3: {
        BucketName: bucket.bucketName,
        BucketLocation: Stack.of(scope).region,
      },
    };
  }

  /**
   * Render the configuration to a TOML string.
   */
  public generateToml() {
    return toml.stringify(this.config);
  }

  /**
   * Sets the executor and replaces the `[runners.docker]` section and the
   * environment.
   */
  private setDocker(executor: GitlabExecutor, props?: DockerRunnerConfig) {
    const runner = this.runner;
    runner.executor = executor;
    runner.docker = {
      image: props?.image ?? DEFAULT_DOCKER_IMAGE,
      privileged: props?.privileged ?? false,
      disable_cache: props?.disableCache ?? false,
      volumes: [...(props?.volumes ?? DEFAULT_VOLUMES)],
    };
    runner.environment = [];
  }

  private get runner() {
    return this.config.runners[0];
  }

  /**
   * Merge additional environment variables into the runner configuration.
   */
  private addEnvironments(envVariables: Record<string, string>) {
    const runner = this.runner;
    runner.environment ??= [];
    const environment = runner.environment;
    Object.entries(envVariables).forEach(([key, value]) => {
      environment.push(`${key}=${value}`);
    });
  }
}
