import { Duration } from 'aws-cdk-lib';
import { AutoScalingGroup, AdjustmentType } from 'aws-cdk-lib/aws-autoscaling';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { Schedule, Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { SCALER_ASSET_DIR } from './assets';

export interface RunnerScalerProps {
  readonly autoScalingGroup: AutoScalingGroup;
  readonly tokenSecret: ISecret;
  readonly gitlabUrl: string;
  readonly schedule?: Schedule;
}

export class RunnerScaler extends Construct {
  constructor(scope: Construct, id: string, props: RunnerScalerProps) {
    super(scope, id);

    const metricNamespace = 'GitLabRunner';
    const metricName = 'QueueLength';

    const scalerFunction = new Function(this, 'ScalerFunction', {
      code: Code.fromAsset(SCALER_ASSET_DIR),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_18_X,
      environment: {
        SECRET_ARN: props.tokenSecret.secretArn,
        GITLAB_URL: props.gitlabUrl,
        METRIC_NAMESPACE: metricNamespace,
        METRIC_NAME: metricName,
      },
      timeout: Duration.minutes(5),
    });

    props.tokenSecret.grantRead(scalerFunction);
    props.tokenSecret.encryptionKey?.grantDecrypt(scalerFunction);

    scalerFunction.addToRolePolicy(
      new PolicyStatement({
        actions: ['cloudwatch:PutMetricData'],
        resources: ['*'],
      }),
    );

    const rule = new Rule(this, 'ScheduleRule', {
      schedule: props.schedule ?? Schedule.rate(Duration.minutes(5)),
    });
    rule.addTarget(new LambdaFunction(scalerFunction));

    const queueMetric = new Metric({
      namespace: metricNamespace,
      metricName: metricName,
    });

    props.autoScalingGroup.scaleOnMetric('RunnerQueueScaling', {
      metric: queueMetric,
      scalingSteps: [
        { upper: 0, change: -1 },
        { lower: 1, change: +1 },
        { lower: 5, change: +3 },
      ],
      adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
    });
  }
}
