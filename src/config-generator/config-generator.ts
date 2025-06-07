import * as toml from '@iarna/toml';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CacheType, GitlabExecutor } from './enums';
import { GitLabCacheBucket } from '../cache/cache-bucket';
import { GlConfig } from '../types/runner-config';

export type Volume =
  | '/var/run/docker.sock:/var/run/docker.sock'
  | '/cache:/cache'
  | '/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw'
  | string;

/**
 * Our default volumes
 */
const DEFAULT_VOLUMES: readonly Volume[] = [
  '/var/run/docker.sock:/var/run/docker.sock',
  '/cache:/cache',
  '/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw',
];

/**
 * Properties for the GlConfigGenerator class.
 */
export interface GlConfigGeneratorProps {
  /**
   * How many jobs can run concurrently?
   *
   * @type {number}
   */
  readonly concurrent: number;

  /**
   * The gitlab url.
   *
   * @type {string}
   */
  readonly gitlabUrl: string;
}

export interface ConfigDockerExecutor {
  /**
   * default image for docker executor
   *
   * @type {string}
   * @default ubuntu:20.04
   */
  readonly gitlabImage?: string;

  /**
   * default mode for containers
   *
   * @type {boolean}
   * @default false
   */
  readonly privileged?: boolean;

  /**
   *  volumes for docker executor
   *
   * @type {string[]}
   * @default ["/var/run/docker.sock:/var/run/docker.sock", "/cache:/cache", "/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw"]
   */
  readonly volumes?: Volume[];

  /**
   * build cache for docker executor
   *
   * @type {boolean}
   * @default false
   */
  readonly disableCache?: boolean;

  /**
   * add custom environment variables
   */
  readonly env?: EnvVariables;
}

type EnvVariables = Record<string, string>;

export interface IGitLabConfig {
  /**
   * Adds an executor to the configuration.
   *
   * @param props The properties for the executor.
   */
  addDockerExecutor(props?: ConfigDockerExecutor): void;

  /**
   * Adds a cache to the configuration.
   * @param scope
   * @param bucket
   */
  addCache(scope: Construct, bucket: GitLabCacheBucket): void;

  /**
   * Generates the GitLab configuration as a TOML string.
   */
  generateToml(): string;
}

/**
 * Generates a gitlab config toml file
 */
export class GitLabConfig implements IGitLabConfig {
  private readonly config: GlConfig;
  private readonly url: string;

  constructor(props: GlConfigGeneratorProps) {
    this.url = props.gitlabUrl;
    this.config = {
      concurrent: props.concurrent,
      runners: [
        {
          url: this.url,
          token: '{TOKEN}',
          executor: GitlabExecutor.DOCKER,
          environment: [],
        },
      ],
    };
  }

  /**
   * Add a Docker executor configuration to the generated config.
   *
   * @param props - optional docker specific settings
   */
  public addDockerExecutor(props?: ConfigDockerExecutor) {
    const runner = this.config.runners[0];
    runner.executor = GitlabExecutor.DOCKER;
    runner.docker = {
      image: props?.gitlabImage ?? 'ubuntu:20.04',
      privileged: props?.privileged ?? false,
      disable_cache: props?.disableCache ?? false,
      volumes: (props?.volumes ?? DEFAULT_VOLUMES) as string[],
    };

    if (props?.env) {
      this.addEnvironments(props.env);
    }

    this.addEnvironments({
      DOCKER_AUTH_CONFIG: '{ "credsStore": "ecr-login" }',
    });
  }

  /**
   * Merge additional environment variables into the runner configuration.
   */
  private addEnvironments(envVariables: Record<string, string>) {
    const runner = this.config.runners[0];

    if (!runner.environment) {
      runner.environment = [];
    }

    const environmentArray = runner.environment;
    Object.entries(envVariables).forEach(([key, value]) => {
      environmentArray.push(`${key}=${value}`);
    });
  }

  /**
   * Enable S3 caching for the runner using the provided bucket.
   */
  public addCache(scope: Construct, bucket: GitLabCacheBucket) {
    this.config.runners[0].cache = {
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
}
