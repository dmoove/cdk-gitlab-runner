import { Duration, Stack } from 'aws-cdk-lib';
import {
  AutoScalingGroup,
  SpotAllocationStrategy,
} from 'aws-cdk-lib/aws-autoscaling';
import {
  AmazonLinuxCpuType,
  IMachineImage,
  ISecurityGroup,
  InstanceArchitecture,
  InstanceType,
  LaunchTemplate,
  MachineImage,
  Port,
  SecurityGroup,
  UserData,
} from 'aws-cdk-lib/aws-ec2';
import {
  Cluster,
  ContainerImage,
  CpuArchitecture,
  FargateService,
  FargateTaskDefinition,
  ICluster,
  LogDrivers,
  OperatingSystemFamily,
  Secret as EcsSecret,
} from 'aws-cdk-lib/aws-ecs';
import {
  IRole,
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { GitLabCacheBucket } from '../../cache/cache-bucket';
import {
  AutoscalerIdlePolicy,
  DockerRunnerConfig,
  GitLabConfig,
} from '../../config-generator/config-generator';
import {
  DEFAULT_RUNNER_VERSION,
  RunnerRegistration,
  RunnerType,
  buildRunnerTagList,
  validateRunnerRegistration,
} from '../../config-generator/registration';
import { GitLabRunnerRegistration } from '../../runner-registration/runner-registration';
import { VpcConfig, getEc2BlockDevices } from '../docker/docker-executor';

/**
 * Fleeting plugin used by default: the latest 1.x release of the AWS
 * plugin, installed by `gitlab-runner fleeting install` at task start.
 */
export const DEFAULT_FLEETING_PLUGIN = 'aws:1';

/**
 * Command that marks a new instance as ready: cloud-init (which installs
 * Docker through the user data) has finished and the Docker daemon answers.
 */
export const DEFAULT_INSTANCE_READY_COMMAND =
  'sudo cloud-init status --wait > /dev/null; docker info > /dev/null';

/**
 * Start command of the runner manager container.
 *
 * It writes `config.toml` with the runner token from the secret, installs
 * the fleeting plugin and replaces itself with the runner process.
 */
export const MANAGER_START_SCRIPT = [
  'set -eu',
  'mkdir -p /etc/gitlab-runner',
  'printf "%s\\n" "$RUNNER_CONFIG" | sed "s|{TOKEN}|$RUNNER_TOKEN|" > /etc/gitlab-runner/config.toml',
  'chmod 600 /etc/gitlab-runner/config.toml',
  'gitlab-runner fleeting install',
  'exec gitlab-runner run',
].join('\n');

/**
 * Entry point of the runner manager container. ECS stops a task with
 * SIGTERM, which makes the runner abort running jobs. dumb-init (part of
 * the official runner image) rewrites it to SIGQUIT, the graceful shutdown
 * that lets jobs finish within the stop timeout.
 */
export const MANAGER_ENTRY_POINT = [
  '/usr/bin/dumb-init',
  '--rewrite',
  '15:3',
  '/bin/sh',
  '-c',
];

/**
 * Settings of a Docker Autoscaler executor, as passed to
 * `GitLabRunner.addDockerAutoscalerExecutor()`.
 */
export interface DockerAutoscalerExecutorAttributes {
  /**
   * Construct id of the executor. Must be unique per GitLabRunner.
   *
   * @default DockerAutoscalerExecutor
   */
  readonly id?: string;
  /**
   * VPC of the runner manager and the job instances. Both need outbound
   * internet access (NAT gateway or public subnets with `assignPublicIp`)
   * to reach GitLab, Docker Hub and the plugin registry.
   */
  readonly vpcConfig: VpcConfig;
  /**
   * Give the runner manager task a public IP. Required in public subnets
   * without a NAT gateway.
   *
   * @default false
   */
  readonly assignPublicIp?: boolean;
  /**
   * Instance type of the job instances.
   */
  readonly instanceType: InstanceType;
  /**
   * Further instance types the AutoScaling group may launch. They must have
   * the same architecture as `instanceType`. Useful together with `spot`.
   *
   * @default - only `instanceType`
   */
  readonly additionalInstanceTypes?: InstanceType[];
  /**
   * Launch the job instances as spot instances. A spot interruption fails
   * the jobs running on the instance.
   *
   * @default false
   */
  readonly spot?: boolean;
  /**
   * Machine image of the job instances. Docker is installed through the
   * user data, so Amazon Linux 2023 is expected. An image with Docker
   * preinstalled shortens the time until the first job starts.
   *
   * @default - latest Amazon Linux 2023 for the architecture of `instanceType`
   */
  readonly machineImage?: IMachineImage;
  /**
   * Size of the root EBS volume of the job instances in GiB.
   *
   * @default DEFAULT_VOLUME_SIZE
   */
  readonly volumeSize?: number;
  /**
   * Highest number of job instances.
   */
  readonly maxInstances: number;
  /**
   * Number of jobs running at the same time on one instance.
   *
   * @default 1
   */
  readonly capacityPerInstance?: number;
  /**
   * Number of jobs an instance runs before it is replaced. `1` gives every
   * job a fresh instance.
   *
   * @default 1
   */
  readonly maxUseCount?: number;
  /**
   * Idle policies. Idle instances start jobs without boot delay but cost
   * money while they wait.
   *
   * @default - no idle instances, every job starts a new instance
   */
  readonly idlePolicies?: AutoscalerIdlePolicy[];
  /**
   * Command that must succeed on a new instance before it takes jobs.
   *
   * @default DEFAULT_INSTANCE_READY_COMMAND
   */
  readonly instanceReadyCommand?: string;
  /**
   * Fleeting plugin reference.
   *
   * @default DEFAULT_FLEETING_PLUGIN
   */
  readonly plugin?: string;
  /**
   * GitLab runner tags of this executor.
   */
  readonly tags?: string[];
  /**
   * Settings of the `[runners.docker]` section. They apply to the job
   * containers on the instances, so `image:` and `services:` of a job work
   * as with the Docker executor.
   */
  readonly configProp?: DockerRunnerConfig;
  /**
   * ECS cluster of the runner manager.
   *
   * @default - a new cluster in the VPC
   */
  readonly cluster?: ICluster;
  /**
   * Image of the runner manager. It must provide `/usr/bin/dumb-init`,
   * `/bin/sh` and `gitlab-runner` like the official image.
   *
   * @default - `gitlab/gitlab-runner:alpine-v<runnerVersion>` from Docker Hub
   */
  readonly managerImage?: ContainerImage;
  /**
   * CPU units of the runner manager task.
   *
   * @default 256
   */
  readonly managerCpu?: number;
  /**
   * Memory of the runner manager task in MiB.
   *
   * @default 512
   */
  readonly managerMemoryLimitMiB?: number;
  /**
   * CPU architecture of the runner manager task. Independent of the job
   * instances.
   *
   * @default CpuArchitecture.ARM64
   */
  readonly managerCpuArchitecture?: CpuArchitecture;
  /**
   * Retention of the runner manager logs.
   *
   * @default RetentionDays.ONE_MONTH
   */
  readonly logRetention?: RetentionDays;
}

/**
 * Properties for {@link DockerAutoscalerExecutor}.
 */
export interface DockerAutoscalerExecutorProps extends DockerAutoscalerExecutorAttributes {
  /**
   * Secret holding the GitLab access token as `PrivateToken`.
   */
  readonly tokenSecret: ISecret;
  /**
   * GitLab base URL.
   */
  readonly gitlabUrl: string;
  /**
   * Registration request used to create the runner.
   *
   * @default - an instance runner without additional settings
   */
  readonly registration?: RunnerRegistration;
  /**
   * GitLab runner version of the manager image.
   *
   * @default DEFAULT_RUNNER_VERSION
   */
  readonly runnerVersion?: string;
  /**
   * Maximum number of jobs of the runner manager.
   *
   * @default - maxInstances * capacityPerInstance
   */
  readonly concurrent?: number;
  /**
   * Cache bucket of the runner. The manager signs the cache URLs, so its
   * task role gets read and write access.
   *
   * @default - no cache
   */
  readonly cacheBucket?: GitLabCacheBucket;
}

/**
 * Runs GitLab jobs with the Docker Autoscaler executor.
 *
 * A single runner manager runs as an ECS Fargate service and scales an EC2
 * AutoScaling group through the AWS fleeting plugin, based on the jobs
 * GitLab hands out. Jobs run in Docker on the instances, so `image:` and
 * `services:` behave as with the Docker executor. The group scales to zero
 * when no job is waiting.
 *
 * The runner is created once through a custom resource
 * ({@link GitLabRunnerRegistration}); its token is injected into the
 * manager from Secrets Manager. The manager reaches the instances over SSH
 * with keys pushed through EC2 Instance Connect.
 */
export class DockerAutoscalerExecutor extends Construct {
  /** AutoScaling group of the job instances, managed by the runner. */
  readonly autoScalingGroup: AutoScalingGroup;
  /** IAM role of the job instances. */
  readonly instanceRole: IRole;
  /** Security group of the job instances. */
  readonly instanceSecurityGroup: ISecurityGroup;
  /** Fargate service of the runner manager. */
  readonly service: FargateService;
  /** Task definition of the runner manager. */
  readonly taskDefinition: FargateTaskDefinition;
  /** Security group of the runner manager. */
  readonly managerSecurityGroup: ISecurityGroup;
  /** Runner created in GitLab for this executor. */
  readonly registration: GitLabRunnerRegistration;

  constructor(
    scope: Construct,
    id: string,
    props: DockerAutoscalerExecutorProps,
  ) {
    super(scope, id);
    validateDockerAutoscalerProps(props);

    const stack = Stack.of(this);
    const vpc = props.vpcConfig.vpc;
    const capacityPerInstance = props.capacityPerInstance ?? 1;

    // Job instances
    this.instanceSecurityGroup = new SecurityGroup(
      this,
      'InstanceSecurityGroup',
      {
        vpc,
        description: 'GitLab runner job instances',
      },
    );
    this.managerSecurityGroup = new SecurityGroup(
      this,
      'ManagerSecurityGroup',
      {
        vpc,
        description: 'GitLab runner manager',
      },
    );
    this.instanceSecurityGroup.addIngressRule(
      this.managerSecurityGroup,
      Port.tcp(22),
      'SSH from the runner manager',
    );

    this.instanceRole = new Role(this, 'InstanceRole', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      description: 'Instance role of the GitLab runner job instances',
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });

    const userData = UserData.forLinux();
    userData.addCommands(
      'dnf install -y docker ec2-instance-connect',
      'systemctl enable --now docker',
      'usermod -aG docker ec2-user',
    );

    const launchTemplate = new LaunchTemplate(this, 'LaunchTemplate', {
      instanceType: props.instanceType,
      machineImage:
        props.machineImage ?? defaultMachineImage(props.instanceType),
      role: this.instanceRole,
      securityGroup: this.instanceSecurityGroup,
      userData,
      blockDevices: getEc2BlockDevices(props.volumeSize),
      requireImdsv2: true,
      // Job containers sit behind the Docker bridge, one hop further, so
      // they cannot read the instance credentials.
      httpPutResponseHopLimit: 1,
    });

    const useMixedInstances =
      props.spot === true || (props.additionalInstanceTypes ?? []).length > 0;

    // The runner owns the capacity: no desired capacity, no scaling
    // policies, and scale-in protection so the group never terminates an
    // instance that runs a job.
    this.autoScalingGroup = new AutoScalingGroup(this, 'AutoScalingGroup', {
      vpc,
      vpcSubnets: props.vpcConfig.vpcSubnets,
      minCapacity: 0,
      maxCapacity: props.maxInstances,
      newInstancesProtectedFromScaleIn: true,
      ...(useMixedInstances
        ? {
            mixedInstancesPolicy: {
              launchTemplate,
              launchTemplateOverrides: [
                props.instanceType,
                ...(props.additionalInstanceTypes ?? []),
              ].map((instanceType) => ({ instanceType })),
              instancesDistribution: {
                onDemandBaseCapacity: 0,
                onDemandPercentageAboveBaseCapacity: props.spot ? 0 : 100,
                spotAllocationStrategy:
                  SpotAllocationStrategy.PRICE_CAPACITY_OPTIMIZED,
              },
            },
          }
        : { launchTemplate }),
    });

    // CloudFormation cannot suspend processes. AZRebalance would terminate
    // instances that run jobs to balance the zones.
    const suspendAzRebalance = {
      service: 'AutoScaling',
      action: 'SuspendProcesses',
      parameters: {
        AutoScalingGroupName: this.autoScalingGroup.autoScalingGroupName,
        ScalingProcesses: ['AZRebalance'],
      },
      physicalResourceId: PhysicalResourceId.of(
        `${this.node.addr}-AZRebalance`,
      ),
    };
    new AwsCustomResource(this, 'SuspendAZRebalance', {
      onCreate: suspendAzRebalance,
      onUpdate: suspendAzRebalance,
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          actions: ['autoscaling:SuspendProcesses'],
          resources: [this.autoScalingGroup.autoScalingGroupArn],
        }),
      ]),
      installLatestAwsSdk: false,
    });

    // Runner in GitLab
    const registration = props.registration ?? {
      runner_type: RunnerType.INSTANCE,
    };
    validateRunnerRegistration(registration);
    this.registration = new GitLabRunnerRegistration(this, 'Registration', {
      accessTokenSecret: props.tokenSecret,
      gitlabUrl: props.gitlabUrl,
      registration: {
        ...registration,
        tag_list: buildRunnerTagList(stack, props.tags, registration),
      },
    });

    // Runner manager
    const config = new GitLabConfig({
      concurrent: props.concurrent ?? props.maxInstances * capacityPerInstance,
      gitlabUrl: props.gitlabUrl,
      logFormat: 'json',
    });
    config.addDockerAutoscaler(props.configProp, {
      plugin: props.plugin ?? DEFAULT_FLEETING_PLUGIN,
      capacityPerInstance,
      maxUseCount: props.maxUseCount ?? 1,
      maxInstances: props.maxInstances,
      autoScalingGroupName: this.autoScalingGroup.autoScalingGroupName,
      region: stack.region,
      instanceReadyCommand:
        props.instanceReadyCommand ?? DEFAULT_INSTANCE_READY_COMMAND,
      policies: props.idlePolicies,
    });
    if (props.cacheBucket) {
      config.addCache(this, props.cacheBucket);
    }

    this.taskDefinition = new FargateTaskDefinition(this, 'TaskDefinition', {
      cpu: props.managerCpu ?? 256,
      memoryLimitMiB: props.managerMemoryLimitMiB ?? 512,
      runtimePlatform: {
        cpuArchitecture: props.managerCpuArchitecture ?? CpuArchitecture.ARM64,
        operatingSystemFamily: OperatingSystemFamily.LINUX,
      },
    });

    const runnerVersion = props.runnerVersion ?? DEFAULT_RUNNER_VERSION;
    this.taskDefinition.addContainer('Runner', {
      image:
        props.managerImage ??
        ContainerImage.fromRegistry(
          `gitlab/gitlab-runner:alpine-v${runnerVersion}`,
        ),
      entryPoint: MANAGER_ENTRY_POINT,
      command: [MANAGER_START_SCRIPT],
      environment: {
        RUNNER_CONFIG: config.generateToml(),
        // A new runner needs a new task to read the new token.
        RUNNER_ID: this.registration.runnerId,
      },
      secrets: {
        RUNNER_TOKEN: EcsSecret.fromSecretsManager(
          this.registration.runnerTokenSecret,
          'token',
        ),
      },
      logging: LogDrivers.awsLogs({
        streamPrefix: 'runner',
        logGroup: new LogGroup(this, 'LogGroup', {
          retention: props.logRetention ?? RetentionDays.ONE_MONTH,
        }),
      }),
      // Longest stop timeout Fargate allows.
      stopTimeout: Duration.seconds(120),
    });

    this.grantFleeting(this.taskDefinition.taskRole);
    if (props.cacheBucket) {
      props.cacheBucket.grantReadWrite(this.taskDefinition.taskRole);
    }

    // Exactly one manager may drive the AutoScaling group, also during
    // deployments.
    this.service = new FargateService(this, 'Service', {
      cluster: props.cluster ?? new Cluster(this, 'Cluster', { vpc }),
      taskDefinition: this.taskDefinition,
      desiredCount: 1,
      minHealthyPercent: 0,
      maxHealthyPercent: 100,
      assignPublicIp: props.assignPublicIp ?? false,
      vpcSubnets: props.vpcConfig.vpcSubnets,
      securityGroups: [this.managerSecurityGroup],
      circuitBreaker: { rollback: true },
    });
  }

  /**
   * Grants the permissions the AWS fleeting plugin needs to manage the
   * AutoScaling group and to connect to its instances.
   */
  private grantFleeting(grantee: IRole) {
    const stack = Stack.of(this);
    grantee.addToPrincipalPolicy(
      new PolicyStatement({
        actions: [
          'autoscaling:SetDesiredCapacity',
          'autoscaling:SetInstanceProtection',
          'autoscaling:TerminateInstanceInAutoScalingGroup',
        ],
        resources: [this.autoScalingGroup.autoScalingGroupArn],
      }),
    );
    grantee.addToPrincipalPolicy(
      new PolicyStatement({
        actions: [
          'autoscaling:DescribeAutoScalingGroups',
          'ec2:DescribeInstances',
          'ec2:DescribeSpotInstanceRequests',
        ],
        resources: ['*'],
      }),
    );
    grantee.addToPrincipalPolicy(
      new PolicyStatement({
        actions: ['ec2-instance-connect:SendSSHPublicKey'],
        resources: [
          stack.formatArn({
            service: 'ec2',
            resource: 'instance',
            resourceName: '*',
          }),
        ],
        conditions: {
          StringEquals: {
            'ec2:ResourceTag/aws:autoscaling:groupName':
              this.autoScalingGroup.autoScalingGroupName,
          },
        },
      }),
    );
  }
}

/**
 * Validates the capacity settings of a Docker Autoscaler executor.
 */
export function validateDockerAutoscalerProps(
  props: DockerAutoscalerExecutorAttributes,
) {
  const positive: [string, number | undefined][] = [
    ['maxInstances', props.maxInstances],
    ['capacityPerInstance', props.capacityPerInstance],
    ['maxUseCount', props.maxUseCount],
  ];
  positive.forEach(([name, value]) => {
    if (value !== undefined && (!Number.isInteger(value) || value < 1)) {
      throw new Error(`${name} must be a positive integer`);
    }
  });
  (props.idlePolicies ?? []).forEach((policy) => {
    if (!Number.isInteger(policy.idleCount) || policy.idleCount < 0) {
      throw new Error('idleCount must not be negative');
    }
  });
  const architecture = props.instanceType.architecture;
  (props.additionalInstanceTypes ?? []).forEach((instanceType) => {
    if (instanceType.architecture !== architecture) {
      throw new Error(
        `additionalInstanceTypes must match the architecture of ${props.instanceType.toString()}`,
      );
    }
  });
}

function defaultMachineImage(instanceType: InstanceType): IMachineImage {
  return MachineImage.latestAmazonLinux2023({
    cpuType:
      instanceType.architecture === InstanceArchitecture.ARM_64
        ? AmazonLinuxCpuType.ARM_64
        : AmazonLinuxCpuType.X86_64,
  });
}
