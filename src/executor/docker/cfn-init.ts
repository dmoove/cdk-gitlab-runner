import { join } from 'path';
import { Stack } from 'aws-cdk-lib';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import {
  CloudFormationInit,
  InitCommand,
  InitConfig,
  InitFile,
  InitPackage,
  InitService,
  Instance,
} from 'aws-cdk-lib/aws-ec2';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { GitLabConfig } from '../../config-generator/config-generator';
import {
  DEFAULT_RUNNER_VERSION,
  RunnerRegistration,
} from '../../config-generator/registration';

/**
 * Bootstrap script shipped in `assets/scripts`. The path resolves from
 * `src/` and `lib/` alike; the file is inlined into the CloudFormation Init
 * metadata, so no S3 asset is needed.
 */
export const START_RUNNER_SCRIPT = join(
  __dirname,
  '..',
  '..',
  '..',
  'assets',
  'scripts',
  'start-runner.sh',
);

/**
 * Properties for {@link GlCfnInit.createInit}.
 */
export interface GlCfnInitProps {
  /** Generated runner configuration written to `config.toml`. */
  readonly config: GitLabConfig;
  /** Runner tags added to the registration in addition to the defaults. */
  readonly tags?: string[];
  /** Secret holding the GitLab access token as `PrivateToken`. */
  readonly tokenSecret: ISecret;
  /** GitLab base URL. */
  readonly url: string;
  /** Registration request sent to `POST /api/v4/user/runners`. */
  readonly registration: RunnerRegistration;
  /**
   * GitLab runner version to install.
   *
   * @default DEFAULT_RUNNER_VERSION
   */
  readonly runnerVersion?: string;
}

/**
 * Builds the CloudFormation Init that turns an Amazon Linux 2023 instance
 * into a registered GitLab runner with the Docker executor.
 */
export class GlCfnInit {
  /**
   * Creates a CloudFormation Init to install and register a GitLab runner.
   *
   * Config sets run in this order: `base` (git, jq, AWS CLI config),
   * `docker` (Docker engine and the ECR credential helper), `gitlabrunner`
   * (pinned runner package for the instance architecture), `gitlabconfig`
   * (config.toml, registration payload and the bootstrap script) and
   * `startgitlab` (enable the service).
   *
   * @param scope - construct used to resolve account and region
   * @param props - runner configuration
   */
  public static createInit(
    scope: Construct,
    props: GlCfnInitProps,
  ): CloudFormationInit {
    const stack = Stack.of(scope);
    const runnerVersion = props.runnerVersion ?? DEFAULT_RUNNER_VERSION;

    const tags = [
      ...(props.tags ?? []),
      ...(props.registration.tag_list ?? []),
      stack.account,
      stack.region,
      'docker',
      'runner',
    ]
      .map((tag) => tag.trim())
      .filter(
        (tag, index, all) => tag.length > 0 && all.indexOf(tag) === index,
      );

    const registration: RunnerRegistration = {
      ...props.registration,
      tag_list: tags,
    };

    return CloudFormationInit.fromConfigSets({
      configSets: {
        default: [
          'base',
          'docker',
          'gitlabrunner',
          'gitlabconfig',
          'startgitlab',
        ],
      },
      configs: {
        // Tools used by the bootstrap script and a default AWS region for
        // the CLI calls it makes.
        base: new InitConfig([
          InitCommand.shellCommand('command -v git || dnf install -y git'),
          InitCommand.shellCommand('command -v jq || dnf install -y jq'),
          GlCfnInit.setupAwsConfig(scope),
        ]),

        // Docker engine for the executor plus the ECR credential helper
        // referenced by DOCKER_AUTH_CONFIG in config.toml.
        docker: new InitConfig([
          InitPackage.yum('docker'),
          InitPackage.yum('amazon-ecr-credential-helper'),
          InitCommand.shellCommand('systemctl enable --now docker'),
          InitCommand.shellCommand(
            'id -u gitlab-runner || useradd -m gitlab-runner',
          ),
          InitCommand.shellCommand('usermod -a -G docker gitlab-runner'),
        ]),

        // Pinned runner package, resolved for the instance architecture.
        gitlabrunner: new InitConfig([
          InitCommand.shellCommand(
            [
              'ARCH=$(uname -m)',
              'case "$ARCH" in x86_64) ARCH=amd64;; aarch64) ARCH=arm64;; esac',
              `curl -sSfL "https://gitlab-runner-downloads.s3.amazonaws.com/v${runnerVersion}/rpm/gitlab-runner_$ARCH.rpm" --output /tmp/gitlab-runner.rpm`,
              'rpm -q gitlab-runner || rpm -i /tmp/gitlab-runner.rpm',
            ].join(' && '),
          ),
        ]),

        // Runner configuration and registration.
        gitlabconfig: new InitConfig([
          InitFile.fromString(
            '/etc/gitlab-runner/config.toml',
            props.config.generateToml(),
            { mode: '000600' },
          ),
          InitFile.fromString(
            '/etc/gitlab-runner/registration.json',
            JSON.stringify(registration),
            { mode: '000600' },
          ),
          InitFile.fromFileInline(
            '/etc/gitlab-runner/start.sh',
            START_RUNNER_SCRIPT,
            { mode: '000755' },
          ),
          InitCommand.shellCommand(
            `/etc/gitlab-runner/start.sh "${props.tokenSecret.secretArn}" "${props.url}"`,
          ),
        ]),

        // Start the runner with the registered configuration.
        startgitlab: new InitConfig([
          InitCommand.shellCommand('systemctl restart gitlab-runner'),
          InitService.enable('gitlab-runner', {
            enabled: true,
            ensureRunning: true,
          }),
        ]),
      },
    });
  }

  /**
   * Installs the CloudFormation helper scripts so cfn-init and cfn-signal
   * are available on Amazon Linux 2023.
   *
   * @param target - instance or autoscaling group whose user data is extended
   */
  public static addAwsCfnBootstrap(target: Instance | AutoScalingGroup) {
    target.addUserData('dnf install -y aws-cfn-bootstrap');
  }

  private static setupAwsConfig(scope: Construct): InitFile {
    return InitFile.fromString(
      '/root/.aws/config',
      `[default]\nregion = ${Stack.of(scope).region}\n`,
    );
  }
}
