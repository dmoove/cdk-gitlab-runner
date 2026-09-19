# Repository review and roadmap

Review date: 2026-09-19. Base commit: `7240c84` (`main`).

This document collects the result of a full read of the code base, the
tests, the CI configuration and the open issues. It lists what is broken,
what was planned but never finished, what is missing for a production-ready
construct library, and where code quality and documentation fall short.
Items are ordered by priority inside each section. File references point at
the code on the base commit.

Verification done for this review:

- `npm ci`, `npm run compile`, `npm run lint` and `npm test` on Node 22.
  Result: 5 suites and 20 tests pass, lint is clean, line coverage 97.6 %,
  branch coverage 64.7 %. All findings below are static; nothing was deployed.
- `npm pack --dry-run` to inspect the published package contents.
- `npm view @dmoove/cdk-gitlab-runner` (only `0.0.0`, published 2025-06-08).
- Open GitHub issues (one: #19) and open pull requests (six Dependabot PRs).

## 1. Blockers: the library cannot be used as published

These issues make the package unusable for a consumer today. They should be
fixed before any new feature work.

### 1.1 Runtime assets are missing from the npm package

- `src/executor/docker/cfn-init.ts:97` loads `start-runner.sh` from
  `<lib>/scripts/start-runner.sh`. `tsc` only emits `.ts` files, so
  `lib/scripts/` does not exist after `npm run compile`, and `.npmignore`
  excludes `/src/`. Confirmed with `npm pack --dry-run`: no `.sh` file is in
  the tarball. Every `addDockerExecutor()` call in a consumer project fails
  at synth time with a missing asset.
- `src/drain-runner/assets.ts` and `src/pending-metric/assets.ts` point at
  `<package>/lambda`. `.npmignore` excludes `/lambda`, so the Lambda bundles
  are missing as well.

Suggested fix: bundle the Lambdas with `NodejsFunction` (esbuild is already
a dev dependency) so no pre-compile step is needed, embed the shell script
via `InitFile.fromString` or copy it into `lib/` during `compile`, and
replace `.npmignore` with an explicit `files` list in `package.json`.

### 1.2 Lambda runtime is Node.js 16 with AWS SDK v2

`src/drain-runner/drain-function.ts:35` and
`src/pending-metric/pending-jobs-metric.ts:25` use `Runtime.NODEJS_16_X`.
AWS blocks creation of new Node 16 functions, so `cdk deploy` of the
autoscaling executor fails. The bundles are built with
`--external:aws-sdk`, which only works on runtimes that ship SDK v2 (Node 16
and older). AWS SDK for JavaScript v2 reached end of support in September 2025.

Suggested fix: migrate both handlers to `@aws-sdk/client-*` v3, move to
`Runtime.NODEJS_22_X`, and drop `aws-sdk` from `dependencies` and
`bundledDependencies`.

### 1.3 Runner registration uses deprecated registration tokens

`src/scripts/start-runner.sh:30` registers the runner with
`POST /api/v4/runners` and a registration token stored under `.Token` in the
secret. GitLab deprecated registration tokens in 15.6, disabled them by
default in 17.0 and removed them with 18.0. Against a current GitLab.com or
self-managed instance the registration fails and the instance never signals
CloudFormation, so the stack rolls back after the 10 minute signal timeout.

Suggested fix: support the runner authentication token flow (`glrt-...`).
Either accept a pre-created runner token and write it straight into
`config.toml`, or create the runner at boot through `POST /user/runners`
with a personal or group access token that has the `create_runner` scope.
The second variant keeps the per-instance runner id that the drain Lambda
relies on. The `RunnerId` tag and the `EditRunnerOptions` type stay valid.

### 1.4 Pending jobs metric never works

`src/pending-metric/pending-jobs-metric.ts` was added in PR #77 as the base
for issue #19 but is not usable:

- The handler is configured as `pending-jobs.function.handler`, but esbuild
  writes the bundle to `lambda/pending-jobs.js`. Lambda cannot find the
  module.
- The function role has no `cloudwatch:PutMetricData` permission.
- `GET /runners/:id/jobs` only returns jobs that were already assigned to
  the runner. Pending jobs have no runner yet, so the counter is always 0.
  Pending jobs must be read per project or group
  (`/projects/:id/jobs?scope=pending`, or the runner `jobs` endpoint of the
  runner manager) or from the GitLab Prometheus metrics of the instance.
- The construct is exported but not wired into `DockerExecutorAutoscaling`,
  and no scaling policy uses the metric.

## 2. Functional bugs

### 2.1 Docker image option is silently ignored

`GitLabRunner.addDockerExecutor()` passes `DockerExecutorConfigProps`
(`image`, `privileged`, `volumes`, `disableIpv4`) into
`GitLabConfig.addDockerExecutor()`, which expects `ConfigDockerExecutor`
(`gitlabImage`, `privileged`, `volumes`, `disableCache`, `env`). TypeScript
accepts it because all properties are optional. Result: `image` is never
used and the runner always defaults to `ubuntu:20.04`, while the JSDoc
promises `ubuntu:latest`. `disableIpv4` is not used anywhere, and `env`
cannot be set through the public API at all. Use one interface for both
layers.

### 2.2 Wrong `VpcConfig` type on the public API

`src/gitlab-runner/gitlab-runner.ts:5` imports `VpcConfig` from
`aws-cdk-lib/aws-stepfunctions-tasks`. That is the SageMaker VPC config
(`vpc`, `subnets`). The executor reads `vpcSubnets` from the local
`VpcConfig` in `docker-executor.ts:59`. A consumer who sets `subnets`
gets no error and the instances land in the default subnet selection.
Import the local `VpcConfig` and re-export it.

### 2.3 `GitLabRunner` cannot hold more than one executor

- `applyConfigurationChanges()` (`gitlab-runner.ts:263`) replays every
  queued action on each call. The second `addDockerExecutor()` call creates
  `GitLabCacheBucket` a second time and throws on the duplicate construct
  id.
- The `DockerExecutor` child always uses the id `DockerExecutor`, so two
  executors collide as well.
- The queued-action mechanism is not needed. Create the cache bucket in the
  constructor and let `addDockerExecutor()` take an optional id.

### 2.4 `cacheConfig.enabled` is ignored

`gitlab-runner.ts:201` checks `if (props.cacheConfig)` only. Passing
`{ enabled: false }` still creates the bucket and enables the cache.

### 2.5 Cache bucket is never granted to the runner role

`GitLabConfig.addCache()` writes the bucket into `config.toml`, but nothing
calls `bucket.grantReadWrite(role)` or `encryptionKey.grantEncryptDecrypt`
for the executor role. With a KMS encrypted bucket every cache upload fails
with `AccessDenied`. The test named `grant read and write permissions` in
`test/cache-bucket.test.ts` only tests the CDK `Bucket` base class.

### 2.6 `volumeSize` is ignored for autoscaling executors

`src/executor/docker/autoscaling.ts:72` calls `getAsg2BlockDevices()`
without the configured size. The single instance executor honours it. The
option is also not reachable from `DockerExecutorAttributes`.

### 2.7 Drain state machine

- IAM statements are added twice: in `DrainFunction` (`drain-function.ts:45`)
  and again in `DrainStateMachine.attachPolicies()`.
- `gitlabClient.jobs(runnerId)` fetches the first page (20 jobs) without a
  `status=running` filter. On a busy runner a running job can be outside
  the first page, and the instance is terminated while the job runs.
- There is no upper bound on the heartbeat loop. The hook is created with a
  30 minute timeout, but each heartbeat resets it, so a stuck job keeps the
  instance in `Terminating:Wait` for up to the 48 hour AutoScaling limit.
  Add a maximum wait and a `Fail`/`ABANDON` path.
- The runner is paused but never deleted (`DELETE /runners/:id`). Every
  scale-in leaves a dead runner in the GitLab UI.
- A missing `RunnerId` tag falls back to runner id `0`, which then edits a
  non-existent runner instead of failing with a clear message.
- The Step Functions log level is `ERROR`, which hides the heartbeat loop
  during debugging. `ALL` with a short retention is more useful.

### 2.8 CloudFormation init and bootstrap script

- `InitCommand` for registration uses `testCmd: 'gitlab-runner status'`.
  cfn-init only runs the command if the test exits 0, so the registration
  depends on the rpm post-install having started the service. The intent
  (skip if already registered) is inverted.
- The script path is relative: `./etc/gitlab-runner/start.sh`.
- `echo $SECRET` and `echo $GITLAB_URL` write the secret ARN to the
  cfn-init log for no reason.
- The rpm is downloaded from `latest` and is `amd64` only. Deployments are
  not reproducible and Graviton instance types cannot be used.
- `DOCKER_AUTH_CONFIG` sets `credsStore: ecr-login`, but the
  `amazon-ecr-credential-helper` package is never installed, and the
  default volume mounts `/home/gitlab-runner/.aws/credentials`, which is
  never created.
- `sudo service docker start` should be `systemctl enable --now docker` on
  Amazon Linux 2023.
- The single instance executor does not set `requireImdsv2`, unlike the
  autoscaling group.

### 2.9 AutoScaling group details

- `desiredCapacity` is passed to the ASG. CDK warns about it because every
  deploy resets the capacity, which fights any scaling policy added later.
  Omit `desiredCapacity` once scaling policies exist.
- The tests assert on `AWS::AutoScaling::LaunchConfiguration`. AWS no longer
  allows new launch configurations in new accounts. Create an explicit
  `LaunchTemplate` (which also allows spot, mixed instances and IMDSv2).
- `DockerExecutorAutoscaling.validateAutoScalingConfig()` runs after
  `super()` and duplicates `DockerExecutor.validateAutoScalingConfig()`.

## 3. Planned but unfinished work

### 3.1 Issue #19: scale the runner pool on workload

The only open issue. PR #77 delivered the metric Lambda (see 1.4), nothing
else. What is missing for a complete implementation:

1. A working pending jobs metric (see 1.4), ideally with a dimension for the
   runner tags of this executor so several executors can scale
   independently.
2. A step scaling or target tracking policy on the ASG, with a scale-in
   cooldown longer than the average job duration.
3. Scale-to-zero support (`minCapacity: 0`) and a warm pool or fast AMI so
   the first job does not wait ten minutes for cfn-init.
4. Removal of `desiredCapacity` from the ASG definition.
5. A test for the scaling policy and an integration test with
   `@aws-cdk/integ-tests-alpha`.

Alternative worth evaluating before building this: GitLab's own
`docker-autoscaler` executor with the `fleeting-plugin-aws`. One small
runner manager instance drives an ASG through the AWS API, scales on
GitLab's own job queue and handles draining itself. That would replace the
drain state machine, the metric Lambda and issue #19 with configuration in
`config.toml`, and is the direction GitLab maintains.

### 3.2 Kubernetes executor

`GitlabExecutor.KUBERNETES` exists in `src/config-generator/enums.ts` but
nothing implements it. Either remove the enum value or add an EKS based
executor.

## 4. Suggested features

Ordered by expected value for users of the library.

- **Runner authentication token flow** (see 1.3). Mandatory for any current
  GitLab version.
- **Security groups and IAM role passthrough.** No way to pass a
  `SecurityGroup`, an existing instance `Role`, or additional managed
  policies. Jobs that need AWS access currently inherit only the secret and
  tagging permissions. Add `securityGroup`, `role` and `additionalPolicies`
  props, and attach `AmazonSSMManagedInstanceCore` by default so operators
  can reach instances through Session Manager.
- **Spot and Graviton support.** A `LaunchTemplate` with a mixed instances
  policy and an architecture aware download of the runner package.
- **Runner settings.** `runUntagged`, `locked`, `accessLevel`,
  `maximumTimeout`, `description`, `checkInterval`, `logLevel`,
  `pullPolicy`, `allowedImages`, `shmSize`, `listenAddress` for Prometheus
  metrics, and an escape hatch for raw `config.toml` overrides.
- **Multiple executors per runner** with different tags, instance types and
  concurrency, once 2.3 is fixed.
- **Runner cleanup.** Unregister the runner during drain, and a custom
  resource that unregisters all runners of the stack on `cdk destroy`.
- **Docker host hygiene.** Separate data volume for `/var/lib/docker`, log
  rotation in `daemon.json`, a periodic `docker system prune`, and
  installation of the ECR credential helper so the existing
  `DOCKER_AUTH_CONFIG` works.
- **Observability.** CloudWatch agent for `/var/log/gitlab-runner` and
  cfn-init logs, alarms on `PendingJobs` and on failed drains, and a metric
  for running jobs.
- **AMI updates.** Resolve the AMI from the SSM parameter and use
  `updatePolicy` with instance refresh so security patches are applied
  automatically.
- **Pinned runner version** as a prop, with a documented default.

## 5. Tests

Current coverage exercises the happy path of each construct in isolation.
Gaps that would have caught the bugs above:

- No test goes through `GitLabRunner.addDockerExecutor()` with
  `DockerExecutorType.AUTOSCALING`, so the drain state machine and the
  lifecycle hook are never tested through the public API.
- No test checks the generated `config.toml` after `GitLabRunner` applies
  `configProp` (would catch 2.1).
- No test for `DrainStateMachine`, `PendingJobsMetric` or the CloudFormation
  init content (`start.sh` path, config file, tags).
- No unit tests for the Lambda handlers. Both can be tested with mocked SDK
  clients (`aws-sdk-client-mock` after the v3 migration).
- No test for calling `addDockerExecutor()` twice, for
  `cacheConfig.enabled: false`, or for cache permissions on the role.
- `test/docker-executor.test.ts` passes `autoscalingConfig` to the single
  instance executor; the tests should mirror real usage.
- No snapshot tests and no integration test.

## 6. Code quality

- `src/drain-runner/lambda/drain.function.ts` and
  `src/pending-metric/lambda/pending-jobs.function.ts` duplicate
  `getSecretValue()` and the client setup. Extract a shared module under
  `src/lambda-common/`.
- `GlConfig.runners[0]` is assumed everywhere in `GitLabConfig`. Model the
  runners as a list with an `addRunner()` API so multiple executors are
  possible.
- `Volume` in `config-generator.ts` is a union that ends in `| string`, which
  collapses to `string` and provides no autocomplete. Either export the
  known constants or drop the type.
- `GitLabRunnerProps.encryptionKey` and `IGitLabRunner.encryptionKey` are
  typed as `Key`. Use `IKey` so imported keys work.
- `tags` on `DockerExecutorAttributes` and `ExecutorProps` are GitLab runner
  tags, but the JSDoc on `ExecutorProps.tags` says "tags applied to created
  resources". Rename to `runnerTags` and fix the comment.
- `GitLabConfig.addDockerExecutor()` overwrites `runner.executor` with the
  same value on every call and appends `DOCKER_AUTH_CONFIG` each time.
- The `gitlab` npm package (14.2.2) is deprecated in favour of
  `@gitbeaker/rest`. `aws-sdk` v2 is end of life. Both are listed under
  `dependencies` and `bundledDependencies` of the construct library even
  though only the Lambda code needs them. After the `NodejsFunction`
  migration they become dev dependencies.
- `tsconfig.json` targets ES2019 with `lib: es2019` although the engine is
  Node 22. `experimentalDecorators` is unused. Move to ES2022.
- ESLint 8 and `@typescript-eslint` 6 are end of life and the config does
  not extend `@typescript-eslint/recommended`, so unused code, unsafe `any`
  and missing `await` slip through. Migrate to ESLint 9 flat config with
  `typescript-eslint` 8.
- `package.json` declares `"stability": "stable"` at version `0.0.0`.
- `.gitattributes` still marks every config file as `linguist-generated`
  from the projen era; projen was removed in PR #76.
- `test-reports/` is written by jest-junit but the CI never uploads it.

## 7. Documentation and comments

- `README.md` uses the scope `@yanu23/…` in the title and the import while
  the package is `@dmoove/cdk-gitlab-runner`.
- The README example does not compile: `addDockerExecutor()` takes
  `vpcConfig: { vpc }`, not `vpc`.
- The required secret format is undocumented. The bootstrap script expects
  `{ "Token": "<registration token>", "PrivateToken": "<PAT>" }`, and the
  drain and metric Lambdas need the PAT. Document the JSON layout, the
  required token scopes and how to create the secret.
- No documentation of the autoscaling executor, the drain process, the
  lifecycle hook timeouts, the cache bucket naming (`{account}-{region}-
gitlab-cache` must be globally unique) or of the IAM permissions granted
  to the instance. An architecture section with a diagram would help.
- `API.md` is a stale copy of the README that links to `docs/modules.md`,
  which is gitignored. Either commit the generated API docs or link to the
  GitHub Pages site that `.github/workflows/docs.yml` publishes.
- `IGitLabRunner.addDockerExecutor()` JSDoc example passes `image`,
  `privileged` and `volumes` directly, which is not the signature.
- `ConfigDockerExecutor.gitlabImage` documents the default `ubuntu:20.04`,
  `DockerExecutorConfigProps.image` documents `ubuntu:latest`.
- JSDoc uses `@type {string}` annotations, which are redundant in
  TypeScript, and has typos (`Wheter`, `authentification`).
- Undocumented public members: `DockerExecutorAutoscalingProps`,
  `DockerExecutorInstanceProps`, `VpcConfig`, `AutoScalingConfig`,
  `IDockerExecutor`, `PendingJobsMetricProps`, `PendingJobsMetric`,
  `GlCfnInitProps`, `GitLabSecret`, `BaseDockerExecutorProps.gitlabUrl`,
  `DockerExecutor` (class), `GitLabCacheBucketProps.encryptionKey` (says
  "bucket encryption?").
- `start-runner.sh` has no header comment describing its arguments, the
  expected secret layout, or that it must run as root.
- No `CHANGELOG.md` (changesets would generate one, but no changeset has
  ever been added), no `CONTRIBUTING.md` (AGENTS.md partly covers it), no
  `SECURITY.md`, no `CODEOWNERS`.

## 8. CI, release and dependency hygiene

- Six Dependabot PRs have been open since June 2025, among them #91
  (`form-data` security fix). The `auto-approve` workflow does not merge
  them. Check the label, the `hmarr/auto-approve-action` version (2.2.1 is
  from 2022) and the Mergify status name.
- `build.yml` runs only on `pull_request`, never on `push` to `main`, so a
  broken `main` is not visible. Add a `push` trigger and a Node version
  matrix (22, 24).
- `release.yml` publishes whatever `main` contains, but no changeset exists,
  so the version stays at `0.0.0` and nothing has been released since the
  first publish. Add a changeset check to the PR workflow.
- `docs.yml` uses `actions/deploy-pages@v2`; v4 is current.
- `aws-cdk-lib` is pinned to `2.126.0` in dev dependencies while the peer
  range is `^2.126.0`. Test against a recent version as well to catch
  deprecations (`LaunchConfiguration`, `Runtime.NODEJS_16_X`).
- The `test` script runs `--updateSnapshot` in CI, which would silently
  accept snapshot changes if snapshot tests are added.

## 9. Proposed order of work

1. Fix packaging (1.1), Lambda runtime and SDK (1.2), metric handler (1.4).
   Add a changeset and release a `0.1.0` that can actually be installed.
2. Fix the public API bugs (2.1 to 2.6) with tests through `GitLabRunner`.
3. Implement the runner authentication token flow (1.3) and runner cleanup
   on drain (2.7).
4. Decide between finishing issue #19 in this library or moving to
   `docker-autoscaler` with `fleeting-plugin-aws`.
5. Security group, role passthrough, SSM access, spot and Graviton.
6. Documentation rewrite: README with secret format, architecture, all
   executor types; committed or linked API docs.
7. Tooling: ESLint 9, ES2022 target, dependency updates, CI on `main`.
