import {
  PutSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import type { CloudFormationCustomResourceEvent } from 'aws-lambda';
import { GitLabClient } from '../../lambda-common/gitlab';
import { getGitLabSecret } from '../../lambda-common/secret';

/**
 * Properties of the `Custom::GitLabRunnerRegistration` resource.
 */
export interface RunnerRegistrationProperties {
  /** ARN of the secret with the GitLab access token (`PrivateToken`). */
  readonly AccessTokenSecretArn: string;
  /** ARN of the secret that receives the runner authentication token. */
  readonly RunnerTokenSecretArn: string;
  /** GitLab base URL. */
  readonly GitLabUrl: string;
  /** JSON encoded body of `POST /api/v4/user/runners`. */
  readonly Registration: string;
}

/** Response for the CDK custom resource provider framework. */
export interface RunnerRegistrationResponse {
  readonly PhysicalResourceId: string;
  readonly Data?: { readonly RunnerId: string };
}

let secretsClient: SecretsManagerClient | undefined;

/**
 * Creates and deletes the GitLab runner of a runner manager.
 *
 * - Create and Update create a new runner and store
 *   `{"token": "glrt-...", "id": <id>}` in the runner token secret. The
 *   runner id is the physical id, so CloudFormation sends a Delete for the
 *   previous runner after an update.
 * - Delete removes the runner from GitLab. A runner that no longer exists
 *   is ignored.
 *
 * The runner token never leaves the function except into the secret; it is
 * not part of the response, which CloudFormation would store in plain text.
 */
export async function handler(
  event: CloudFormationCustomResourceEvent,
): Promise<RunnerRegistrationResponse> {
  const props =
    event.ResourceProperties as unknown as RunnerRegistrationProperties;
  const { PrivateToken } = await getGitLabSecret(props.AccessTokenSecretArn);
  const gitlab = new GitLabClient({
    endpoint: props.GitLabUrl,
    token: PrivateToken,
  });

  if (event.RequestType === 'Delete') {
    const runnerId = Number(event.PhysicalResourceId);
    if (Number.isInteger(runnerId) && runnerId > 0) {
      const deleted = await gitlab.deleteRunner(runnerId);
      console.log(
        deleted
          ? `Deleted runner ${runnerId}`
          : `Runner ${runnerId} was already deleted`,
      );
    }
    return { PhysicalResourceId: event.PhysicalResourceId };
  }

  const runner = await gitlab.createRunner(
    JSON.parse(props.Registration) as object,
  );
  secretsClient ??= new SecretsManagerClient({});
  await secretsClient.send(
    new PutSecretValueCommand({
      SecretId: props.RunnerTokenSecretArn,
      SecretString: JSON.stringify({ token: runner.token, id: runner.id }),
    }),
  );
  console.log(`Created runner ${runner.id}`);

  return {
    PhysicalResourceId: String(runner.id),
    Data: { RunnerId: String(runner.id) },
  };
}
