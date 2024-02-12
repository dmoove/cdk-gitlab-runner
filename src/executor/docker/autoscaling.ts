import { Duration } from 'aws-cdk-lib';
import {
  AutoScalingGroup,
  Signals,
  UpdatePolicy,
} from 'aws-cdk-lib/aws-autoscaling';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import { BaseDockerExecutorProps } from './docker-executor';
import { DrainStateMachine } from '../../drain-runner';

export interface DockerExecutorAutoscalingProps
  extends BaseDockerExecutorProps {}

export class DockerExecutorAutoscaling extends AutoScalingGroup {
  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorAutoscalingProps,
  ) {
    super(scope, id, {
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
      vpc: props.vpcConfig.vpc,
      vpcSubnets: props.vpcConfig.vpcSubnets,
      updatePolicy: UpdatePolicy.rollingUpdate({
        minInstancesInService: 1,
      }),
      requireImdsv2: true,
    });

    this.applyCloudFormationInit(
      GlCfnInit.createInit(this, {
        tags: props.tags,
        config: props.config,
        tokenSecret: props.tokenSecret,
        url: props.gitlabUrl,
      }),
    );

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
