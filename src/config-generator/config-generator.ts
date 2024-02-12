import * as toml from '@iarna/toml';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GitlabExecutor } from './enums';
import { GitLabCacheBucket } from '../cache/cache-bucket';
import { GlConfig } from '../types/runner-config';

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
  readonly volumes?: string[];

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
      runners: [],
    };
  }

  // Ensure a base runner is always available for modifications
  private ensureBaseRunner() {
    if (this.config.runners.length === 0) {
      this.config.runners.push({
        url: this.url,
        token: '{TOKEN}',
        executor: GitlabExecutor.DOCKER,
        environment: [],
      });
    }
  }

  public addDockerExecutor(props?: ConfigDockerExecutor) {
    this.ensureBaseRunner();

    const runner = this.config.runners[0];
    runner.executor = GitlabExecutor.DOCKER;
    runner.docker = {
      image: props?.gitlabImage ?? 'ubuntu:20.04',
      privileged: props?.privileged ?? false,
      disable_cache: props?.disableCache ?? false,
      volumes: props?.volumes ?? [
        '/var/run/docker.sock:/var/run/docker.sock',
        '/cache:/cache',
        '/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw',
      ],
    };

    const envVariables: Record<string, string | undefined> = {
      ...props?.env,
      DOCKER_AUTH_CONFIG: '{ "credsStore": "ecr-login" }',
    };

    Object.entries(envVariables).forEach(([key, value]) => {
      this.addEnvironment(key, value!);
    });
  }

  private addEnvironment(key: string, value: string) {
    this.ensureBaseRunner();

    const envString = `${key}=${value}`;
    if (this.config.runners[0]?.environment) {
      this.config.runners[0].environment.push(envString);
    }
  }

  public addCache(scope: Construct, bucket: GitLabCacheBucket) {
    this.ensureBaseRunner();

    this.config.runners[0].cache = {
      Type: 's3',
      Shared: true,
      s3: {
        BucketName: bucket.bucketName,
        BucketLocation: Stack.of(scope).region,
      },
    };
  }

  public generateToml() {
    return toml.stringify(this.config);
  }
}
