import { CloudWatch, SecretsManager } from 'aws-sdk';
import fetch from 'node-fetch';
import { GitLabSecret, Job } from '../../drain-runner/lambda/type';

const cw = new CloudWatch();
const sm = new SecretsManager();

const secretArn = process.env.SECRET_ARN;
const gitlabUrl = process.env.GITLAB_URL;
const metricNamespace = process.env.METRIC_NAMESPACE ?? 'GitLabRunner';
const metricName = process.env.METRIC_NAME ?? 'QueueLength';

export async function handler() {
  if (!secretArn || !gitlabUrl) {
    throw new Error('Missing environment variables');
  }

  const secret = await getSecret(secretArn);
  const response = await fetch(`${gitlabUrl}api/v4/jobs?scope=pending`, {
    headers: { 'PRIVATE-TOKEN': secret.PrivateToken },
  });
  const jobs = (await response.json()) as Job[];
  const pendingJobs = jobs.length;

  await cw
    .putMetricData({
      Namespace: metricNamespace,
      MetricData: [
        {
          MetricName: metricName,
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

async function getSecret(secretId: string): Promise<GitLabSecret> {
  const data = await sm.getSecretValue({ SecretId: secretId }).promise();
  const secretString =
    'SecretString' in data
      ? data.SecretString!
      : Buffer.from(data.SecretBinary as string, 'base64').toString('ascii');
  return JSON.parse(secretString) as GitLabSecret;
}
