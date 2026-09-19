# @dmoove/cdk-gitlab-runner

Deploy GitLab runners on AWS with the AWS CDK. The construct creates EC2
based runners with the Docker executor, either as a single instance or as
an AutoScaling group that drains runners gracefully before scaling in.

## Prerequisites

- Node.js 22 LTS
- AWS CDK v2, `aws-cdk-lib >= 2.169.0`
- GitLab 16.0 or newer (runners are created with runner authentication
  tokens, registration tokens are not supported)

## Installation

```bash
npm install @dmoove/cdk-gitlab-runner
```

## GitLab access token

The runners are created through the GitLab API when an instance boots.
Create a personal, group or project access token with the scopes
`create_runner`, `manage_runner` and `read_api` and store it in AWS Secrets
Manager as a JSON document:

```json
{ "PrivateToken": "glpat-..." }
```

The token is used by the instances to create their runner, by the drain
Lambda to pause and delete runners, and by the optional pending jobs metric
to read job queues.

## Example

```typescript
import { App, Stack } from 'aws-cdk-lib';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import {
  DockerExecutorType,
  GitLabRunner,
  RunnerType,
} from '@dmoove/cdk-gitlab-runner';

const app = new App();
const stack = new Stack(app, 'stack', {
  env: { account: '123456789012', region: 'eu-central-1' },
});

const token = Secret.fromSecretNameV2(stack, 'token', 'gitlab-runner-token');
const vpc = Vpc.fromLookup(stack, 'vpc', { isDefault: true });

const runner = new GitLabRunner(stack, 'GitLabRunner', {
  runnerConfig: {
    token,
    concurrent: 4,
    runnerType: RunnerType.GROUP,
    groupId: 1234,
  },
  cacheConfig: { enabled: true },
});

// A single instance for small workloads
runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
  id: 'Small',
  instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
  machineImage: MachineImage.latestAmazonLinux2023(),
  vpcConfig: { vpc },
  tags: ['small'],
});

// An AutoScaling group with graceful draining
runner.addDockerExecutor(DockerExecutorType.AUTOSCALING, {
  id: 'Large',
  instanceType: InstanceType.of(InstanceClass.M6A, InstanceSize.XLARGE),
  machineImage: MachineImage.latestAmazonLinux2023(),
  vpcConfig: { vpc },
  autoscalingConfig: { minCapacity: 0, maxCapacity: 5 },
  tags: ['large'],
  configProp: { privileged: true, image: 'docker:27' },
});
```

## How it works

- **Bootstrap.** CloudFormation Init installs Docker, the ECR credential
  helper and a pinned GitLab runner version on Amazon Linux 2023 (x86_64 or
  arm64), writes `config.toml`, creates a runner through
  `POST /api/v4/user/runners` and tags the instance with `RunnerId`.
- **Executors.** Every `addDockerExecutor()` call gets its own
  `config.toml`, so executors can differ in tags, images and instance
  types. Runner tags always include the account id, region, `docker` and
  `runner`.
- **Draining.** For AutoScaling executors a lifecycle hook holds
  terminating instances. A Step Functions state machine pauses the runner,
  waits until no job is running (checked every 5 minutes, up to
  `maxDrainDuration`, default 60 minutes), deletes the runner from GitLab
  and releases the instance.
- **Cache.** With `cacheConfig.enabled` an encrypted S3 bucket is created,
  configured as shared runner cache and granted to the instance role.
- **Pending jobs metric.** `PendingJobsMetric` publishes
  `GitLabRunner/PendingJobs` for a group or list of projects and can drive
  scaling policies on the AutoScaling group.

## Development

After cloning run `npm install` once to create `node_modules`.

Use Node.js 22 (for example with `nvm use 22`) before running commands.

Run format, lint, tests and build before committing:

```bash
npm run format
npm run lint
npm test
npm run build
```

Use `npm run lint:fix` to automatically fix lint issues.
Generate API docs with `npm run docgen` (uses Typedoc).
Create a release entry using `npx changeset` and run `npm run version` to bump versions.
Publishing is handled by GitHub Actions on merges to `main`.
