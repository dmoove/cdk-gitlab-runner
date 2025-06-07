import { Duration } from 'aws-cdk-lib';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { PENDING_JOBS_LAMBDA_DIR } from './assets';

export interface PendingJobsMetricProps {
  readonly gitlabUrl: string;
  readonly secret: ISecret;
}

export class PendingJobsMetric extends Construct {
  readonly metric: Metric;

  constructor(scope: Construct, id: string, props: PendingJobsMetricProps) {
    super(scope, id);

    const fn = new Function(this, 'MetricFunction', {
      code: Code.fromAsset(PENDING_JOBS_LAMBDA_DIR),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_16_X,
      environment: {
        SECRET_ARN: props.secret.secretArn,
        GIT_ENDPOINT: props.gitlabUrl,
      },
    });

    props.secret.grantRead(fn);
    props.secret.encryptionKey?.grantDecrypt(fn);

    fn.addToRolePolicy(
      new PolicyStatement({
        actions: ['cloudwatch:PutMetricData'],
        resources: ['*'],
      }),
    );

    new Rule(this, 'ScheduleRule', {
      schedule: Schedule.rate(Duration.minutes(1)),
      targets: [new LambdaFunction(fn)],
    });

    this.metric = new Metric({
      namespace: 'GitLabRunner',
      metricName: 'PendingJobsPerRunner',
    });
  }
}
