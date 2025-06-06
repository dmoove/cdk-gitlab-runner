# @yanu23/cdk-gitlab-runner

Deploy GitLab runners on AWS with AWS CDK.

## Prerequisites

- Node.js 22 LTS
- AWS CDK v2

## Installation

```bash
npm install @dmoove/cdk-gitlab-runner
```

## Example

```typescript
import { App, Stack } from 'aws-cdk-lib';
import { GitLabRunner, DockerExecutorType } from '@yanu23/cdk-gitlab-runner';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';

const app = new App();
const stack = new Stack(app, 'stack');

const token = Secret.fromSecretNameV2(stack, 'token', 'gitlab-runner-token');
const vpc = Vpc.fromLookup(stack, 'vpc', { isDefault: true });

const runner = new GitLabRunner(stack, 'GitLabRunner', {
  runnerConfig: {
    token,
    concurrent: 4,
  },
});
runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
  instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
  machineImage: MachineImage.latestAmazonLinux2023(),
  vpc,
});
```

## Development

Use [projen](https://github.com/projen/projen) to manage this repository.
After cloning run `npm install` once to create `node_modules`.
When you change `.projenrc.ts` run:

```bash
npx projen
```

Use Node.js 22 (for example with `nvm use 22`) before running commands.

Run lint, tests and build before committing:

```bash
npm run eslint
npm test
npm run build
```
