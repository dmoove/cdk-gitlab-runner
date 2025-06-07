import { IncomingMessage } from 'http';
import * as https from 'https';
import { URL } from 'url';
import { CloudWatch, SecretsManager } from 'aws-sdk';
import { GitLabSecret } from '../../drain-runner/lambda/type';

const smClient = new SecretsManager();
const cwClient = new CloudWatch();

const secretArn = process.env.SECRET_ARN;
const gitEndpoint = process.env.GIT_ENDPOINT;

export async function handler() {
  if (!secretArn || !gitEndpoint) {
    throw new Error('Missing environment variables');
  }

  const secret = await getSecretValue(secretArn);

  const pendingJobs = (await fetchGitLab(
    `${gitEndpoint}api/v4/jobs?scope[]=pending`,
    secret.PrivateToken,
  )) as unknown[];

  const onlineRunners = (await fetchGitLab(
    `${gitEndpoint}api/v4/runners/all?status=online`,
    secret.PrivateToken,
  )) as unknown[];

  const metricValue = pendingJobs.length / Math.max(onlineRunners.length, 1);

  await cwClient
    .putMetricData({
      Namespace: 'GitLabRunner',
      MetricData: [
        {
          MetricName: 'PendingJobsPerRunner',
          Value: metricValue,
        },
      ],
    })
    .promise();
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

function fetchGitLab(url: string, token: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const requestUrl = new URL(url);
    const options = {
      hostname: requestUrl.hostname,
      path: requestUrl.pathname + requestUrl.search,
      method: 'GET',
      headers: { 'Private-Token': token },
    };

    const req = https.request(options, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk: Buffer) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Failed to parse GitLab response'));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}
