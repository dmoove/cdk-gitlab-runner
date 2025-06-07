import { Stack } from 'aws-cdk-lib';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import {
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
  readonly pendingJobsTarget?: number;
}

export interface IDockerExecutor {
  readonly executor: Instance | AutoScalingGroup;
  addTaggingPermission(grantee: IRole): void;
}

export class DockerExecutor extends Construct implements IDockerExecutor {
  readonly executor: Instance | AutoScalingGroup;

  constructor(scope: Construct, id: string, props: DockerExecutorProps) {
    super(scope, id);

    switch (props.dockerExecutorType) {
      case DockerExecutorType.AUTOSCALING:
        if (!props.autoscalingConfig) {
          throw new Error(
            'Autoscaling config is required for autoscaling executor',
          );
        }

        if (
          props.autoscalingConfig.desiredCapacity >
          props.autoscalingConfig.maxCapacity
        ) {
          throw new Error(
            'autoscalingConfig.desiredCapacity should never exceed props.autoscalingConfig.maxCapacity',
          );
        } else if (
          props.autoscalingConfig.desiredCapacity <
          props.autoscalingConfig.minCapacity
        ) {
          throw new Error(
            'autoscalingConfig.desiredCapacity should never be lower than props.autoscalingConfig.minCapacity',
          );
        }

        this.executor = new DockerExecutorAutoscaling(this, 'ASG', {
          autoscalingConfig: props.autoscalingConfig,
          config: props.config,
          instanceType: props.instanceType,
          machineImage: props.machineImage,
          tags: props.tags,
          vpcConfig: props.vpcConfig,
          tokenSecret: props.tokenSecret,
          gitlabUrl: props.gitlabUrl,
        });
        break;
      case DockerExecutorType.SINGLE_INSTANCE:
        this.executor = new DockerExecutorInstance(this, 'Instance', {
          config: props.config,
          instanceType: props.instanceType,
          machineImage: props.machineImage,
          tags: props.tags,
          vpcConfig: props.vpcConfig,
          tokenSecret: props.tokenSecret,
          gitlabUrl: props.gitlabUrl,
        });
        break;
    }
    this.addTaggingPermission(this.executor.role);
    props.tokenSecret.grantRead(this.executor.role);
    props.tokenSecret.encryptionKey?.grantDecrypt(this.executor.role);
  }

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
}
