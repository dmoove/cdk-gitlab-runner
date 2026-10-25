/**
 * GitLab runner version installed on the executor instances.
 *
 * Pinned so deployments are reproducible. Override it with
 * `RunnerConfig.runnerVersion`.
 */
export const DEFAULT_RUNNER_VERSION = '19.3.1';

/**
 * Scope of a runner created through `POST /api/v4/user/runners`.
 */
export enum RunnerType {
  /** Available to every project of the GitLab instance (admin token). */
  INSTANCE = 'instance_type',
  /** Available to all projects of a group. Requires `groupId`. */
  GROUP = 'group_type',
  /** Available to a single project. Requires `projectId`. */
  PROJECT = 'project_type',
}

/**
 * Whether a runner may pick up jobs from unprotected branches and tags.
 */
export enum RunnerAccessLevel {
  NOT_PROTECTED = 'not_protected',
  REF_PROTECTED = 'ref_protected',
}

/**
 * Request body sent by the bootstrap script to `POST /api/v4/user/runners`.
 *
 * Property names follow the GitLab API so the object can be serialised as
 * is. The bootstrap script appends the EC2 instance id to `description`.
 *
 * @see https://docs.gitlab.com/api/users/#create-a-runner-linked-to-a-user
 */
export interface RunnerRegistration {
  readonly runner_type: RunnerType;
  readonly group_id?: number;
  readonly project_id?: number;
  readonly description?: string;
  readonly paused?: boolean;
  readonly locked?: boolean;
  readonly run_untagged?: boolean;
  readonly tag_list?: string[];
  readonly access_level?: RunnerAccessLevel;
  readonly maximum_timeout?: number;
  readonly maintenance_note?: string;
}

/**
 * Builds the tag list of a runner: the executor tags, the tags already on
 * the registration and the defaults (account, region, `docker`, `runner`),
 * trimmed and without duplicates.
 *
 * @param defaults - account id and region of the stack
 * @param tags - GitLab runner tags of the executor
 * @param registration - registration whose `tag_list` is merged
 */
export function buildRunnerTagList(
  defaults: { readonly account: string; readonly region: string },
  tags: string[] | undefined,
  registration: RunnerRegistration,
): string[] {
  return [
    ...(tags ?? []),
    ...(registration.tag_list ?? []),
    defaults.account,
    defaults.region,
    'docker',
    'runner',
  ]
    .map((tag) => tag.trim())
    .filter((tag, index, all) => tag.length > 0 && all.indexOf(tag) === index);
}

/**
 * Validates that the registration names the group or project it needs.
 */
export function validateRunnerRegistration(
  registration: RunnerRegistration,
): void {
  if (
    registration.runner_type === RunnerType.GROUP &&
    registration.group_id === undefined
  ) {
    throw new Error('A group runner requires groupId');
  }
  if (
    registration.runner_type === RunnerType.PROJECT &&
    registration.project_id === undefined
  ) {
    throw new Error('A project runner requires projectId');
  }
  if (
    registration.maximum_timeout !== undefined &&
    registration.maximum_timeout < 600
  ) {
    throw new Error('maximumTimeout must be at least 10 minutes');
  }
}
