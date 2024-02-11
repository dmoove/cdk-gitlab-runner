import { App, Stack, Duration } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { GitLabCacheBucket } from '../src/cache/cache-bucket';

describe('GitLabCacheBucket', () => {
  let app: App;
  let stack: Stack;
  let encryptionKey: Key;
  let template: Template;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
    encryptionKey = new Key(stack, 'EncryptionKey');
  });

  test('default configuration', () => {
    new GitLabCacheBucket(stack, 'MyGitLabCacheBucket', {
      encryptionKey: encryptionKey,
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms',
              KMSMasterKeyID: Match.objectLike({
                'Fn::GetAtt': Match.anyValue(),
              }),
            },
          },
        ],
      },
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            ExpirationInDays: 7,
          },
        ],
      },
    });
  });

  test('custom bucket name prefix and cache duration', () => {
    new GitLabCacheBucket(stack, 'CustomGitLabCacheBucket', {
      bucketNamePrefix: 'custom-prefix',
      encryptionKey: encryptionKey,
      cacheDuration: Duration.days(30),
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'custom-prefix-gitlab-cache',
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            ExpirationInDays: 30,
          },
        ],
      },
    });
  });

  test('grad read and write permissions to the bucket for a grantee', () => {
    const bucket = new GitLabCacheBucket(stack, 'CustomGitLabCacheBucket', {
      bucketNamePrefix: 'custom-prefix',
      encryptionKey: encryptionKey,
      cacheDuration: Duration.days(30),
    });

    const role = new Role(stack, 'TestRole', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
    });

    bucket.grantReadWrite(role);

    template = Template.fromStack(stack);

    template.resourceCountIs('AWS::IAM::Policy', 1);
  });
});
