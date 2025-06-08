import { CloudWatch, SecretsManager } from 'aws-sdk';
import { Runners } from 'gitlab';
import { GitLabSecret, Job } from '../../drain-runner/lambda/type';

interface RunnerSchema {
  id: number;
}

const cwClient = new CloudWatch();
const smClient = new SecretsManager();

const secretArn = process.env.SECRET_ARN;
const gitEndpoint = process.env.GIT_ENDPOINT;

export async function handler() {
  if (!secretArn || !gitEndpoint) {
    throw new Error('Missing environment variables');
  }

  const secret = await getSecretValue(secretArn);
  const client = new Runners({ host: gitEndpoint, token: secret.PrivateToken });

  const runners = (await client.allOwned()) as RunnerSchema[];
  let pendingJobs = 0;

  for (const runner of runners) {
    const jobs = (await client.jobs(runner.id)) as Job[];
    pendingJobs += jobs.filter((job) => job.status === 'pending').length;
  }

  await cwClient
    .putMetricData({
      Namespace: 'GitLabRunner',
      MetricData: [
        {
          MetricName: 'PendingJobs',
          Timestamp: new Date(),
          Unit: 'Count',
          Value: pendingJobs,
        },
      ],
    })
    .promise();

  return { statusCode: 200, body: 'Metric sent' };
}

async function getSecretValue(secretName: string): Promise<GitLabSecret> {
  const data = await smClient
    .getSecretValue({ SecretId: secretName })
    .promise();
  let secretString: string;
  if ('SecretString' in data) {
    secretString = data.SecretString!;
  } else {
    const buff = Buffer.from(data.SecretBinary as string, 'base64');
    secretString = buff.toString('ascii');
  }
  return JSON.parse(secretString);
}
