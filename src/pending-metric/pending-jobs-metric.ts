import { Duration } from 'aws-cdk-lib';
import { Metric, Unit } from 'aws-cdk-lib/aws-cloudwatch';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { METRIC_LAMBDA_DIR } from './assets';

export interface PendingJobsMetricProps {
  readonly gitEndpoint: string;
  readonly secret: ISecret;
  readonly schedule?: Schedule;
}

export class PendingJobsMetric extends Construct {
  readonly metric: Metric;

  constructor(scope: Construct, id: string, props: PendingJobsMetricProps) {
    super(scope, id);

    const fn = new Function(this, 'Function', {
      code: Code.fromAsset(METRIC_LAMBDA_DIR),
      handler: 'pending-jobs.function.handler',
      runtime: Runtime.NODEJS_16_X,
      environment: {
        SECRET_ARN: props.secret.secretArn,
        GIT_ENDPOINT: props.gitEndpoint,
      },
    });

    props.secret.grantRead(fn);
    props.secret.encryptionKey?.grantDecrypt(fn);

    this.metric = new Metric({
      namespace: 'GitLabRunner',
      metricName: 'PendingJobs',
      unit: Unit.COUNT,
    });

    new Rule(this, 'ScheduleRule', {
      schedule: props.schedule ?? Schedule.rate(Duration.minutes(1)),
    }).addTarget(new LambdaFunction(fn));
  }
}
