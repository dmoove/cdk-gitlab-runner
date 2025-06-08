@dmoove/cdk-gitlab-runner / [Exports](modules.md)

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
