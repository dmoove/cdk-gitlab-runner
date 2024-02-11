import { Duration } from 'aws-cdk-lib';
import {
  AutoScalingGroup,
  Signals,
  UpdatePolicy,
} from 'aws-cdk-lib/aws-autoscaling';
import { Instance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import { BaseDockerExecutorProps } from './docker-executor';
import { IExecutor } from '../executor';

export interface DockerExecutorAutoscalingProps
  extends BaseDockerExecutorProps {}

export class DockerExecutorAutoscaling extends Construct implements IExecutor {
  readonly executor: Instance | AutoScalingGroup;

  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorAutoscalingProps,
  ) {
    super(scope, id);
    this.executor = new AutoScalingGroup(this, 'ASG', {
      minCapacity: props.autoscalingConfig?.minCapacity,
      maxCapacity: props.autoscalingConfig?.maxCapacity,
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      signals: Signals.waitForAll({
        timeout: Duration.minutes(10),
      }),
      newInstancesProtectedFromScaleIn: false,
      blockDevices: [
        {
          deviceName: '/dev/xvda',
          volume: {
            ebsDevice: {
              deleteOnTermination: true,
              volumeSize: 80,
            },
          },
        },
      ],
      vpc: props.vpc,
      updatePolicy: UpdatePolicy.rollingUpdate({
        minInstancesInService: 1,
      }),
      requireImdsv2: true,
    });

    this.executor.applyCloudFormationInit(
      GlCfnInit.createInit(this, {
        tags: props.tags,
        config: props.config,
        tokenSecret: props.tokenSecret,
      }),
    );

    GlCfnInit.addAwsCfnBootstrap(this.executor);
  }
}
