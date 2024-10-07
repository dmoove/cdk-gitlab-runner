import { Instance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { GlCfnInit } from './cfn-init';
import {
  BaseDockerExecutorProps,
  getEc2BlockDevices,
  setupCfnInit,
} from './docker-executor';

export interface DockerExecutorInstanceProps extends BaseDockerExecutorProps {}

/**
 * Represents a Docker Executor instance for GitLab CI/CD.
 *
 * This class extends EC2 Instance and sets up a machine to run
 * GitLab jobs using a specific machine image, instance type, and VPC configuration.
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
      blockDevices: getEc2BlockDevices(props.volumeSize ?? 80),
      vpc: props.vpcConfig.vpc,
      init: setupCfnInit(scope, props),
      vpcSubnets: props.vpcConfig.vpcSubnets,
    });

    this.addCfnBootstrap();
  }

  /**
   * Adds AWS CloudFormation Bootstrap to the instance.
   *
   * This method ensures that the instance has all necessary packages
   * and tools to work with GitLab CI/CD.
   */
  private addCfnBootstrap() {
    GlCfnInit.addAwsCfnBootstrap(this);
  }
}
