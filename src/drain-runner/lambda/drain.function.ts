import {
  AutoScalingClient,
  CompleteLifecycleActionCommand,
  RecordLifecycleActionHeartbeatCommand,
} from '@aws-sdk/client-auto-scaling';
import { DescribeTagsCommand, EC2Client } from '@aws-sdk/client-ec2';
import { GitLabClient } from '../../lambda-common/gitlab';
import { getGitLabSecret } from '../../lambda-common/secret';

/** Tag written by the bootstrap script that links an instance to its runner. */
export const RUNNER_ID_TAG = 'RunnerId';

/**
 * Relevant part of the `EC2 Instance-terminate Lifecycle Action` event.
 */
export interface LifecycleEventDetail {
  readonly LifecycleActionToken?: string;
  readonly AutoScalingGroupName: string;
  readonly LifecycleHookName: string;
  readonly EC2InstanceId: string;
  readonly LifecycleTransition?: string;
}

/**
 * Input of the drain Lambda as sent by the drain state machine.
 */
export interface DrainEvent {
  /** Lifecycle event detail forwarded from EventBridge. */
  readonly detail: LifecycleEventDetail;
  /**
   * `drain` pauses the runner and checks for running jobs (default).
   * `abandon` gives up waiting and lets the instance terminate.
   */
  readonly action?: 'drain' | 'abandon';
}

export type DrainStatus = 'drained' | 'draining' | 'abandoned';

export interface DrainResult {
  readonly status: DrainStatus;
  readonly runnerId?: number;
  readonly runningJobs?: number;
}

const ec2 = new EC2Client({});
const autoscaling = new AutoScalingClient({});

/**
 * Entry point for the drain Lambda.
 *
 * On `drain` the runner belonging to the instance is paused so it does not
 * pick up new jobs. When no job is running any more the runner is deleted
 * from GitLab and the AutoScaling lifecycle action is completed, otherwise a
 * heartbeat is recorded and `draining` is returned so the state machine can
 * retry later. On `abandon` the lifecycle action is completed with
 * `ABANDON`, which terminates the instance regardless of running jobs.
 */
export async function handler(event: DrainEvent): Promise<DrainResult> {
  const secretArn = process.env.SECRET_ARN;
  const gitEndpoint = process.env.GIT_ENDPOINT;
  if (!secretArn || !gitEndpoint) {
    throw new Error('Missing environment variables SECRET_ARN or GIT_ENDPOINT');
  }

  const lifecycle = {
    AutoScalingGroupName: event.detail.AutoScalingGroupName,
    LifecycleHookName: event.detail.LifecycleHookName,
    InstanceId: event.detail.EC2InstanceId,
  };

  if (event.action === 'abandon') {
    await autoscaling.send(
      new CompleteLifecycleActionCommand({
        ...lifecycle,
        LifecycleActionResult: 'ABANDON',
      }),
    );
    return { status: 'abandoned' };
  }

  const runnerId = await getRunnerId(event.detail.EC2InstanceId);
  const secret = await getGitLabSecret(secretArn);
  const gitlab = new GitLabClient({
    endpoint: gitEndpoint,
    token: secret.PrivateToken,
  });

  const exists = await gitlab.setRunnerPaused(runnerId, true);
  const runningJobs = exists
    ? await gitlab.listRunnerJobs(runnerId, 'running')
    : [];

  if (runningJobs.length > 0) {
    await autoscaling.send(
      new RecordLifecycleActionHeartbeatCommand(lifecycle),
    );
    return { status: 'draining', runnerId, runningJobs: runningJobs.length };
  }

  if (exists) {
    await gitlab.deleteRunner(runnerId);
  }
  await autoscaling.send(
    new CompleteLifecycleActionCommand({
      ...lifecycle,
      LifecycleActionResult: 'CONTINUE',
    }),
  );
  return { status: 'drained', runnerId, runningJobs: 0 };
}

/**
 * Reads the GitLab runner id from the `RunnerId` tag of the instance.
 */
async function getRunnerId(instanceId: string): Promise<number> {
  const response = await ec2.send(
    new DescribeTagsCommand({
      Filters: [
        { Name: 'resource-id', Values: [instanceId] },
        { Name: 'key', Values: [RUNNER_ID_TAG] },
      ],
    }),
  );

  const value = response.Tags?.find((tag) => tag.Key === RUNNER_ID_TAG)?.Value;
  const runnerId = value ? Number.parseInt(value, 10) : Number.NaN;
  if (!Number.isInteger(runnerId) || runnerId <= 0) {
    throw new Error(
      `Instance ${instanceId} has no valid ${RUNNER_ID_TAG} tag (value: ${value ?? 'missing'})`,
    );
  }
  return runnerId;
}
