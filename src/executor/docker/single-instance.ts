import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { Instance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import { BaseDockerExecutorProps } from './docker-executor';
import { IExecutor } from '../executor';

export interface DockerExecutorInstanceProps extends BaseDockerExecutorProps {}

export class DockerExecutorInstance extends Construct implements IExecutor {
  readonly executor: Instance | AutoScalingGroup;

  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorInstanceProps,
  ) {
    super(scope, id);

    this.executor = new Instance(this, 'Instance', {
      instanceType: props.instanceType,
      machineImage: props.machineImage,
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
      init: GlCfnInit.createInit(this, {
        tags: props.tags,
        config: props.config,
        tokenSecret: props.tokenSecret,
      }),
      vpcSubnets: props.vpcConfig.vpcSubnets,
    });

    GlCfnInit.addAwsCfnBootstrap(this.executor);
  }
}
