import { SecretsManager, CloudWatch } from 'aws-sdk';
import { Runners } from 'gitlab';

const sm = new SecretsManager();
const cw = new CloudWatch();

const secretArn = process.env.SECRET_ARN;
const gitEndpoint = process.env.GIT_ENDPOINT;
const namespace = process.env.NAMESPACE ?? 'GitLabRunner';

export async function handler() {
  if (!secretArn || !gitEndpoint) {
    throw new Error('Missing environment variables');
  }

  const secret = await sm.getSecretValue({ SecretId: secretArn }).promise();
  let secretString: string;
  if ('SecretString' in secret && secret.SecretString) {
    secretString = secret.SecretString;
  } else {
    const buff = Buffer.from(secret.SecretBinary as string, 'base64');
    secretString = buff.toString('ascii');
  }
  const { PrivateToken } = JSON.parse(secretString);

  const runnersApi = new Runners({ host: gitEndpoint, token: PrivateToken });
  const runners = (await runnersApi.allOwned()) as any[];
  let pendingJobs = 0;

  for (const runner of runners) {
    const jobs = (await runnersApi.jobs(runner.id)) as any[];
    pendingJobs += jobs.filter((j) => j.status === 'pending').length;
  }

  await cw
    .putMetricData({
      Namespace: namespace,
      MetricData: [
        {
          MetricName: 'PendingJobs',
          Unit: 'Count',
          Value: pendingJobs,
        },
      ],
    })
    .promise();

  return {
    statusCode: 200,
    body: 'OK',
  };
}
