import { Duration, Stack } from 'aws-cdk-lib';
import {
  AutoScalingGroup,
  BlockDevice as asg_BlockDevice,
} from 'aws-cdk-lib/aws-autoscaling';
import {
  BlockDevice as ec2_BlockDevice,
  IMachineImage,
  IVpc,
  Instance,
  InstanceType,
  SubnetSelection,
} from 'aws-cdk-lib/aws-ec2';
import { IRole, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { GitLabCacheBucket } from '../../cache/cache-bucket';
import {
  RunnerRegistration,
  RunnerType,
  validateRunnerRegistration,
} from '../../config-generator/registration';
import { ExecutorProps } from '../executor';
import { DockerExecutorAutoscaling } from './autoscaling';
import { GlCfnInit } from './cfn-init';
import { DockerExecutorType } from './enums';
import { DockerExecutorInstance } from './single-instance';

/** Default size of the root volume in GiB. */
export const DEFAULT_VOLUME_SIZE = 80;

/**
 * Network placement of the executor instances.
 */
export interface VpcConfig {
  /** VPC the instances are launched in. */
  readonly vpc: IVpc;
  /**
   * Subnets to use.
   *
   * @default - private subnets of the VPC
   */
  readonly vpcSubnets?: SubnetSelection;
}

/**
 * Capacity of the autoscaling executor.
 */
export interface AutoScalingConfig {
  /** Lowest number of instances. */
  readonly minCapacity: number;
  /** Highest number of instances. */
  readonly maxCapacity: number;
  /**
   * Initial number of instances.
   *
   * @deprecated Not applied to the AutoScaling group any more: a fixed
   * desired capacity is reset on every deployment and fights scaling
   * policies. The value is still validated against `minCapacity` and
   * `maxCapacity`.
   */
  readonly desiredCapacity?: number;
}

export interface BaseDockerExecutorProps extends ExecutorProps {
  /**
   * The autoscaling config. Required for the autoscaling executor type.
   */
  readonly autoscalingConfig?: AutoScalingConfig;

  /**
   * The Instance Type used by the docker executor.
   */
  readonly instanceType: InstanceType;

  /**
   * The AMI used by the runner. Amazon Linux 2023 is expected.
   */
  readonly machineImage: IMachineImage;

  /**
   * The VPC where the runner should run.
   */
  readonly vpcConfig: VpcConfig;

  /**
   * Secret holding the GitLab access token as `PrivateToken`.
   */
  readonly tokenSecret: ISecret;

  /**
   * GitLab base URL.
   */
  readonly gitlabUrl: string;

  /**
   * Size of the root EBS volume in GiB.
   *
   * @default DEFAULT_VOLUME_SIZE
   */
  readonly volumeSize?: number;

  /**
   * Registration request used to create the runner of every instance.
   *
   * @default - an instance runner without additional settings
   */
  readonly registration?: RunnerRegistration;

  /**
   * GitLab runner version installed on the instances.
   *
   * @default DEFAULT_RUNNER_VERSION
   */
  readonly runnerVersion?: string;

  /**
   * Cache bucket the runner may read and write. Must match the bucket
   * configured in `config`.
   *
   * @default - no cache permissions
   */
  readonly cacheBucket?: GitLabCacheBucket;

  /**
   * How long a terminating autoscaling instance may wait for running jobs
   * before it is terminated anyway. Ignored by the single instance executor.
   *
   * @default Duration.minutes(60)
   */
  readonly maxDrainDuration?: Duration;
}

export interface DockerExecutorProps extends BaseDockerExecutorProps {
  /**
   * Choose the docker executor type.
   */
  readonly dockerExecutorType: DockerExecutorType;
}

export interface IDockerExecutor {
  /** Underlying instance or autoscaling group. */
  readonly executor: Instance | AutoScalingGroup;
  /** IAM role of the executor instances. */
  readonly role: IRole;
  addTaggingPermission(grantee: IRole): void;
}

/**
 * Runs GitLab jobs with the Docker executor on a single EC2 instance or an
 * AutoScaling group.
 *
 * The construct grants the instance role what the bootstrap script and the
 * runner need: reading the token secret, tagging its own instance and,
 * when a cache bucket is given, reading and writing the cache.
 */
export class DockerExecutor extends Construct implements IDockerExecutor {
  readonly executor: Instance | AutoScalingGroup;
  readonly role: IRole;

  constructor(scope: Construct, id: string, props: DockerExecutorProps) {
    super(scope, id);

    const registration = props.registration ?? {
      runner_type: RunnerType.INSTANCE,
    };
    validateRunnerRegistration(registration);

    this.executor = this.createExecutor(this, 'Executor', {
      ...props,
      registration,
    });
    this.role = this.executor.role;

    this.addTaggingPermission(this.role);
    props.tokenSecret.grantRead(this.role);
    props.tokenSecret.encryptionKey?.grantDecrypt(this.role);

    if (props.cacheBucket) {
      // Also grants the bucket's KMS key.
      props.cacheBucket.grantReadWrite(this.role);
    }
  }

  /**
   * Allows the executor to tag its own instance with the runner id.
   *
   * The condition restricts the action to instances of this stack.
   *
   * @param grantee - The role that will be granted the permission.
   */
  public addTaggingPermission(grantee: IRole) {
    grantee.addToPrincipalPolicy(
      new PolicyStatement({
        actions: ['ec2:CreateTags', 'ec2:DescribeInstances'],
        resources: ['*'],
        conditions: {
          StringEquals: {
            'aws:ResourceTag/aws:cloudformation:stack-name':
              Stack.of(this).stackName,
          },
        },
      }),
    );
  }

  private createExecutor(
    scope: Construct,
    id: string,
    props: DockerExecutorProps,
  ) {
    switch (props.dockerExecutorType) {
      case DockerExecutorType.AUTOSCALING:
        if (!props.autoscalingConfig) {
          throw new Error(
            'Autoscaling config is required for autoscaling executor',
          );
        }
        validateAutoScalingConfig(props.autoscalingConfig);
        return new DockerExecutorAutoscaling(scope, id, props);
      case DockerExecutorType.SINGLE_INSTANCE:
        return new DockerExecutorInstance(scope, id, props);
      default:
        throw new Error(
          `Unsupported DockerExecutorType: ${String(props.dockerExecutorType)}`,
        );
    }
  }
}

/**
 * Validates the capacity settings of an autoscaling executor.
 */
export function validateAutoScalingConfig(config: AutoScalingConfig) {
  if (config.minCapacity < 0) {
    throw new Error('autoscalingConfig.minCapacity must not be negative');
  }
  if (config.minCapacity > config.maxCapacity) {
    throw new Error(
      'autoscalingConfig.minCapacity must not exceed maxCapacity',
    );
  }
  if (config.desiredCapacity !== undefined) {
    if (config.desiredCapacity > config.maxCapacity) {
      throw new Error(
        'autoscalingConfig.desiredCapacity should never exceed maxCapacity',
      );
    }
    if (config.desiredCapacity < config.minCapacity) {
      throw new Error(
        'autoscalingConfig.desiredCapacity should never be lower than minCapacity',
      );
    }
  }
}

/**
 * Get the block device configuration for Docker Executor AutoScaling Groups.
 *
 * @param volumeSize - The size of the root EBS volume in GiB.
 * @returns An array of block devices.
 */
export function getAsg2BlockDevices(
  volumeSize: number = DEFAULT_VOLUME_SIZE,
): asg_BlockDevice[] {
  validateVolumeSize(volumeSize);

  return getEbsDevices<asg_BlockDevice>(volumeSize);
}

/**
 * Get the block device configuration for Docker Executor instances.
 *
 * @param volumeSize - The size of the root EBS volume in GiB.
 * @returns An array of block devices.
 */
export function getEc2BlockDevices(
  volumeSize: number = DEFAULT_VOLUME_SIZE,
): ec2_BlockDevice[] {
  validateVolumeSize(volumeSize);

  return getEbsDevices<ec2_BlockDevice>(volumeSize);
}

function validateVolumeSize(volumeSize: number) {
  if (volumeSize < 8) {
    throw new Error('The volume size must be at least 8 GiB.');
  }
}

function getEbsDevices<EbsDevices extends asg_BlockDevice | ec2_BlockDevice>(
  volumeSize: number,
) {
  return [
    {
      deviceName: '/dev/xvda',
      volume: {
        ebsDevice: {
          deleteOnTermination: true,
          volumeSize,
        },
      },
    },
  ] as EbsDevices[];
}

/**
 * Setup CloudFormation initialization for the Docker Executor instance.
 *
 * @param scope - The construct scope.
 * @param props - The properties for initializing the Docker Executor instance.
 */
export function setupCfnInit(scope: Construct, props: BaseDockerExecutorProps) {
  return GlCfnInit.createInit(scope, {
    tags: props.tags,
    config: props.config,
    tokenSecret: props.tokenSecret,
    url: props.gitlabUrl,
    registration: props.registration ?? { runner_type: RunnerType.INSTANCE },
    runnerVersion: props.runnerVersion,
  });
}
