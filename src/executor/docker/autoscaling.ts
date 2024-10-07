import { Duration } from 'aws-cdk-lib';
import {
  AutoScalingGroup,
  Signals,
  UpdatePolicy,
} from 'aws-cdk-lib/aws-autoscaling';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import {
  BaseDockerExecutorProps,
  getAsg2BlockDevices,
  setupCfnInit,
} from './docker-executor';
import { DrainStateMachine } from '../../drain-runner';

export interface DockerExecutorAutoscalingProps
  extends BaseDockerExecutorProps {}

/**
 * Represents an Auto Scaling Group for Docker Executor instances for GitLab CI/CD.
 * This class extends `AutoScalingGroup` to provide a scalable pool of instances
 * that automatically adjusts based on workload demands.
 *
 * Example:
 * ```
 * const asgExecutor = new DockerExecutorAutoscaling(this, 'DockerExecutor', {
 *   instanceType: new InstanceType('t3.medium'),
 *   machineImage: MachineImage.latestAmazonLinux(),
 *   autoscalingConfig: { minCapacity: 1, maxCapacity: 5, desiredCapacity: 2 },
 *   vpcConfig: { vpc: vpc },
 *   gitlabUrl: 'https://gitlab.example.com',
 *   tokenSecret: secret,
 * });
 * ```
 *
 * @param scope - The scope in which to define this construct.
 * @param id - The ID of the construct.
 * @param props - The properties required to configure the auto scaling group.
 */
export class DockerExecutorAutoscaling extends AutoScalingGroup {
  private static validateAutoScalingConfig(
    props: DockerExecutorAutoscalingProps,
  ) {
    if (
      props.autoscalingConfig?.minCapacity &&
      props.autoscalingConfig?.maxCapacity
    ) {
      if (
        props.autoscalingConfig.minCapacity >
        props.autoscalingConfig.maxCapacity
      ) {
        throw new Error('The minCapacity cannot be greater than maxCapacity.');
      }
    }
  }

  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorAutoscalingProps,
  ) {
    super(scope, id, {
      minCapacity: props.autoscalingConfig?.minCapacity ?? 1,
      maxCapacity: props.autoscalingConfig?.maxCapacity ?? 5,
      desiredCapacity: props.autoscalingConfig?.desiredCapacity ?? 2,
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      signals: Signals.waitForAll({
        timeout: Duration.minutes(10),
      }),
      newInstancesProtectedFromScaleIn: false,
      blockDevices: getAsg2BlockDevices(),
      vpc: props.vpcConfig.vpc,
      vpcSubnets: props.vpcConfig.vpcSubnets,
      updatePolicy: UpdatePolicy.rollingUpdate({
        minInstancesInService: 1,
      }),
      requireImdsv2: true,
    });

    DockerExecutorAutoscaling.validateAutoScalingConfig(props);

    this.applyCloudFormationInit(setupCfnInit(scope, props));

    GlCfnInit.addAwsCfnBootstrap(this);

    new DrainStateMachine(this, 'DrainStateMachine', {
      autoScalingGroup: this,
      functionProps: {
        gitEndpoint: props.gitlabUrl,
        secret: props.tokenSecret,
        autoScalingGroup: this,
      },
    });
  }
}
