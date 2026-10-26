# @dmoove/cdk-gitlab-runner

Deploy GitLab runners on AWS with the AWS CDK. The construct supports two
ways of running jobs in Docker, so `image:` and `services:` of a job work in
both:

- **Docker Autoscaler executor** (recommended for most setups). A small
  runner manager runs as an ECS Fargate service and starts EC2 instances
  for the jobs through GitLab's fleeting plugin for AWS. The instances
  scale to zero when nothing is running. No EKS cluster is needed.
- **Docker executor** on EC2, either as a single instance or as an
  AutoScaling group that drains runners gracefully before scaling in.

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

## Docker Autoscaler executor on ECS Fargate

```typescript
import { Duration } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';

runner.addDockerAutoscalerExecutor({
  id: 'Autoscaler',
  vpcConfig: { vpc },
  instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.LARGE),
  maxInstances: 5,
  tags: ['autoscaler'],
  configProp: { image: 'alpine:3', privileged: true },
  // Optional: one warm instance during office hours, none at night.
  idlePolicies: [
    {
      idleCount: 1,
      idleTime: Duration.minutes(30),
      periods: ['* 7-19 * * mon-fri'],
      timezone: 'Europe/Zurich',
    },
  ],
});
```

```text
GitLab ◄── job polling ── runner manager (ECS Fargate, 0.25 vCPU / 0.5 GB, 1 task)
                              │  fleeting plugin (AWS API)     │ SSH (EC2 Instance Connect)
                              ▼                                ▼
                 AutoScaling group (0..maxInstances) ── EC2 instances with Docker
                                                         └─ job container + services
```

- **Why not Fargate for the jobs?** Fargate has no Docker daemon and no
  privileged containers. GitLab's Fargate driver runs every job in one
  fixed task definition and ignores `image:` and `services:`. Here only
  the runner manager runs on Fargate; the jobs run with the regular Docker
  executor on EC2, so every Docker executor feature works, including
  `services:` and Docker-in-Docker with `privileged: true`.
- **Runner manager.** One Fargate task runs the official
  `gitlab/gitlab-runner:alpine-v<runnerVersion>` image. At start it writes
  `config.toml`, installs the plugin with `gitlab-runner fleeting install`
  (default `aws:1`) and runs the runner. Deployments stop the old task
  before the new one starts, so only one manager drives the AutoScaling
  group at a time. ECS's SIGTERM is rewritten to SIGQUIT, so running jobs
  get up to 120 seconds to finish.
- **Runner registration.** A custom resource creates one runner through
  `POST /api/v4/user/runners` and stores its token in a dedicated secret
  that is injected into the task. Changing the registration creates a new
  runner and deletes the old one; `cdk destroy` deletes the runner from
  GitLab.
- **Job instances.** The AutoScaling group is owned by the runner: minimum
  and desired capacity 0, no scaling policies, scale-in protection and a
  suspended `AZRebalance` process, as the plugin requires. Docker is
  installed through the user data on Amazon Linux 2023 (arm64 or x86_64,
  matching `instanceType`). The manager connects over SSH with keys pushed
  through EC2 Instance Connect; the instance security group only allows SSH
  from the manager. By default every job gets a fresh instance
  (`capacityPerInstance: 1`, `maxUseCount: 1`). Instances need IMDSv2 and
  job containers cannot read the instance credentials.
- **Spot.** `spot: true` and `additionalInstanceTypes` launch the instances
  as spot instances with the price-capacity-optimized strategy. A spot
  interruption fails the jobs on that instance.
- **Network.** The manager and the instances need outbound internet access
  to reach GitLab, Docker Hub and `registry.gitlab.com` (plugin download).
  Use private subnets with a NAT gateway, or public subnets with
  `assignPublicIp: true` for the manager (instances get a public IP from
  the subnet setting). The registration Lambda calls the GitLab API from
  outside the VPC, so GitLab must be reachable from the internet.
- **Costs.** The always-on part is the Fargate task (roughly 8 to 10 USD
  per month on arm64 in `eu-central-1`) and its CloudWatch logs. EC2
  instances only run while jobs run, plus the idle time of
  `idlePolicies`. A job waits for an instance to boot (typically one to
  two minutes) unless an idle instance is available; an AMI with Docker
  preinstalled (`machineImage`) shortens that.

## How it works (Docker executor)

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
