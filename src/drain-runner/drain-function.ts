import { IAutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { LAMBDA_ASSET_DIR } from './assets';

/**
 * Properties for configuring the {@link DrainFunction}.
 */
export interface DrainFunctionProps {
  /**
   * URL of the GitLab instance.
   */
  readonly gitEndpoint: string;
  /**
   * Secret containing the runner authentication token.
   */
  readonly secret: ISecret;
  /**
   * AutoScaling group in which the runner instance lives.
   */
  readonly autoScalingGroup: IAutoScalingGroup;
}

/**
 * Lambda function used by the drain state machine to pause and terminate a
 * runner instance.
 */
export class DrainFunction extends Function {
  constructor(scope: Construct, id: string, props: DrainFunctionProps) {
    super(scope, id, {
      code: Code.fromAsset(LAMBDA_ASSET_DIR),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_16_X,
      environment: {
        SECRET_ARN: props.secret.secretArn,
        GIT_ENDPOINT: props.gitEndpoint,
      },
    });

    props.secret.grantRead(this);
    props.secret.encryptionKey?.grantDecrypt(this);

    this.addToRolePolicy(
      new PolicyStatement({
        actions: ['ec2:DescribeInstances', 'ec2:DescribeTags'],
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
