# @yanu23/cdk-gitlab-runner

A construct to build gitlab runners running in AWS.

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

## Autoscaling on pending jobs
Provide `pendingJobsTarget` in `autoscalingConfig` to automatically scale runners based on the ratio of pending jobs per running instance.
