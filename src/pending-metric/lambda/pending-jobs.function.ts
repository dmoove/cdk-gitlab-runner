import {
  CloudWatchClient,
  PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { GitLabClient, GitLabJob } from '../../lambda-common/gitlab';
import { getGitLabSecret } from '../../lambda-common/secret';

/** CloudWatch namespace used for all runner metrics. */
export const METRIC_NAMESPACE = 'GitLabRunner';
/** Name of the pending jobs metric. */
export const PENDING_JOBS_METRIC = 'PendingJobs';
/** Dimension that separates the metric per executor. */
export const EXECUTOR_DIMENSION = 'Executor';

export interface PendingJobsResult {
  readonly pendingJobs: number;
  readonly projects: number;
}

const cloudwatch = new CloudWatchClient({});

/**
 * Counts pending jobs and publishes them as a CloudWatch metric.
 *
 * Pending jobs are not assigned to a runner yet, so they cannot be read from
 * the runner endpoints. The function therefore lists the jobs of every
 * configured project (`PROJECT_IDS`) or of every project of a group
 * (`GROUP_ID`, including subgroups) with `scope=pending`. When
 * `RUNNER_TAGS` is set only jobs whose tags are all covered by the runner
 * tags are counted, so the metric matches what this executor would pick up.
 */
export async function handler(): Promise<PendingJobsResult> {
  const secretArn = process.env.SECRET_ARN;
  const gitEndpoint = process.env.GIT_ENDPOINT;
  const executor = process.env.EXECUTOR;
  if (!secretArn || !gitEndpoint || !executor) {
    throw new Error(
      'Missing environment variables SECRET_ARN, GIT_ENDPOINT or EXECUTOR',
    );
  }

  const projectIds = parseIdList(process.env.PROJECT_IDS);
  const groupId = process.env.GROUP_ID
    ? Number.parseInt(process.env.GROUP_ID, 10)
    : undefined;
  const runnerTags = parseList(process.env.RUNNER_TAGS);

  if (projectIds.length === 0 && groupId === undefined) {
    throw new Error('Either PROJECT_IDS or GROUP_ID must be set');
  }

  const secret = await getGitLabSecret(secretArn);
  const gitlab = new GitLabClient({
    endpoint: gitEndpoint,
    token: secret.PrivateToken,
  });

  const projects = new Set<number>(projectIds);
  if (groupId !== undefined) {
    (await gitlab.listGroupProjects(groupId)).forEach((project) =>
      projects.add(project.id),
    );
  }

  let pendingJobs = 0;
  for (const projectId of projects) {
    const jobs = await gitlab.listProjectJobs(projectId, 'pending');
    pendingJobs += jobs.filter((job) => matchesRunner(job, runnerTags)).length;
  }

  await cloudwatch.send(
    new PutMetricDataCommand({
      Namespace: METRIC_NAMESPACE,
      MetricData: [
        {
          MetricName: PENDING_JOBS_METRIC,
          Dimensions: [{ Name: EXECUTOR_DIMENSION, Value: executor }],
          Timestamp: new Date(),
          Unit: 'Count',
          Value: pendingJobs,
        },
      ],
    }),
  );

  return { pendingJobs, projects: projects.size };
}

/**
 * A job can run on this executor when every tag the job asks for is one of
 * the runner's tags. Without configured runner tags every job counts.
 */
export function matchesRunner(job: GitLabJob, runnerTags: string[]): boolean {
  if (runnerTags.length === 0) {
    return true;
  }
  const jobTags = job.tag_list ?? [];
  return jobTags.every((tag) => runnerTags.includes(tag));
}

function parseList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseIdList(value: string | undefined): number[] {
  return parseList(value)
    .map((item) => Number.parseInt(item, 10))
    .filter((id) => Number.isInteger(id));
}
