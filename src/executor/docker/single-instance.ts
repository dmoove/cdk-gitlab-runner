import { Instance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import {
  BaseDockerExecutorProps,
  getEc2BlockDevices,
  setupCfnInit,
} from './docker-executor';

export type DockerExecutorInstanceProps = BaseDockerExecutorProps;

/**
 * Single EC2 instance running the GitLab Docker executor.
 *
 * The instance requires IMDSv2, sizes its root volume by `volumeSize` and
 * is registered as a runner through CloudFormation Init.
 */
export class DockerExecutorInstance extends Instance {
  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorInstanceProps,
  ) {
    super(scope, id, {
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      blockDevices: getEc2BlockDevices(props.volumeSize),
      vpc: props.vpcConfig.vpc,
      vpcSubnets: props.vpcConfig.vpcSubnets,
      init: setupCfnInit(scope, props),
      requireImdsv2: true,
    });

    GlCfnInit.addAwsCfnBootstrap(this);
  }
}
