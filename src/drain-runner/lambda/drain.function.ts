import { AutoScaling, EC2, SecretsManager } from 'aws-sdk';
import { Runners } from 'gitlab';
import { AutoScalingEvent, EditRunnerOptions, GitLabSecret, Job } from './type';

const smClient = new SecretsManager();
const ec2Client = new EC2();
const asgClient = new AutoScaling();

const secretArn = process.env.SECRET_ARN;
const gitEndpoint = process.env.GIT_ENDPOINT;

/**
 * Entry point for the drain Lambda.
 *
 * The function pauses the runner associated with the EC2 instance and waits
 * until no jobs are running. It then signals the AutoScaling group to
 * continue the termination.
 */
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

  try {
    const secret = await getSecretValue(secretArn);
    const gitlabClient = new Runners({
      host: gitEndpoint,
      token: secret.PrivateToken,
    });

    await gitlabClient.edit(runnerId, options);

    const jobs = (await gitlabClient.jobs(runnerId)) as Job[];
    const openJobs = jobs.filter((job) => job.status === 'running');

    if (openJobs.length === 0) {
      await asgClient
        .completeLifecycleAction({
          ...asgParams,
          LifecycleActionResult: 'CONTINUE',
        })
        .promise();

      return {
        statusCode: 200,
        body: 'Success',
      };
    } else {
      await asgClient.recordLifecycleActionHeartbeat(asgParams).promise();

      return {
        statusCode: 200,
        body: 'Heartbeat',
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`Handler failed: ${error.message}`);
    } else {
      console.error('An unknown error occurred', error);
      throw new Error('Handler failed due to an unknown error');
    }
  }
}

/**
 * Retrieve the GitLab runner ID stored as a tag on the EC2 instance.
 */
async function getRunnerId(instanceId: string): Promise<number> {
  const params: EC2.DescribeTagsRequest = {
    Filters: [
      {
        Name: 'resource-id',
        Values: [instanceId],
      },
    ],
  };

  const tags = await ec2Client.describeTags(params).promise();
  let runnerId = 0;
  tags.Tags?.forEach((tag) => {
    if (tag.Key === 'RunnerId') {
      runnerId = parseInt(tag.Value || '0', 10);
    }
  });
  return runnerId;
}

/**
 * Fetch and parse the GitLab secret containing authentication tokens.
 */
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
    if (err instanceof Error) {
      console.error(err);
      throw new Error(`Failed to retrieve secret: ${err.message}`);
    } else {
      console.error(
        'An unknown error occurred while retrieving the secret',
        err,
      );
      throw new Error('Failed to retrieve secret due to an unknown error');
    }
  }
}
