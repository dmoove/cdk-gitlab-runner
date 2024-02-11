import { Stack } from 'aws-cdk-lib';
import { IMachineImage, IVpc, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { IRole, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { DockerExecutorAutoscaling } from './autoscaling';
import { DockerExecutorType } from './enums';
import { DockerExecutorInstance } from './single-instance';
import { ExecutorProps, IExecutor } from '../executor';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

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
  readonly vpc: IVpc;

  /**
   * The GitLab authentification token secret
   */
  readonly tokenSecret: ISecret;
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
  readonly executor: IExecutor;
  addTaggingPermission(grantee: IRole): void;
}

export class DockerExecutor extends Construct implements IDockerExecutor {
  readonly executor: IExecutor;

  constructor(scope: Construct, id: string, props: DockerExecutorProps) {
    super(scope, id);

    switch (props.dockerExecutorType) {
      case DockerExecutorType.AUTOSCALING:
        if (!props.autoscalingConfig) {
          throw new Error(
            'Autoscaling config is required for autoscaling executor'
          );
        }
        this.executor = new DockerExecutorAutoscaling(this, 'ASG', {
          autoscalingConfig: props.autoscalingConfig,
          config: props.config,
          instanceType: props.instanceType,
          machineImage: props.machineImage,
          tags: props.tags,
          vpc: props.vpc,
          tokenSecret: props.tokenSecret,
        });
        break;
      case DockerExecutorType.SINGLE_INSTANCE:
        this.executor = new DockerExecutorInstance(this, 'Instance', {
          config: props.config,
          instanceType: props.instanceType,
          machineImage: props.machineImage,
          tags: props.tags,
          vpc: props.vpc,
          tokenSecret: props.tokenSecret,
        });
        break;
    }
    this.addTaggingPermission(this.executor?.executor.role);
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
      })
    );
  }
}
