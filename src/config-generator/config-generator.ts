import * as toml from '@iarna/toml';
import { Stack } from 'aws-cdk-lib';
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
    const runner = this.runner;
    runner.executor = GitlabExecutor.DOCKER;
    runner.docker = {
      image: props?.image ?? DEFAULT_DOCKER_IMAGE,
      privileged: props?.privileged ?? false,
      disable_cache: props?.disableCache ?? false,
      volumes: [...(props?.volumes ?? DEFAULT_VOLUMES)],
    };

    runner.environment = [];
    this.addEnvironments({
      // Let the runner pull from ECR with the instance role.
      DOCKER_AUTH_CONFIG: '{ "credsStore": "ecr-login" }',
      ...props?.env,
    });
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
