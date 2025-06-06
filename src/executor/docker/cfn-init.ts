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

export interface GlCfnInitProps {
  readonly config: GitLabConfig;
  readonly tags?: string[];
  readonly tokenSecret: ISecret;
  readonly url: string;
}

export class GlCfnInit extends Construct {
  /**
   * Creates a CloudFormation Init to register a gitlab runner
   *
   * @param that
   * @param props
   * @returns a cloudformation init
   */
  public static createInit(
    that: Construct,
    props: GlCfnInitProps,
  ): CloudFormationInit {
    const tags = [
      ...(props.tags?.filter((tag) => tag.trim().length > 0) ?? []), // delete empty tags
      Stack.of(that).account,
      Stack.of(that).region,
      'docker',
      'runner',
    ].join(',');

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
        /**
         * We need different packages:
         *    git jq
         * Then we configure awslogs, so that important logs are getting forwarded
         */
        base: new InitConfig([
          InitCommand.shellCommand('command -v git || yum install -y git'),
          InitCommand.shellCommand('command -v jq || yum install -y jq'),
          GlCfnInit.setupAwsConfig(that),
        ]),

        /**
         * Docker installation for the gitlab runner to be able to run containers
         */
        docker: new InitConfig([
          InitPackage.yum('docker'),
          InitCommand.shellCommand('sudo service docker start'),
          InitCommand.shellCommand('sudo useradd -m gitlab-runner || true'),
          InitCommand.shellCommand('sudo usermod -a -G docker gitlab-runner'),
        ]),

        /**
         * Installation of gitlab runner
         */
        gitlabrunner: new InitConfig([
          InitCommand.shellCommand(
            'curl https://gitlab-runner-downloads.s3.amazonaws.com/latest/rpm/gitlab-runner_amd64.rpm --output gitlab-runner_amd64.rpm',
          ),
          InitCommand.shellCommand('sudo rpm -i gitlab-runner_amd64.rpm'),
        ]),

        /**
         * Create configuration for the runner
         */
        gitlabconfig: new InitConfig([
          InitFile.fromString(
            '/etc/gitlab-runner/config.toml',
            props.config.generateToml(),
          ),
          InitFile.fromAsset(
            '/etc/gitlab-runner/start.sh',
            join(__dirname, '../../', 'scripts/', 'start-runner.sh'),
            {
              mode: '0777',
            },
          ),
          InitCommand.shellCommand(
            `
              export SECRET="${props.tokenSecret.secretArn}" && \
              export GITLAB_URL="${props.url}" && \
              echo $SECRET && \
              echo $GITLAB_URL && \
              ./etc/gitlab-runner/start.sh "${props.tokenSecret.secretArn}" "${props.url}" "${tags}"`,
            {
              testCmd: 'gitlab-runner status',
            },
          ),
        ]),

        /**
         * Register and start the runner
         * Tags are not supported out of the config, and we also need to different values doubled during registration, as it doesn't really support toml configuration
         */
        startgitlab: new InitConfig([
          InitService.enable('gitlab-runner', {
            enabled: true,
            ensureRunning: true,
          }),
        ]),
      },
    });
  }

  /**
   * Adds the aws-cfn-bootstrap package to the user data of the instance.
   * @param target
   */
  public static addAwsCfnBootstrap(target: Instance | AutoScalingGroup) {
    target.addUserData('yum install -y aws-cfn-bootstrap');
  }

  private static setupAwsConfig(scope: Construct): InitFile {
    return InitFile.fromString(
      '/root/.aws/config',
      `[default]
  region = ${Stack.of(scope).region}`,
    );
  }
}
