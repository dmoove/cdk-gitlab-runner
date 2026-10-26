import { join } from 'path';
import { CustomResource, Duration, Stack } from 'aws-cdk-lib';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import {
  RunnerRegistration,
  validateRunnerRegistration,
} from '../config-generator/registration';

/**
 * Directory that holds the bundled registration handler.
 *
 * Produced by `npm run bundle` into `<package>/lambda/runner-registration`.
 */
export const RUNNER_REGISTRATION_LAMBDA_DIR = join(
  __dirname,
  '..',
  '..',
  'lambda',
  'runner-registration',
);

/**
 * Properties for {@link GitLabRunnerRegistration}.
 */
export interface GitLabRunnerRegistrationProps {
  /**
   * Secret with the GitLab access token as `PrivateToken`. The token needs
   * the scopes `create_runner` and `manage_runner`.
   */
  readonly accessTokenSecret: ISecret;
  /**
   * GitLab base URL.
   */
  readonly gitlabUrl: string;
  /**
   * Request body sent to `POST /api/v4/user/runners`.
   */
  readonly registration: RunnerRegistration;
  /**
   * KMS key used to encrypt the runner token secret.
   *
   * @default - the AWS managed key of Secrets Manager
   */
  readonly encryptionKey?: IKey;
}

/**
 * A GitLab runner managed by CloudFormation.
 *
 * A custom resource creates the runner through `POST /api/v4/user/runners`
 * and stores its authentication token in {@link runnerTokenSecret} as
 * `{"token": "glrt-...", "id": <runner id>}`. A changed registration
 * creates a new runner and deletes the old one; deleting the stack deletes
 * the runner from GitLab.
 *
 * Use it for long-lived runner managers whose runner must survive restarts,
 * like the Docker Autoscaler executor on ECS.
 */
export class GitLabRunnerRegistration extends Construct {
  /** Secret that holds the runner authentication token as `token`. */
  readonly runnerTokenSecret: ISecret;
  /** Id of the runner in GitLab. */
  readonly runnerId: string;

  constructor(
    scope: Construct,
    id: string,
    props: GitLabRunnerRegistrationProps,
  ) {
    super(scope, id);
    validateRunnerRegistration(props.registration);

    this.runnerTokenSecret = new Secret(this, 'RunnerToken', {
      description: `GitLab runner authentication token of ${this.node.path}`,
      encryptionKey: props.encryptionKey,
    });

    const onEvent = new Function(this, 'Handler', {
      code: Code.fromAsset(RUNNER_REGISTRATION_LAMBDA_DIR),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      timeout: Duration.minutes(1),
      description: 'Creates and deletes a GitLab runner for CloudFormation',
    });
    props.accessTokenSecret.grantRead(onEvent);
    props.accessTokenSecret.encryptionKey?.grantDecrypt(onEvent);
    this.runnerTokenSecret.grantWrite(onEvent);

    const provider = new Provider(this, 'Provider', {
      onEventHandler: onEvent,
    });

    const resource = new CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      resourceType: 'Custom::GitLabRunnerRegistration',
      properties: {
        AccessTokenSecretArn: props.accessTokenSecret.secretArn,
        RunnerTokenSecretArn: this.runnerTokenSecret.secretArn,
        GitLabUrl: props.gitlabUrl,
        Registration: Stack.of(this).toJsonString(props.registration),
      },
    });
    this.runnerId = resource.getAttString('RunnerId');
  }
}
