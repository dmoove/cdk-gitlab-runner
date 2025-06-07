import { Duration } from 'aws-cdk-lib';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { LAMBDA_ASSET_DIR } from './assets';

export interface PendingJobsCollectorProps {
  readonly secret: ISecret;
  readonly gitlabUrl: string;
  readonly schedule?: Duration;
  readonly namespace?: string;
}

export class PendingJobsCollector extends Construct {
  readonly metric: Metric;
  readonly function: Function;

  constructor(scope: Construct, id: string, props: PendingJobsCollectorProps) {
    super(scope, id);

    this.function = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset(LAMBDA_ASSET_DIR),
      environment: {
        SECRET_ARN: props.secret.secretArn,
        GIT_ENDPOINT: props.gitlabUrl,
        NAMESPACE: props.namespace ?? 'GitLabRunner',
      },
    });

    props.secret.grantRead(this.function);
    props.secret.encryptionKey?.grantDecrypt(this.function);

    new Rule(this, 'Schedule', {
      schedule: Schedule.rate(props.schedule ?? Duration.minutes(1)),
      targets: [new LambdaFunction(this.function)],
    });

    this.metric = new Metric({
      namespace: props.namespace ?? 'GitLabRunner',
      metricName: 'PendingJobs',
      period: props.schedule ?? Duration.minutes(1),
    });
  }
}
