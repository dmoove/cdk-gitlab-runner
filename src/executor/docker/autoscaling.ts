import { Duration } from 'aws-cdk-lib';
import {
  AutoScalingGroup,
  Signals,
  UpdatePolicy,
} from 'aws-cdk-lib/aws-autoscaling';
import { LaunchTemplate, UserData } from 'aws-cdk-lib/aws-ec2';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { DrainStateMachine } from '../../drain-runner';
import { GlCfnInit } from './cfn-init';
import {
  BaseDockerExecutorProps,
  getAsg2BlockDevices,
  setupCfnInit,
} from './docker-executor';

export type DockerExecutorAutoscalingProps = BaseDockerExecutorProps;

/**
 * AutoScaling group of Docker executor instances for GitLab CI/CD.
 *
 * Instances are launched from an explicit launch template (IMDSv2 required,
 * root volume sized by `volumeSize`) and registered through CloudFormation
 * Init. A {@link DrainStateMachine} pauses and unregisters runners before
 * instances are terminated.
 *
 * The desired capacity is intentionally not managed: it is set by scaling
 * policies or manually and would otherwise be reset on every deployment.
 *
 * Example:
 * ```
 * const asgExecutor = new DockerExecutorAutoscaling(this, 'DockerExecutor', {
 *   instanceType: new InstanceType('t3.medium'),
 *   machineImage: MachineImage.latestAmazonLinux2023(),
 *   autoscalingConfig: { minCapacity: 1, maxCapacity: 5 },
 *   vpcConfig: { vpc },
 *   gitlabUrl: 'https://gitlab.example.com/',
 *   tokenSecret: secret,
 *   config,
 * });
 * ```
 */
export class DockerExecutorAutoscaling extends AutoScalingGroup {
  /** State machine that drains runners before termination. */
  readonly drainStateMachine: DrainStateMachine;

  constructor(
    scope: Construct,
    id: string,
    props: DockerExecutorAutoscalingProps,
  ) {
    const minCapacity = props.autoscalingConfig?.minCapacity ?? 1;
    const maxCapacity = props.autoscalingConfig?.maxCapacity ?? 5;

    const launchTemplate = new LaunchTemplate(scope, `${id}LaunchTemplate`, {
      instanceType: props.instanceType,
      machineImage: props.machineImage,
      role: new Role(scope, `${id}InstanceRole`, {
        assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
        description: 'Instance role of the GitLab runner executor',
      }),
      userData: UserData.forLinux(),
      blockDevices: getAsg2BlockDevices(props.volumeSize),
      requireImdsv2: true,
    });

    super(scope, id, {
      launchTemplate,
      minCapacity,
      maxCapacity,
      vpc: props.vpcConfig.vpc,
      vpcSubnets: props.vpcConfig.vpcSubnets,
      signals: Signals.waitForMinCapacity({
        timeout: Duration.minutes(15),
      }),
      newInstancesProtectedFromScaleIn: false,
      updatePolicy: UpdatePolicy.rollingUpdate({
        minInstancesInService: Math.min(
          minCapacity,
          Math.max(maxCapacity - 1, 0),
        ),
      }),
    });

    GlCfnInit.addAwsCfnBootstrap(this);
    this.applyCloudFormationInit(setupCfnInit(scope, props));

    this.drainStateMachine = new DrainStateMachine(this, 'DrainStateMachine', {
      autoScalingGroup: this,
      maxDrainDuration: props.maxDrainDuration,
      functionProps: {
        gitEndpoint: props.gitlabUrl,
        secret: props.tokenSecret,
        autoScalingGroup: this,
      },
    });
  }
}
