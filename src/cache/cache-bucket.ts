import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { IPrincipal } from 'aws-cdk-lib/aws-iam';
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

export interface ICacheBucket {
  /**
   * The bucket that was created for the cache
   *
   * @type {Bucket}
   */
  readonly bucket: Bucket;
  /**
   * Grant read and write access to the bucket to the grantee.
   * @param grantee
   */
  grantReadWrite(grantee: IPrincipal): void;
}

export class GitLabCacheBucket extends Construct implements ICacheBucket {
  readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props: GitLabCacheBucketProps) {
    super(scope, id);

    this.bucket = new Bucket(this, 'GitLabCacheBucket', {
      autoDeleteObjects: true,
      bucketName: props.bucketNamePrefix
        ? `${props.bucketNamePrefix}-gitlab-cache`
        : `${Stack.of(this).account}-${Stack.of(this).region}-gitlab-cache`,
      encryptionKey: props.encryptionKey,
      removalPolicy: RemovalPolicy.DESTROY,
      enforceSSL: true,
    });

    this.bucket.addLifecycleRule({
      expiration: props.cacheDuration ?? Duration.days(7),
    });
  }

  grantReadWrite(grantee: IPrincipal) {
    this.bucket.grantReadWrite(grantee);
  }
}
