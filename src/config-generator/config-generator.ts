import * as toml from '@iarna/toml';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GitlabExecutor } from './enums';
import { GitLabCacheBucket } from '../cache/cache-bucket';
import { GlConfig } from '../types/runner-config';

/**
 * Properties for the GlConfigGenerator class.
 *
 * @export
 * @interface GlConfigGeneratorProps
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
}

/**
 * Generates a gitlab config toml file
 *
 * @export
 * @class GlConfigGenerator
 */
export class GitLabConfig {
  private readonly config: GlConfig;
  private readonly url: string;

  constructor(props: GlConfigGeneratorProps) {
    this.url = props.gitlabUrl;
    this.config = {
      concurrent: props.concurrent,
      runners: [],
    };
  }

  addDockerExecutor(props?: ConfigDockerExecutor) {
    this.config.runners.push({
      url: this.url,
      token: '{TOKEN}',
      executor: GitlabExecutor.DOCKER,
    });

    this.config.runners[0].docker = {
      image: props?.gitlabImage ?? 'ubuntu:20.04',
      privileged: props?.privileged ?? false,
      disable_cache: props?.disableCache ?? false,
      volumes: props?.volumes ?? [
        '/var/run/docker.sock:/var/run/docker.sock',
        '/cache:/cache',
        '/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw',
      ],
    };

    this.addEnvironment('DOCKER_AUTH_CONFIG', '{ "credsStore": "ecr-login" }');
  }

  addEnvironment(key: string, value: string) {
    if (this.config.runners.length === 0) {
      throw new Error('No runners have been added to the configuration.');
    }

    const envString = `${key}=${value}`;

    if (!this.config.runners[0].environment) {
      this.config.runners[0].environment = [];
    }

    this.config.runners[0].environment.push(envString);
  }

  addCache(scope: Construct, bucket: GitLabCacheBucket) {
    if (this.config.runners.length === 0) {
      throw new Error('No runners have been added to the configuration.');
    }

    this.config.runners[0].cache = {
      Type: 's3',
      Shared: true,
      s3: {
        BucketName: bucket.bucket.bucketName,
        BucketLocation: Stack.of(scope).region,
      },
    };
  }

  generateToml() {
    return toml.stringify(this.config);
  }
}
