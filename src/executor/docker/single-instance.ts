import { Instance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import { BaseDockerExecutorProps } from './docker-executor';

export interface DockerExecutorInstanceProps extends BaseDockerExecutorProps {}

export class DockerExecutorInstance extends Instance {
  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorInstanceProps,
  ) {
    super(scope, id, {
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
      init: GlCfnInit.createInit(scope, {
        tags: props.tags,
        config: props.config,
        tokenSecret: props.tokenSecret,
      }),
      vpcSubnets: props.vpcConfig.vpcSubnets,
    });

    GlCfnInit.addAwsCfnBootstrap(this);
  }
}
