import { Stack } from 'aws-cdk-lib';
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
import { DockerExecutorAutoscaling } from './autoscaling';
import { GlCfnInit } from './cfn-init';
import { DockerExecutorType } from './enums';
import { DockerExecutorInstance } from './single-instance';
import { ExecutorProps } from '../executor';

export interface BaseDockerExecutorProps extends ExecutorProps {
  /**
   * The autoscaling config.
   */
  readonly autoscalingConfig?: AutoScalingConfig;

  /**
   * The Instance Type used by the docker executor.
   */
  readonly instanceType: InstanceType;

  /**
   * The AMI used by the runner.
   */
  readonly machineImage: IMachineImage;

  /**
   * The VPC where the runner should run.
   */
  readonly vpcConfig: VpcConfig;

  /**
   * The GitLab authentification token secret
   */
  readonly tokenSecret: ISecret;

  readonly gitlabUrl: string;

  /**
   * Size of the root EBS volume in GiB.
   *
   * @default 80
   */
  readonly volumeSize?: number;
}

export interface VpcConfig {
  readonly vpc: IVpc;
  readonly vpcSubnets?: SubnetSelection;
}

export interface DockerExecutorProps extends BaseDockerExecutorProps {
  /**
   * Choose the docker executor type.
   */
  readonly dockerExecutorType: DockerExecutorType;
}

export interface AutoScalingConfig {
  readonly minCapacity: number;
  readonly maxCapacity: number;
  readonly desiredCapacity: number;
}

export interface IDockerExecutor {
  readonly executor: Instance | AutoScalingGroup;
  addTaggingPermission(grantee: IRole): void;
}

export class DockerExecutor extends Construct implements IDockerExecutor {
  readonly executor: Instance | AutoScalingGroup;

  constructor(scope: Construct, id: string, props: DockerExecutorProps) {
    super(scope, id);

    this.executor = this.createExecutor(this, 'Executor', props);
    // Adding tagging permission to the executor instance role
    this.addTaggingPermission(this.executor.role);
    // Grant read permissions for the GitLab token secret to the executor instance
    props.tokenSecret.grantRead(this.executor.role);
    props.tokenSecret.encryptionKey?.grantDecrypt(this.executor.role);
  }

  /**
   * Adds permissions to allow tagging of resources by the executor.
   *
   * This permission allows the executor to add tags to resources it creates.
   * The condition restricts the action to resources that belong to the same CloudFormation stack.
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

  private validateAutoScalingConfig(config: AutoScalingConfig) {
    if (config.desiredCapacity > config.maxCapacity) {
      throw new Error(
        'autoscalingConfig.desiredCapacity should never exceed maxCapacity',
      );
    } else if (config.desiredCapacity < config.minCapacity) {
      throw new Error(
        'autoscalingConfig.desiredCapacity should never be lower than minCapacity',
      );
    }
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
        // Validate that desired capacity is between min and max capacity
        this.validateAutoScalingConfig(props.autoscalingConfig);

        return new DockerExecutorAutoscaling(scope, id, {
          autoscalingConfig: props.autoscalingConfig,
          config: props.config,
          instanceType: props.instanceType,
          machineImage: props.machineImage,
          tags: props.tags,
          vpcConfig: props.vpcConfig,
          tokenSecret: props.tokenSecret,
          gitlabUrl: props.gitlabUrl,
        });
      case DockerExecutorType.SINGLE_INSTANCE:
        return new DockerExecutorInstance(scope, id, {
          config: props.config,
          instanceType: props.instanceType,
          machineImage: props.machineImage,
          tags: props.tags,
          vpcConfig: props.vpcConfig,
          tokenSecret: props.tokenSecret,
          gitlabUrl: props.gitlabUrl,
        });
      default:
        throw new Error(
          `Unsupported DockerExecutorType: ${props.dockerExecutorType}`,
        );
    }
  }
}

/**
 * Get the block device configuration for Docker Executor AutoScaling Groups.
 *
 * @param volumeSize - The size of the root EBS volume in GiB (default is 80).
 * @returns An array of block devices.
 */
export function getAsg2BlockDevices(
  volumeSize: number = 80,
): asg_BlockDevice[] {
  validateVolumeSize(volumeSize);

  return getEbsDevices<asg_BlockDevice>(volumeSize);
}

/**
 * Get the block device configuration for Docker Executor instances.
 *
 * @param volumeSize - The size of the root EBS volume in GiB (default is 80).
 * @returns An array of block devices.
 */
export function getEc2BlockDevices(volumeSize: number = 80): ec2_BlockDevice[] {
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
 * This method creates and returns the necessary CloudFormation Init configuration,
 * including the setup of environment variables and GitLab runner tokens.
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
  });
}
