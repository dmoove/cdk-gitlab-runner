import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

/**
 * Layout of the Secrets Manager secret that the runner constructs expect.
 *
 * The secret must be a JSON document. `PrivateToken` is a GitLab personal,
 * group or project access token with the scopes `create_runner`,
 * `manage_runner` and `read_api`. It is used by the EC2 instances to create
 * their runner and by the Lambda functions to pause, inspect and delete
 * runners and to read pending jobs.
 */
export interface GitLabSecret {
  readonly PrivateToken: string;
}

let client: SecretsManagerClient | undefined;

function getClient(): SecretsManagerClient {
  client ??= new SecretsManagerClient({});
  return client;
}

/**
 * Reads the GitLab secret from AWS Secrets Manager and validates its layout.
 *
 * @param secretId - ARN or name of the secret
 * @throws when the secret is empty, not JSON, or has no `PrivateToken`
 */
export async function getGitLabSecret(secretId: string): Promise<GitLabSecret> {
  const response = await getClient().send(
    new GetSecretValueCommand({ SecretId: secretId }),
  );

  const raw =
    response.SecretString ??
    (response.SecretBinary
      ? Buffer.from(response.SecretBinary).toString('utf8')
      : undefined);

  if (!raw) {
    throw new Error(`Secret ${secretId} has no value`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(
      `Secret ${secretId} is not JSON. Expected {"PrivateToken": "..."}`,
    );
  }

  const token = (parsed as Partial<GitLabSecret>)?.PrivateToken;
  if (typeof token !== 'string' || token.length === 0) {
    throw new Error(`Secret ${secretId} has no "PrivateToken" field`);
  }

  return { PrivateToken: token };
}
