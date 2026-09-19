import { join } from 'path';
import { Duration } from 'aws-cdk-lib';
import { Metric, Unit } from 'aws-cdk-lib/aws-cloudwatch';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

/**
 * Directory that holds the bundled pending jobs handler.
 *
 * Produced by `npm run bundle` into `<package>/lambda/pending-jobs`.
 */
export const PENDING_JOBS_LAMBDA_DIR = join(
  __dirname,
  '..',
  '..',
  'lambda',
  'pending-jobs',
);

/** CloudWatch namespace used for all runner metrics. */
export const METRIC_NAMESPACE = 'GitLabRunner';
/** Name of the pending jobs metric. */
export const PENDING_JOBS_METRIC_NAME = 'PendingJobs';
/** Dimension that separates the metric per executor. */
export const EXECUTOR_DIMENSION = 'Executor';

/**
 * Properties for {@link PendingJobsMetric}.
 */
export interface PendingJobsMetricProps {
  /**
   * URL of the GitLab instance, for example `https://gitlab.com/`.
   */
  readonly gitEndpoint: string;
  /**
   * Secret containing the GitLab access token as `PrivateToken`.
   * The token needs the `read_api` scope.
   */
  readonly secret: ISecret;
  /**
   * Projects whose pending jobs are counted.
   *
   * At least one of `projectIds` or `groupId` must be set.
   */
  readonly projectIds?: number[];
  /**
   * Group whose projects (including subgroups) are scanned for pending jobs.
   *
   * At least one of `projectIds` or `groupId` must be set.
   */
  readonly groupId?: number;
  /**
   * Tags of the executor. Only pending jobs whose tags are all covered by
   * these tags are counted, so the metric reflects jobs this executor can
   * run.
   *
   * @default - every pending job is counted
   */
  readonly runnerTags?: string[];
  /**
   * Value of the `Executor` metric dimension.
   *
   * @default - the construct path of this metric
   */
  readonly executorName?: string;
  /**
   * How often the metric is published.
   *
   * @default Schedule.rate(Duration.minutes(1))
   */
  readonly schedule?: Schedule;
}

/**
 * Publishes the number of pending GitLab jobs as a CloudWatch metric.
 *
 * A scheduled Lambda lists the pending jobs of the configured projects or
 * group and writes `GitLabRunner/PendingJobs` with the dimension
 * `Executor`. The metric is exposed as {@link metric} so it can drive
 * scaling policies or alarms.
 */
export class PendingJobsMetric extends Construct {
  /** The published metric, ready to be used in alarms or scaling policies. */
  readonly metric: Metric;
  /** The Lambda function that collects the metric. */
  readonly handler: Function;

  constructor(scope: Construct, id: string, props: PendingJobsMetricProps) {
    super(scope, id);

    if (!props.projectIds?.length && props.groupId === undefined) {
      throw new Error(
        'PendingJobsMetric requires at least one of projectIds or groupId',
      );
    }

    const executorName = props.executorName ?? this.node.path;

    this.handler = new Function(this, 'Function', {
      code: Code.fromAsset(PENDING_JOBS_LAMBDA_DIR),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      timeout: Duration.seconds(50),
      description: 'Publishes the number of pending GitLab jobs to CloudWatch',
      environment: {
        SECRET_ARN: props.secret.secretArn,
        GIT_ENDPOINT: props.gitEndpoint,
        EXECUTOR: executorName,
        PROJECT_IDS: (props.projectIds ?? []).join(','),
        GROUP_ID: props.groupId === undefined ? '' : String(props.groupId),
        RUNNER_TAGS: (props.runnerTags ?? []).join(','),
      },
    });

    props.secret.grantRead(this.handler);
    props.secret.encryptionKey?.grantDecrypt(this.handler);
    this.handler.addToRolePolicy(
      new PolicyStatement({
        actions: ['cloudwatch:PutMetricData'],
        resources: ['*'],
        conditions: {
          StringEquals: { 'cloudwatch:namespace': METRIC_NAMESPACE },
        },
      }),
    );

    this.metric = new Metric({
      namespace: METRIC_NAMESPACE,
      metricName: PENDING_JOBS_METRIC_NAME,
      dimensionsMap: { [EXECUTOR_DIMENSION]: executorName },
      unit: Unit.COUNT,
      statistic: 'Maximum',
      period: Duration.minutes(1),
    });

    new Rule(this, 'ScheduleRule', {
      schedule: props.schedule ?? Schedule.rate(Duration.minutes(1)),
    }).addTarget(new LambdaFunction(this.handler));
  }
}
