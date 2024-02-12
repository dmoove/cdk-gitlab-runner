import { IAutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { LAMBDA_ASSET_DIR } from './assets';

export interface DrainFunctionProps {
  readonly gitEndpoint: string;
  readonly secret: ISecret;
  readonly autoScalingGroup: IAutoScalingGroup;
}

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
