---
'@dmoove/cdk-gitlab-runner': minor
---

Migrate off removed APIs and fix the public API. This release contains
breaking changes:

- **Secret format.** The secret must be `{"PrivateToken": "<token>"}` with
  the scopes `create_runner`, `manage_runner` and `read_api`. The
  registration token field `Token` is no longer used; GitLab 18 removed
  registration tokens. Runners are created per instance through
  `POST /api/v4/user/runners`.
- **Peer dependency.** `aws-cdk-lib >= 2.169.0` (Node.js 22 Lambda runtime).
- **`GitLabRunner`.** `glConfig` was removed; every executor gets its own
  configuration. `encryptionKey` is an `IKey`. `cacheConfig.enabled: false`
  no longer creates a bucket. `addDockerExecutor()` returns the executor and
  accepts `id`, `volumeSize` and `maxDrainDuration`; call it several times
  with distinct ids for multiple executors.
- **`DockerExecutorConfigProps`** was replaced by `DockerRunnerConfig`
  (`image`, `privileged`, `volumes`, `disableCache`, `env`). `image` is now
  applied; the default image is `ubuntu:24.04`. `disableIpv4` was removed.
  The default volumes no longer mount `/home/gitlab-runner/.aws/credentials`.
- **`VpcConfig`** on `DockerExecutorAttributes` is the executor's own type
  (`vpc`, `vpcSubnets`); the previous type came from
  `aws-stepfunctions-tasks` and its `subnets` were ignored.
- **AutoScaling.** Instances launch from a launch template instead of a
  launch configuration and require IMDSv2. `desiredCapacity` is no longer
  applied. The drain state machine deletes the runner from GitLab and gives
  up after `maxDrainDuration` (default 60 minutes).
- **`PendingJobsMetric`** requires `projectIds` or `groupId` and publishes
  the metric with an `Executor` dimension.

Fixes: the npm package now ships the bootstrap script and the Lambda
bundles; Lambdas run on Node.js 22 with AWS SDK v3; the pending jobs
handler name and its `cloudwatch:PutMetricData` permission are correct; the
cache bucket and key are granted to the instance role; `volumeSize` is
applied to autoscaling executors.
