import { join } from 'path';
import { Duration } from 'aws-cdk-lib';
import { IAutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

/**
 * Directory that holds the bundled drain handler.
 *
 * The bundle is produced by `npm run bundle` into `<package>/lambda/drain`
 * and shipped with the npm package. The path resolves identically from
 * `src/` (tests) and `lib/` (compiled output).
 */
export const DRAIN_LAMBDA_DIR = join(__dirname, '..', '..', 'lambda', 'drain');

/**
 * Properties for configuring the {@link DrainFunction}.
 */
export interface DrainFunctionProps {
  /**
   * URL of the GitLab instance, for example `https://gitlab.com/`.
   */
  readonly gitEndpoint: string;
  /**
   * Secret containing the GitLab access token as `PrivateToken`.
   *
   * The token needs the `manage_runner` and `read_api` scopes so the
   * function can pause, inspect and delete runners.
   */
  readonly secret: ISecret;
  /**
   * AutoScaling group in which the runner instances live.
   */
  readonly autoScalingGroup: IAutoScalingGroup;
}

/**
 * Lambda function used by the drain state machine to pause a runner, wait
 * for its jobs, delete it from GitLab and release the AutoScaling lifecycle
 * hook.
 *
 * The function is invoked with `{ detail, action }` where `detail` is the
 * lifecycle event detail and `action` is `drain` or `abandon`. It returns
 * `{ status: 'drained' | 'draining' | 'abandoned' }`.
 */
export class DrainFunction extends Function {
  constructor(scope: Construct, id: string, props: DrainFunctionProps) {
    super(scope, id, {
      code: Code.fromAsset(DRAIN_LAMBDA_DIR),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      timeout: Duration.minutes(1),
      description:
        'Pauses a GitLab runner and completes the AutoScaling lifecycle hook once no job is running',
      environment: {
        SECRET_ARN: props.secret.secretArn,
        GIT_ENDPOINT: props.gitEndpoint,
      },
    });

    props.secret.grantRead(this);
    props.secret.encryptionKey?.grantDecrypt(this);

    this.addToRolePolicy(
      new PolicyStatement({
        actions: ['ec2:DescribeTags'],
        resources: ['*'],
      }),
    );

    this.addToRolePolicy(
      new PolicyStatement({
        actions: [
          'autoscaling:RecordLifecycleActionHeartbeat',
          'autoscaling:CompleteLifecycleAction',
        ],
        resources: [props.autoScalingGroup.autoScalingGroupArn],
      }),
    );
  }
}
