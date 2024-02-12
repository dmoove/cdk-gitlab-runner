import { AutoScaling, EC2, SecretsManager } from 'aws-sdk';
import { Runners } from 'gitlab';
import { AutoScalingEvent, EditRunnerOptions, GitLabSecret, Job } from './type';

const smClient = new SecretsManager();
const ec2Client = new EC2();
const asgClient = new AutoScaling();

const secretArn = process.env.SECRET_ARN;
const gitEndpoint = process.env.GIT_ENDPOINT;

export async function handler(event: AutoScalingEvent) {
  const instanceId = event.detail.EC2InstanceId;

  if (!secretArn || !gitEndpoint) {
    throw new Error('Missing environment variables');
  }

  const runnerId = await getRunnerId(instanceId);
  const asgParams = {
    AutoScalingGroupName: event.detail.AutoScalingGroupName,
    LifecycleHookName: event.detail.LifecycleHookName,
  };
  const options: EditRunnerOptions = {
    paused: true,
  };

  getSecretValue(secretArn)
    .then((secret) => {
      const gitlabClient = new Runners({
        host: gitEndpoint,
        token: secret.PrivateToken,
      });

      gitlabClient.edit(runnerId, options).catch((error) => {
        throw new Error(error);
      });

      gitlabClient
        .jobs(runnerId)
        .then((response) => {
          const jobs = response as Job[];

          const openJobs = jobs.filter((job) => job.status === 'running');
          if (openJobs.length === 0) {
            asgClient.completeLifecycleAction({
              ...asgParams,
              LifecycleActionResult: 'CONTINUE',
            });

            return JSON.stringify({
              statusCode: 200,
              body: 'Success',
            });
          } else {
            asgClient.recordLifecycleActionHeartbeat(asgParams);

            return JSON.stringify({
              statusCode: 200,
              body: 'Heartbeat',
            });
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function getRunnerId(instanceId: string): Promise<number> {
  var params = {
    Filters: [
      {
        Name: 'resource-id',
        Values: [instanceId],
      },
    ],
  };

  const tags = await ec2Client.describeTags(params).promise();
  let runnerId = 0;
  tags.Tags!.forEach((tag) => {
    if (tag.Key === 'RunnerId') {
      runnerId = parseInt(tag.Value || '0');
    }
  });
  return runnerId;
}

async function getSecretValue(secretName: string): Promise<GitLabSecret> {
  try {
    const data = await smClient
      .getSecretValue({ SecretId: secretName })
      .promise();
    let secretString: string;
    if ('SecretString' in data) {
      secretString = data.SecretString!;
    } else {
      let buff = Buffer.from(data.SecretBinary as string, 'base64');
      secretString = buff.toString('ascii');
    }
    const secret: GitLabSecret = JSON.parse(secretString);
    return secret;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
