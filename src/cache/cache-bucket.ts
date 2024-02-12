import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface GitLabCacheBucketProps {
  /**
   * bucketNamePrefix, so that it can follow your naming scheme
   *
   * @default - {account}-{region}-gitlab-cache
   */
  readonly bucketNamePrefix?: string;

  /**
   * bucket encryption?
   *
   * @default - key for the gitlab runner stack
   */
  readonly encryptionKey: Key;

  /**
   * How many days the objects should be cached
   *
   * @default - 7
   */
  readonly cacheDuration?: Duration;
}

export class GitLabCacheBucket extends Bucket {
  constructor(scope: Construct, id: string, props: GitLabCacheBucketProps) {
    super(scope, id, {
      autoDeleteObjects: true,
      bucketName: props.bucketNamePrefix
        ? `${props.bucketNamePrefix}-gitlab-cache`
        : `${Stack.of(scope).account}-${Stack.of(scope).region}-gitlab-cache`,
      encryptionKey: props.encryptionKey,
      removalPolicy: RemovalPolicy.DESTROY,
      enforceSSL: true,
    });

    this.addLifecycleRule({
      expiration: props.cacheDuration ?? Duration.days(7),
    });
  }
}
