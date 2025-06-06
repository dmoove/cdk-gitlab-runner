# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DockerExecutor <a name="DockerExecutor" id="@dmoove/cdk-gitlab-runner.DockerExecutor"></a>

- _Implements:_ <a href="#@dmoove/cdk-gitlab-runner.IDockerExecutor">IDockerExecutor</a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer"></a>

```typescript
import { DockerExecutor } from '@dmoove/cdk-gitlab-runner'

new DockerExecutor(scope: Construct, id: string, props: DockerExecutorProps)
```

| **Name**                                                                                               | **Type**                                                                                      | **Description**   |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                             | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                           | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps">DockerExecutorProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps">DockerExecutorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                       | **Description**                                                 |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.toString">toString</a></code>                         | Returns a string representation of this construct.              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.addTaggingPermission">addTaggingPermission</a></code> | Adds permissions to allow tagging of resources by the executor. |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.DockerExecutor.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addTaggingPermission` <a name="addTaggingPermission" id="@dmoove/cdk-gitlab-runner.DockerExecutor.addTaggingPermission"></a>

```typescript
public addTaggingPermission(grantee: IRole): void
```

Adds permissions to allow tagging of resources by the executor.

This permission allows the executor to add tags to resources it creates.
The condition restricts the action to resources that belong to the same CloudFormation stack.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@dmoove/cdk-gitlab-runner.DockerExecutor.addTaggingPermission.parameter.grantee"></a>

- _Type:_ aws-cdk-lib.aws_iam.IRole

The role that will be granted the permission.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                     | **Description**               |
| -------------------------------------------------------------------------------------------- | ----------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.DockerExecutor.isConstruct"></a>

```typescript
import { DockerExecutor } from '@dmoove/cdk-gitlab-runner'

DockerExecutor.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.DockerExecutor.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                        | **Type**                                                                                  | **Description**   |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.property.node">node</a></code>         | <code>constructs.Node</code>                                                              | The tree node.    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutor.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | _No description._ |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.DockerExecutor.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `executor`<sup>Required</sup> <a name="executor" id="@dmoove/cdk-gitlab-runner.DockerExecutor.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- _Type:_ aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

### DockerExecutorAutoscaling <a name="DockerExecutorAutoscaling" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling"></a>

Represents an Auto Scaling Group for Docker Executor instances for GitLab CI/CD.

This class extends `AutoScalingGroup` to provide a scalable pool of instances
that automatically adjusts based on workload demands.

Example:

```
const asgExecutor = new DockerExecutorAutoscaling(this, 'DockerExecutor', {
  instanceType: new InstanceType('t3.medium'),
  machineImage: MachineImage.latestAmazonLinux(),
  autoscalingConfig: { minCapacity: 1, maxCapacity: 5, desiredCapacity: 2 },
  vpcConfig: { vpc: vpc },
  gitlabUrl: 'https://gitlab.example.com',
  tokenSecret: secret,
});
```

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer"></a>

```typescript
import { DockerExecutorAutoscaling } from '@dmoove/cdk-gitlab-runner'

new DockerExecutorAutoscaling(scope: Construct, id: string, props: DockerExecutorAutoscalingProps)
```

| **Name**                                                                                                          | **Type**                                                                                                            | **Description**   |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                                                   | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                                                 | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps">DockerExecutorAutoscalingProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps">DockerExecutorAutoscalingProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                                                                | **Description**                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.toString">toString</a></code>                                                       | Returns a string representation of this construct.                                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyRemovalPolicy">applyRemovalPolicy</a></code>                                   | Apply the given removal policy to this resource.                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook">addLifecycleHook</a></code>                                       | Send a message to either an SQS queue or SNS topic when instances launch or terminate. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addSecurityGroup">addSecurityGroup</a></code>                                       | Add the security group to all instances via the launch template security groups array. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addToRolePolicy">addToRolePolicy</a></code>                                         | Adds a statement to the IAM role assumed by instances of this fleet.                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addUserData">addUserData</a></code>                                                 | Add command to the startup script of fleet instances.                                  |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addWarmPool">addWarmPool</a></code>                                                 | Add a pool of pre-initialized EC2 instances that sits alongside an Auto Scaling group. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit">applyCloudFormationInit</a></code>                         | Use a CloudFormation Init configuration at instance startup.                           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.areNewInstancesProtectedFromScaleIn">areNewInstancesProtectedFromScaleIn</a></code> | Returns `true` if newly-launched instances are protected from scale-in.                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToApplicationTargetGroup">attachToApplicationTargetGroup</a></code>           | Attach to ELBv2 Application Target Group.                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToClassicLB">attachToClassicLB</a></code>                                     | Attach to a classic load balancer.                                                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToNetworkTargetGroup">attachToNetworkTargetGroup</a></code>                   | Attach to ELBv2 Application Target Group.                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.protectNewInstancesFromScaleIn">protectNewInstancesFromScaleIn</a></code>           | Ensures newly-launched instances are protected from scale-in.                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization">scaleOnCpuUtilization</a></code>                             | Scale out or in to achieve a target CPU utilization.                                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes">scaleOnIncomingBytes</a></code>                               | Scale out or in to achieve a target network ingress rate.                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric">scaleOnMetric</a></code>                                             | Scale out or in, in response to a metric.                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes">scaleOnOutgoingBytes</a></code>                               | Scale out or in to achieve a target network egress rate.                               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount">scaleOnRequestCount</a></code>                                 | Scale out or in to achieve a target request handling rate.                             |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule">scaleOnSchedule</a></code>                                         | Scale out or in based on time.                                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric">scaleToTrackMetric</a></code>                                   | Scale out or in in order to keep a metric around a target value.                       |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyRemovalPolicy.parameter.policy"></a>

- _Type:_ aws-cdk-lib.RemovalPolicy

---

##### `addLifecycleHook` <a name="addLifecycleHook" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook"></a>

```typescript
public addLifecycleHook(id: string, props: BasicLifecycleHookProps): LifecycleHook
```

Send a message to either an SQS queue or SNS topic when instances launch or terminate.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.BasicLifecycleHookProps

---

##### `addSecurityGroup` <a name="addSecurityGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addSecurityGroup"></a>

```typescript
public addSecurityGroup(securityGroup: ISecurityGroup): void
```

Add the security group to all instances via the launch template security groups array.

###### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addSecurityGroup.parameter.securityGroup"></a>

- _Type:_ aws-cdk-lib.aws_ec2.ISecurityGroup

: The security group to add.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by instances of this fleet.

###### `statement`<sup>Required</sup> <a name="statement" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addToRolePolicy.parameter.statement"></a>

- _Type:_ aws-cdk-lib.aws_iam.PolicyStatement

---

##### `addUserData` <a name="addUserData" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addUserData"></a>

```typescript
public addUserData(commands: ...string[]): void
```

Add command to the startup script of fleet instances.

The command must be in the scripting language supported by the fleet's OS (i.e. Linux/Windows).
Does nothing for imported ASGs.

###### `commands`<sup>Required</sup> <a name="commands" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addUserData.parameter.commands"></a>

- _Type:_ ...string[]

---

##### `addWarmPool` <a name="addWarmPool" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addWarmPool"></a>

```typescript
public addWarmPool(options?: WarmPoolOptions): WarmPool
```

Add a pool of pre-initialized EC2 instances that sits alongside an Auto Scaling group.

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.addWarmPool.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.WarmPoolOptions

---

##### `applyCloudFormationInit` <a name="applyCloudFormationInit" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit"></a>

```typescript
public applyCloudFormationInit(init: CloudFormationInit, options?: ApplyCloudFormationInitOptions): void
```

Use a CloudFormation Init configuration at instance startup.

This does the following:

- Attaches the CloudFormation Init metadata to the AutoScalingGroup resource.
- Add commands to the UserData to run `cfn-init` and `cfn-signal`.
- Update the instance's CreationPolicy to wait for `cfn-init` to finish
  before reporting success.

###### `init`<sup>Required</sup> <a name="init" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit.parameter.init"></a>

- _Type:_ aws-cdk-lib.aws_ec2.CloudFormationInit

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.ApplyCloudFormationInitOptions

---

##### `areNewInstancesProtectedFromScaleIn` <a name="areNewInstancesProtectedFromScaleIn" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.areNewInstancesProtectedFromScaleIn"></a>

```typescript
public areNewInstancesProtectedFromScaleIn(): boolean
```

Returns `true` if newly-launched instances are protected from scale-in.

##### `attachToApplicationTargetGroup` <a name="attachToApplicationTargetGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToApplicationTargetGroup"></a>

```typescript
public attachToApplicationTargetGroup(targetGroup: IApplicationTargetGroup): LoadBalancerTargetProps
```

Attach to ELBv2 Application Target Group.

###### `targetGroup`<sup>Required</sup> <a name="targetGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToApplicationTargetGroup.parameter.targetGroup"></a>

- _Type:_ aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationTargetGroup

---

##### `attachToClassicLB` <a name="attachToClassicLB" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToClassicLB"></a>

```typescript
public attachToClassicLB(loadBalancer: LoadBalancer): void
```

Attach to a classic load balancer.

###### `loadBalancer`<sup>Required</sup> <a name="loadBalancer" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToClassicLB.parameter.loadBalancer"></a>

- _Type:_ aws-cdk-lib.aws_elasticloadbalancing.LoadBalancer

---

##### `attachToNetworkTargetGroup` <a name="attachToNetworkTargetGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToNetworkTargetGroup"></a>

```typescript
public attachToNetworkTargetGroup(targetGroup: INetworkTargetGroup): LoadBalancerTargetProps
```

Attach to ELBv2 Application Target Group.

###### `targetGroup`<sup>Required</sup> <a name="targetGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToNetworkTargetGroup.parameter.targetGroup"></a>

- _Type:_ aws-cdk-lib.aws_elasticloadbalancingv2.INetworkTargetGroup

---

##### `protectNewInstancesFromScaleIn` <a name="protectNewInstancesFromScaleIn" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.protectNewInstancesFromScaleIn"></a>

```typescript
public protectNewInstancesFromScaleIn(): void
```

Ensures newly-launched instances are protected from scale-in.

##### `scaleOnCpuUtilization` <a name="scaleOnCpuUtilization" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization"></a>

```typescript
public scaleOnCpuUtilization(id: string, props: CpuUtilizationScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target CPU utilization.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.CpuUtilizationScalingProps

---

##### `scaleOnIncomingBytes` <a name="scaleOnIncomingBytes" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes"></a>

```typescript
public scaleOnIncomingBytes(id: string, props: NetworkUtilizationScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target network ingress rate.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.NetworkUtilizationScalingProps

---

##### `scaleOnMetric` <a name="scaleOnMetric" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric"></a>

```typescript
public scaleOnMetric(id: string, props: BasicStepScalingPolicyProps): StepScalingPolicy
```

Scale out or in, in response to a metric.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.BasicStepScalingPolicyProps

---

##### `scaleOnOutgoingBytes` <a name="scaleOnOutgoingBytes" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes"></a>

```typescript
public scaleOnOutgoingBytes(id: string, props: NetworkUtilizationScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target network egress rate.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.NetworkUtilizationScalingProps

---

##### `scaleOnRequestCount` <a name="scaleOnRequestCount" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount"></a>

```typescript
public scaleOnRequestCount(id: string, props: RequestCountScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target request handling rate.

The AutoScalingGroup must have been attached to an Application Load Balancer
in order to be able to call this.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.RequestCountScalingProps

---

##### `scaleOnSchedule` <a name="scaleOnSchedule" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule"></a>

```typescript
public scaleOnSchedule(id: string, props: BasicScheduledActionProps): ScheduledAction
```

Scale out or in based on time.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.BasicScheduledActionProps

---

##### `scaleToTrackMetric` <a name="scaleToTrackMetric" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric"></a>

```typescript
public scaleToTrackMetric(id: string, props: MetricTargetTrackingProps): TargetTrackingScalingPolicy
```

Scale out or in in order to keep a metric around a target value.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric.parameter.id"></a>

- _Type:_ string

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_autoscaling.MetricTargetTrackingProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                                                          | **Description**                                                        |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct">isConstruct</a></code>                           | Checks if `x` is a construct.                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isOwnedResource">isOwnedResource</a></code>                   | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isResource">isResource</a></code>                             | Check whether the given construct is a Resource.                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName">fromAutoScalingGroupName</a></code> | _No description._                                                      |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct"></a>

```typescript
import { DockerExecutorAutoscaling } from '@dmoove/cdk-gitlab-runner'

DockerExecutorAutoscaling.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isOwnedResource"></a>

```typescript
import { DockerExecutorAutoscaling } from '@dmoove/cdk-gitlab-runner'

DockerExecutorAutoscaling.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isOwnedResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isResource"></a>

```typescript
import { DockerExecutorAutoscaling } from '@dmoove/cdk-gitlab-runner'

DockerExecutorAutoscaling.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.isResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `fromAutoScalingGroupName` <a name="fromAutoScalingGroupName" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName"></a>

```typescript
import { DockerExecutorAutoscaling } from '@dmoove/cdk-gitlab-runner'

DockerExecutorAutoscaling.fromAutoScalingGroupName(scope: Construct, id: string, autoScalingGroupName: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName.parameter.id"></a>

- _Type:_ string

---

###### `autoScalingGroupName`<sup>Required</sup> <a name="autoScalingGroupName" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName.parameter.autoScalingGroupName"></a>

- _Type:_ string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                           | **Type**                                             | **Description**                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.node">node</a></code>                                 | <code>constructs.Node</code>                         | The tree node.                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.env">env</a></code>                                   | <code>aws-cdk-lib.ResourceEnvironment</code>         | The environment this resource belongs to.                                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.stack">stack</a></code>                               | <code>aws-cdk-lib.Stack</code>                       | The stack in which this resource is defined.                                  |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupArn">autoScalingGroupArn</a></code>   | <code>string</code>                                  | Arn of the AutoScalingGroup.                                                  |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupName">autoScalingGroupName</a></code> | <code>string</code>                                  | Name of the AutoScalingGroup.                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.connections">connections</a></code>                   | <code>aws-cdk-lib.aws_ec2.Connections</code>         | The network connections associated with this resource.                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.grantPrincipal">grantPrincipal</a></code>             | <code>aws-cdk-lib.aws_iam.IPrincipal</code>          | The principal to grant permissions to.                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.osType">osType</a></code>                             | <code>aws-cdk-lib.aws_ec2.OperatingSystemType</code> | The type of OS instances of this fleet are running.                           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.role">role</a></code>                                 | <code>aws-cdk-lib.aws_iam.IRole</code>               | The IAM Role in the instance profile.                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.userData">userData</a></code>                         | <code>aws-cdk-lib.aws_ec2.UserData</code>            | The Base64-encoded user data to make available to the launched EC2 instances. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.maxInstanceLifetime">maxInstanceLifetime</a></code>   | <code>aws-cdk-lib.Duration</code>                    | The maximum amount of time that an instance can be in service.                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.spotPrice">spotPrice</a></code>                       | <code>string</code>                                  | The maximum spot price configured for the autoscaling group.                  |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- _Type:_ aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- _Type:_ aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `autoScalingGroupArn`<sup>Required</sup> <a name="autoScalingGroupArn" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupArn"></a>

```typescript
public readonly autoScalingGroupArn: string;
```

- _Type:_ string

Arn of the AutoScalingGroup.

---

##### `autoScalingGroupName`<sup>Required</sup> <a name="autoScalingGroupName" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupName"></a>

```typescript
public readonly autoScalingGroupName: string;
```

- _Type:_ string

Name of the AutoScalingGroup.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- _Type:_ aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- _Type:_ aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---

##### `osType`<sup>Required</sup> <a name="osType" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.osType"></a>

```typescript
public readonly osType: OperatingSystemType;
```

- _Type:_ aws-cdk-lib.aws_ec2.OperatingSystemType

The type of OS instances of this fleet are running.

---

##### `role`<sup>Required</sup> <a name="role" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.role"></a>

```typescript
public readonly role: IRole;
```

- _Type:_ aws-cdk-lib.aws_iam.IRole

The IAM Role in the instance profile.

---

##### `userData`<sup>Required</sup> <a name="userData" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.userData"></a>

```typescript
public readonly userData: UserData;
```

- _Type:_ aws-cdk-lib.aws_ec2.UserData

The Base64-encoded user data to make available to the launched EC2 instances.

---

##### `maxInstanceLifetime`<sup>Optional</sup> <a name="maxInstanceLifetime" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.maxInstanceLifetime"></a>

```typescript
public readonly maxInstanceLifetime: Duration;
```

- _Type:_ aws-cdk-lib.Duration

The maximum amount of time that an instance can be in service.

---

##### `spotPrice`<sup>Optional</sup> <a name="spotPrice" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscaling.property.spotPrice"></a>

```typescript
public readonly spotPrice: string;
```

- _Type:_ string

The maximum spot price configured for the autoscaling group.

`undefined`
indicates that this group uses on-demand capacity.

---

### DockerExecutorInstance <a name="DockerExecutorInstance" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance"></a>

Represents a Docker Executor instance for GitLab CI/CD.

This class extends EC2 Instance and sets up a machine to run
GitLab jobs using a specific machine image, instance type, and VPC configuration.

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer"></a>

```typescript
import { DockerExecutorInstance } from '@dmoove/cdk-gitlab-runner'

new DockerExecutorInstance(scope: Construct, id: string, props: DockerExecutorInstanceProps)
```

| **Name**                                                                                                       | **Type**                                                                                                      | **Description**   |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                                             | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                                           | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps">DockerExecutorInstanceProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps">DockerExecutorInstanceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                           | **Description**                                           |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.toString">toString</a></code>                     | Returns a string representation of this construct.        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource.          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addSecurityGroup">addSecurityGroup</a></code>     | Add the security group to the instance.                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addToRolePolicy">addToRolePolicy</a></code>       | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addUserData">addUserData</a></code>               | Add command to the startup script of the instance.        |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.applyRemovalPolicy.parameter.policy"></a>

- _Type:_ aws-cdk-lib.RemovalPolicy

---

##### `addSecurityGroup` <a name="addSecurityGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addSecurityGroup"></a>

```typescript
public addSecurityGroup(securityGroup: ISecurityGroup): void
```

Add the security group to the instance.

###### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addSecurityGroup.parameter.securityGroup"></a>

- _Type:_ aws-cdk-lib.aws_ec2.ISecurityGroup

: The security group to add.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addToRolePolicy.parameter.statement"></a>

- _Type:_ aws-cdk-lib.aws_iam.PolicyStatement

---

##### `addUserData` <a name="addUserData" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addUserData"></a>

```typescript
public addUserData(commands: ...string[]): void
```

Add command to the startup script of the instance.

The command must be in the scripting language supported by the instance's OS (i.e. Linux/Windows).

###### `commands`<sup>Required</sup> <a name="commands" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.addUserData.parameter.commands"></a>

- _Type:_ ...string[]

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                                     | **Description**                                                        |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isConstruct">isConstruct</a></code>         | Checks if `x` is a construct.                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isResource">isResource</a></code>           | Check whether the given construct is a Resource.                       |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isConstruct"></a>

```typescript
import { DockerExecutorInstance } from '@dmoove/cdk-gitlab-runner'

DockerExecutorInstance.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isOwnedResource"></a>

```typescript
import { DockerExecutorInstance } from '@dmoove/cdk-gitlab-runner'

DockerExecutorInstance.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isOwnedResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isResource"></a>

```typescript
import { DockerExecutorInstance } from '@dmoove/cdk-gitlab-runner'

DockerExecutorInstance.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.isResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                                | **Type**                                             | **Description**                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.node">node</a></code>                                         | <code>constructs.Node</code>                         | The tree node.                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.env">env</a></code>                                           | <code>aws-cdk-lib.ResourceEnvironment</code>         | The environment this resource belongs to.                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.stack">stack</a></code>                                       | <code>aws-cdk-lib.Stack</code>                       | The stack in which this resource is defined.                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.connections">connections</a></code>                           | <code>aws-cdk-lib.aws_ec2.Connections</code>         | Allows specify security group connections for the instance. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.grantPrincipal">grantPrincipal</a></code>                     | <code>aws-cdk-lib.aws_iam.IPrincipal</code>          | The principal to grant permissions to.                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instance">instance</a></code>                                 | <code>aws-cdk-lib.aws_ec2.CfnInstance</code>         | the underlying instance resource.                           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instanceAvailabilityZone">instanceAvailabilityZone</a></code> | <code>string</code>                                  | The availability zone the instance was launched in.         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instanceId">instanceId</a></code>                             | <code>string</code>                                  | The instance's ID.                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateDnsName">instancePrivateDnsName</a></code>     | <code>string</code>                                  | Private DNS name for this instance.                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateIp">instancePrivateIp</a></code>               | <code>string</code>                                  | Private IP for this instance.                               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicDnsName">instancePublicDnsName</a></code>       | <code>string</code>                                  | Publicly-routable DNS name for this instance.               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicIp">instancePublicIp</a></code>                 | <code>string</code>                                  | Publicly-routable IP address for this instance.             |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.osType">osType</a></code>                                     | <code>aws-cdk-lib.aws_ec2.OperatingSystemType</code> | The type of OS the instance is running.                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.role">role</a></code>                                         | <code>aws-cdk-lib.aws_iam.IRole</code>               | The IAM role assumed by the instance.                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.userData">userData</a></code>                                 | <code>aws-cdk-lib.aws_ec2.UserData</code>            | UserData for the instance.                                  |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- _Type:_ aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- _Type:_ aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- _Type:_ aws-cdk-lib.aws_ec2.Connections

Allows specify security group connections for the instance.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- _Type:_ aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---

##### `instance`<sup>Required</sup> <a name="instance" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instance"></a>

```typescript
public readonly instance: CfnInstance;
```

- _Type:_ aws-cdk-lib.aws_ec2.CfnInstance

the underlying instance resource.

---

##### `instanceAvailabilityZone`<sup>Required</sup> <a name="instanceAvailabilityZone" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instanceAvailabilityZone"></a>

```typescript
public readonly instanceAvailabilityZone: string;
```

- _Type:_ string

The availability zone the instance was launched in.

---

##### `instanceId`<sup>Required</sup> <a name="instanceId" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instanceId"></a>

```typescript
public readonly instanceId: string;
```

- _Type:_ string

The instance's ID.

---

##### `instancePrivateDnsName`<sup>Required</sup> <a name="instancePrivateDnsName" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateDnsName"></a>

```typescript
public readonly instancePrivateDnsName: string;
```

- _Type:_ string

Private DNS name for this instance.

---

##### `instancePrivateIp`<sup>Required</sup> <a name="instancePrivateIp" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateIp"></a>

```typescript
public readonly instancePrivateIp: string;
```

- _Type:_ string

Private IP for this instance.

---

##### `instancePublicDnsName`<sup>Required</sup> <a name="instancePublicDnsName" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicDnsName"></a>

```typescript
public readonly instancePublicDnsName: string;
```

- _Type:_ string

Publicly-routable DNS name for this instance.

(May be an empty string if the instance does not have a public name).

---

##### `instancePublicIp`<sup>Required</sup> <a name="instancePublicIp" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicIp"></a>

```typescript
public readonly instancePublicIp: string;
```

- _Type:_ string

Publicly-routable IP address for this instance.

(May be an empty string if the instance does not have a public IP).

---

##### `osType`<sup>Required</sup> <a name="osType" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.osType"></a>

```typescript
public readonly osType: OperatingSystemType;
```

- _Type:_ aws-cdk-lib.aws_ec2.OperatingSystemType

The type of OS the instance is running.

---

##### `role`<sup>Required</sup> <a name="role" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.role"></a>

```typescript
public readonly role: IRole;
```

- _Type:_ aws-cdk-lib.aws_iam.IRole

The IAM role assumed by the instance.

---

##### `userData`<sup>Required</sup> <a name="userData" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstance.property.userData"></a>

```typescript
public readonly userData: UserData;
```

- _Type:_ aws-cdk-lib.aws_ec2.UserData

UserData for the instance.

---

### DrainFunction <a name="DrainFunction" id="@dmoove/cdk-gitlab-runner.DrainFunction"></a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.DrainFunction.Initializer"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

new DrainFunction(scope: Construct, id: string, props: DrainFunctionProps)
```

| **Name**                                                                                              | **Type**                                                                                    | **Description**   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                           | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                         | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DrainFunction.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainFunction.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                                                                  | **Description**                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.toString">toString</a></code>                                                                     | Returns a string representation of this construct.                                                                                                             |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.applyRemovalPolicy">applyRemovalPolicy</a></code>                                                 | Apply the given removal policy to this resource.                                                                                                               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addEventSource">addEventSource</a></code>                                                         | Adds an event source to this function.                                                                                                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addEventSourceMapping">addEventSourceMapping</a></code>                                           | Adds an event source that maps to this AWS Lambda function.                                                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addFunctionUrl">addFunctionUrl</a></code>                                                         | Adds a url to this lambda function.                                                                                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addPermission">addPermission</a></code>                                                           | Adds a permission to the Lambda resource policy.                                                                                                               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addToRolePolicy">addToRolePolicy</a></code>                                                       | Adds a statement to the IAM role assumed by the instance.                                                                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.configureAsyncInvoke">configureAsyncInvoke</a></code>                                             | Configures options for asynchronous invocation.                                                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.grantInvoke">grantInvoke</a></code>                                                               | Grant the given identity permissions to invoke this Lambda.                                                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.grantInvokeCompositePrincipal">grantInvokeCompositePrincipal</a></code>                           | Grant multiple principals the ability to invoke this Lambda via CompositePrincipal.                                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.grantInvokeUrl">grantInvokeUrl</a></code>                                                         | Grant the given identity permissions to invoke this Lambda Function URL.                                                                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metric">metric</a></code>                                                                         | Return the given named metric for this Function.                                                                                                               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricDuration">metricDuration</a></code>                                                         | How long execution of this Lambda takes.                                                                                                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricErrors">metricErrors</a></code>                                                             | How many invocations of this Lambda fail.                                                                                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricInvocations">metricInvocations</a></code>                                                   | How often this Lambda is invoked.                                                                                                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricThrottles">metricThrottles</a></code>                                                       | How often this Lambda is throttled.                                                                                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addAlias">addAlias</a></code>                                                                     | Defines an alias for this function.                                                                                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addEnvironment">addEnvironment</a></code>                                                         | Adds an environment variable to this Lambda function.                                                                                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.addLayers">addLayers</a></code>                                                                   | Adds one or more Lambda Layers to this Lambda function.                                                                                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.invalidateVersionBasedOn">invalidateVersionBasedOn</a></code>                                     | Mix additional information into the hash of the Version object.                                                                                                |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.DrainFunction.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@dmoove/cdk-gitlab-runner.DrainFunction.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@dmoove/cdk-gitlab-runner.DrainFunction.applyRemovalPolicy.parameter.policy"></a>

- _Type:_ aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the aws-cdk-lib/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:

```
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEventSource.parameter.source"></a>

- _Type:_ aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEventSourceMapping.parameter.id"></a>

- _Type:_ string

---

###### `options`<sup>Required</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEventSourceMapping.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="@dmoove/cdk-gitlab-runner.DrainFunction.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DrainFunction.addFunctionUrl.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="@dmoove/cdk-gitlab-runner.DrainFunction.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainFunction.addPermission.parameter.id"></a>

- _Type:_ string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="@dmoove/cdk-gitlab-runner.DrainFunction.addPermission.parameter.permission"></a>

- _Type:_ aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@dmoove/cdk-gitlab-runner.DrainFunction.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="@dmoove/cdk-gitlab-runner.DrainFunction.addToRolePolicy.parameter.statement"></a>

- _Type:_ aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="@dmoove/cdk-gitlab-runner.DrainFunction.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DrainFunction.configureAsyncInvoke.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="@dmoove/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="@dmoove/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- _Type:_ string

---

##### `grantInvoke` <a name="grantInvoke" id="@dmoove/cdk-gitlab-runner.DrainFunction.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@dmoove/cdk-gitlab-runner.DrainFunction.grantInvoke.parameter.grantee"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeCompositePrincipal` <a name="grantInvokeCompositePrincipal" id="@dmoove/cdk-gitlab-runner.DrainFunction.grantInvokeCompositePrincipal"></a>

```typescript
public grantInvokeCompositePrincipal(compositePrincipal: CompositePrincipal): Grant[]
```

Grant multiple principals the ability to invoke this Lambda via CompositePrincipal.

###### `compositePrincipal`<sup>Required</sup> <a name="compositePrincipal" id="@dmoove/cdk-gitlab-runner.DrainFunction.grantInvokeCompositePrincipal.parameter.compositePrincipal"></a>

- _Type:_ aws-cdk-lib.aws_iam.CompositePrincipal

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="@dmoove/cdk-gitlab-runner.DrainFunction.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@dmoove/cdk-gitlab-runner.DrainFunction.grantInvokeUrl.parameter.grantee"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="@dmoove/cdk-gitlab-runner.DrainFunction.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@dmoove/cdk-gitlab-runner.DrainFunction.metric.parameter.metricName"></a>

- _Type:_ string

---

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metric.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricDuration.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricErrors.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricInvocations.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricThrottles.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="@dmoove/cdk-gitlab-runner.DrainFunction.addAlias"></a>

```typescript
public addAlias(aliasName: string, options?: AliasOptions): Alias
```

Defines an alias for this function.

The alias will automatically be updated to point to the latest version of
the function as it is being updated during a deployment.

```ts
declare const fn: lambda.Function;

fn.addAlias('Live');

// Is equivalent to

new lambda.Alias(this, 'AliasLive', {
  aliasName: 'Live',
  version: fn.currentVersion,
});
```

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="@dmoove/cdk-gitlab-runner.DrainFunction.addAlias.parameter.aliasName"></a>

- _Type:_ string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DrainFunction.addAlias.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEnvironment.parameter.key"></a>

- _Type:_ string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEnvironment.parameter.value"></a>

- _Type:_ string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.DrainFunction.addEnvironment.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="@dmoove/cdk-gitlab-runner.DrainFunction.addLayers"></a>

```typescript
public addLayers(layers: ...ILayerVersion[]): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="@dmoove/cdk-gitlab-runner.DrainFunction.addLayers.parameter.layers"></a>

- _Type:_ ...aws-cdk-lib.aws_lambda.ILayerVersion[]

the layers to be added.

---

##### `invalidateVersionBasedOn` <a name="invalidateVersionBasedOn" id="@dmoove/cdk-gitlab-runner.DrainFunction.invalidateVersionBasedOn"></a>

```typescript
public invalidateVersionBasedOn(x: string): void
```

Mix additional information into the hash of the Version object.

The Lambda Function construct does its best to automatically create a new
Version when anything about the Function changes (its code, its layers,
any of the other properties).

However, you can sometimes source information from places that the CDK cannot
look into, like the deploy-time values of SSM parameters. In those cases,
the CDK would not force the creation of a new Version object when it actually
should.

This method can be used to invalidate the current Version object. Pass in
any string into this method, and make sure the string changes when you know
a new Version needs to be created.

This method may be called more than once.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.DrainFunction.invalidateVersionBasedOn.parameter.x"></a>

- _Type:_ string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                                                                            | **Description**                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.isConstruct">isConstruct</a></code>                                                         | Checks if `x` is a construct.                                                                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.isOwnedResource">isOwnedResource</a></code>                                                 | Returns true if the construct was created by CDK, and false otherwise.                                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.isResource">isResource</a></code>                                                           | Check whether the given construct is a Resource.                                                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.classifyVersionProperty">classifyVersionProperty</a></code>                                 | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionArn">fromFunctionArn</a></code>                                                 | Import a lambda function into the CDK using its ARN.                                                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes">fromFunctionAttributes</a></code>                                   | Creates a Lambda function object which represents a function not defined within this stack.                                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionName">fromFunctionName</a></code>                                               | Import a lambda function into the CDK using its name.                                                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAll">metricAll</a></code>                                                             | Return the given named metric for this Lambda.                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code>                     | Metric for the number of concurrent executions across all Lambdas.                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAllDuration">metricAllDuration</a></code>                                             | Metric for the Duration executing all Lambdas.                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAllErrors">metricAllErrors</a></code>                                                 | Metric for the number of Errors executing all Lambdas.                                                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAllInvocations">metricAllInvocations</a></code>                                       | Metric for the number of invocations of all Lambdas.                                                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAllThrottles">metricAllThrottles</a></code>                                           | Metric for the number of throttled invocations of all Lambdas.                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas.                                                 |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.DrainFunction.isConstruct"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.DrainFunction.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@dmoove/cdk-gitlab-runner.DrainFunction.isOwnedResource"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.DrainFunction.isOwnedResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@dmoove/cdk-gitlab-runner.DrainFunction.isResource"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.DrainFunction.isResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="@dmoove/cdk-gitlab-runner.DrainFunction.classifyVersionProperty"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="@dmoove/cdk-gitlab-runner.DrainFunction.classifyVersionProperty.parameter.propertyName"></a>

- _Type:_ string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="@dmoove/cdk-gitlab-runner.DrainFunction.classifyVersionProperty.parameter.locked"></a>

- _Type:_ boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionArn"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

For `Function.addPermissions()` to work on this imported lambda, make sure that is
in the same account and region as the stack you are importing it into.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionArn.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionArn.parameter.id"></a>

- _Type:_ string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionArn.parameter.functionArn"></a>

- _Type:_ string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

For `Function.addPermissions()` to work on this imported lambda, set the sameEnvironment property to true
if this imported lambda is in the same account and region as the stack you are importing it into.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes.parameter.scope"></a>

- _Type:_ constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes.parameter.id"></a>

- _Type:_ string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes.parameter.attrs"></a>

- _Type:_ aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionName"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionName.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionName.parameter.id"></a>

- _Type:_ string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="@dmoove/cdk-gitlab-runner.DrainFunction.fromFunctionName.parameter.functionName"></a>

- _Type:_ string

---

##### `metricAll` <a name="metricAll" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAll"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAll.parameter.metricName"></a>

- _Type:_ string

---

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAll.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllConcurrentExecutions"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllConcurrentExecutions.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllDuration"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllDuration.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllErrors"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllErrors.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllInvocations"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllInvocations.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllThrottles"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllThrottles.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { DrainFunction } from '@dmoove/cdk-gitlab-runner'

DrainFunction.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainFunction.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- _Type:_ aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                           | **Type**                                         | **Description**                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.node">node</a></code>                                             | <code>constructs.Node</code>                     | The tree node.                                                                                                                                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.env">env</a></code>                                               | <code>aws-cdk-lib.ResourceEnvironment</code>     | The environment this resource belongs to.                                                                                                                               |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.stack">stack</a></code>                                           | <code>aws-cdk-lib.Stack</code>                   | The stack in which this resource is defined.                                                                                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.architecture">architecture</a></code>                             | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).                                                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.connections">connections</a></code>                               | <code>aws-cdk-lib.aws_ec2.Connections</code>     | Access the Connections object.                                                                                                                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.functionArn">functionArn</a></code>                               | <code>string</code>                              | ARN of this function.                                                                                                                                                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.functionName">functionName</a></code>                             | <code>string</code>                              | Name of this function.                                                                                                                                                  |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.grantPrincipal">grantPrincipal</a></code>                         | <code>aws-cdk-lib.aws_iam.IPrincipal</code>      | The principal this Lambda Function is running as.                                                                                                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.isBoundToVpc">isBoundToVpc</a></code>                             | <code>boolean</code>                             | Whether or not this Lambda function was bound to a VPC.                                                                                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.latestVersion">latestVersion</a></code>                           | <code>aws-cdk-lib.aws_lambda.IVersion</code>     | The `$LATEST` version of this function.                                                                                                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.permissionsNode">permissionsNode</a></code>                       | <code>constructs.Node</code>                     | The construct node where permissions are attached.                                                                                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code>                            | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.role">role</a></code>                                             | <code>aws-cdk-lib.aws_iam.IRole</code>           | Execution role associated with this function.                                                                                                                           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.currentVersion">currentVersion</a></code>                         | <code>aws-cdk-lib.aws_lambda.Version</code>      | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.logGroup">logGroup</a></code>                                     | <code>aws-cdk-lib.aws_logs.ILogGroup</code>      | The LogGroup where the Lambda function's logs are made available.                                                                                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.runtime">runtime</a></code>                                       | <code>aws-cdk-lib.aws_lambda.Runtime</code>      | The runtime configured for this lambda.                                                                                                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.deadLetterQueue">deadLetterQueue</a></code>                       | <code>aws-cdk-lib.aws_sqs.IQueue</code>          | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.deadLetterTopic">deadLetterTopic</a></code>                       | <code>aws-cdk-lib.aws_sns.ITopic</code>          | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction.property.timeout">timeout</a></code>                                       | <code>aws-cdk-lib.Duration</code>                | The timeout configured for this lambda.                                                                                                                                 |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- _Type:_ aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- _Type:_ aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- _Type:_ aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- _Type:_ aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- _Type:_ string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- _Type:_ string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- _Type:_ aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- _Type:_ boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- _Type:_ aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- _Type:_ constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- _Type:_ string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.role"></a>

```typescript
public readonly role: IRole;
```

- _Type:_ aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- _Type:_ aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- _Type:_ aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- _Type:_ aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- _Type:_ aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- _Type:_ aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@dmoove/cdk-gitlab-runner.DrainFunction.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- _Type:_ aws-cdk-lib.Duration

The timeout configured for this lambda.

---

### DrainStateMachine <a name="DrainStateMachine" id="@dmoove/cdk-gitlab-runner.DrainStateMachine"></a>

- _Implements:_ <a href="#@dmoove/cdk-gitlab-runner.IDrainStateMachine">IDrainStateMachine</a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer"></a>

```typescript
import { DrainStateMachine } from '@dmoove/cdk-gitlab-runner'

new DrainStateMachine(scope: Construct, id: string, props: DrainStateMachineProps)
```

| **Name**                                                                                                  | **Type**                                                                                            | **Description**   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                                   | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                                 | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachineProps">DrainStateMachineProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DrainStateMachineProps">DrainStateMachineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                  | **Description**                                    |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                        | **Description**               |
| ----------------------------------------------------------------------------------------------- | ----------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.isConstruct"></a>

```typescript
import { DrainStateMachine } from '@dmoove/cdk-gitlab-runner'

DrainStateMachine.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                     | **Type**                                                                          | **Description**   |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.property.node">node</a></code>                   | <code>constructs.Node</code>                                                      | The tree node.    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.property.drainFunction">drainFunction</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction">DrainFunction</a></code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine.property.stateMachine">stateMachine</a></code>   | <code>aws-cdk-lib.aws_stepfunctions.IStateMachine</code>                          | _No description._ |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `drainFunction`<sup>Required</sup> <a name="drainFunction" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.property.drainFunction"></a>

```typescript
public readonly drainFunction: DrainFunction;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DrainFunction">DrainFunction</a>

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="@dmoove/cdk-gitlab-runner.DrainStateMachine.property.stateMachine"></a>

```typescript
public readonly stateMachine: IStateMachine;
```

- _Type:_ aws-cdk-lib.aws_stepfunctions.IStateMachine

---

### GitLabCacheBucket <a name="GitLabCacheBucket" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket"></a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

new GitLabCacheBucket(scope: Construct, id: string, props: GitLabCacheBucketProps)
```

| **Name**                                                                                                  | **Type**                                                                                            | **Description**   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                                   | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                                 | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps">GitLabCacheBucketProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps">GitLabCacheBucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                                                  | **Description**                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.toString">toString</a></code>                                                 | Returns a string representation of this construct.                                                                                                                                                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.applyRemovalPolicy">applyRemovalPolicy</a></code>                             | Apply the given removal policy to this resource.                                                                                                                                                                                |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addEventNotification">addEventNotification</a></code>                         | Adds a bucket notification event destination.                                                                                                                                                                                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectCreatedNotification">addObjectCreatedNotification</a></code>         | Subscribes a destination to receive notifications when an object is created in the bucket.                                                                                                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectRemovedNotification">addObjectRemovedNotification</a></code>         | Subscribes a destination to receive notifications when an object is removed from the bucket.                                                                                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addToResourcePolicy">addToResourcePolicy</a></code>                           | Adds a statement to the resource policy for a principal (i.e. account/role/service) to perform actions on this bucket and/or its contents. Use `bucketArn` and `arnForObjects(keys)` to obtain ARNs for this bucket or objects. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.arnForObjects">arnForObjects</a></code>                                       | Returns an ARN that represents all objects within the bucket that match the key pattern specified.                                                                                                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.enableEventBridgeNotification">enableEventBridgeNotification</a></code>       | Enables event bridge notification, causing all events below to be sent to EventBridge:.                                                                                                                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantDelete">grantDelete</a></code>                                           | Grants s3:DeleteObject\* permission to an IAM principal for objects in this bucket.                                                                                                                                             |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPublicAccess">grantPublicAccess</a></code>                               | Allows unrestricted access to objects from this bucket.                                                                                                                                                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPut">grantPut</a></code>                                                 | Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal.                                                                                                                                             |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPutAcl">grantPutAcl</a></code>                                           | Grant the given IAM identity permissions to modify the ACLs of objects in the given Bucket.                                                                                                                                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantRead">grantRead</a></code>                                               | Grant read permissions for this bucket and it's contents to an IAM principal (Role/Group/User).                                                                                                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite">grantReadWrite</a></code>                                     | Grants read/write permissions for this bucket and it's contents to an IAM principal (Role/Group/User).                                                                                                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantWrite">grantWrite</a></code>                                             | Grant write permissions to this bucket to an IAM principal.                                                                                                                                                                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailEvent">onCloudTrailEvent</a></code>                               | Define a CloudWatch event that triggers when something happens to this repository.                                                                                                                                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailPutObject">onCloudTrailPutObject</a></code>                       | Defines an AWS CloudWatch event that triggers when an object is uploaded to the specified paths (keys) in this bucket using the PutObject API call.                                                                             |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailWriteObject">onCloudTrailWriteObject</a></code>                   | Defines an AWS CloudWatch event that triggers when an object at the specified paths (keys) in this bucket are written to.                                                                                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.s3UrlForObject">s3UrlForObject</a></code>                                     | The S3 URL of an S3 object. For example:.                                                                                                                                                                                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.transferAccelerationUrlForObject">transferAccelerationUrlForObject</a></code> | The https Transfer Acceleration URL of an S3 object.                                                                                                                                                                            |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.urlForObject">urlForObject</a></code>                                         | The https URL of an S3 object. Specify `regional: false` at the options for non-regional URLs. For example:.                                                                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.virtualHostedUrlForObject">virtualHostedUrlForObject</a></code>               | The virtual hosted-style URL of an S3 object. Specify `regional: false` at the options for non-regional URL. For example:.                                                                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addCorsRule">addCorsRule</a></code>                                           | Adds a cross-origin access configuration for objects in an Amazon S3 bucket.                                                                                                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addInventory">addInventory</a></code>                                         | Add an inventory configuration.                                                                                                                                                                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addLifecycleRule">addLifecycleRule</a></code>                                 | Add a lifecycle rule to the bucket.                                                                                                                                                                                             |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addMetric">addMetric</a></code>                                               | Adds a metrics configuration for the CloudWatch request metrics from the bucket.                                                                                                                                                |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.applyRemovalPolicy.parameter.policy"></a>

- _Type:_ aws-cdk-lib.RemovalPolicy

---

##### `addEventNotification` <a name="addEventNotification" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addEventNotification"></a>

```typescript
public addEventNotification(event: EventType, dest: IBucketNotificationDestination, filters: ...NotificationKeyFilter[]): void
```

Adds a bucket notification event destination.

> [https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html)

_Example_

```typescript
declare const myLambda: lambda.Function;
const bucket = new s3.Bucket(this, 'MyBucket');
bucket.addEventNotification(
  s3.EventType.OBJECT_CREATED,
  new s3n.LambdaDestination(myLambda),
  { prefix: 'home/myusername/*' },
);
```

###### `event`<sup>Required</sup> <a name="event" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addEventNotification.parameter.event"></a>

- _Type:_ aws-cdk-lib.aws_s3.EventType

The event to trigger the notification.

---

###### `dest`<sup>Required</sup> <a name="dest" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addEventNotification.parameter.dest"></a>

- _Type:_ aws-cdk-lib.aws_s3.IBucketNotificationDestination

The notification destination (Lambda, SNS Topic or SQS Queue).

---

###### `filters`<sup>Required</sup> <a name="filters" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addEventNotification.parameter.filters"></a>

- _Type:_ ...aws-cdk-lib.aws_s3.NotificationKeyFilter[]

S3 object key filter rules to determine which objects trigger this event.

Each filter must include a `prefix` and/or `suffix`
that will be matched against the s3 object key. Refer to the S3 Developer Guide
for details about allowed filter rules.

---

##### `addObjectCreatedNotification` <a name="addObjectCreatedNotification" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectCreatedNotification"></a>

```typescript
public addObjectCreatedNotification(dest: IBucketNotificationDestination, filters: ...NotificationKeyFilter[]): void
```

Subscribes a destination to receive notifications when an object is created in the bucket.

This is identical to calling
`onEvent(EventType.OBJECT_CREATED)`.

###### `dest`<sup>Required</sup> <a name="dest" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectCreatedNotification.parameter.dest"></a>

- _Type:_ aws-cdk-lib.aws_s3.IBucketNotificationDestination

The notification destination (see onEvent).

---

###### `filters`<sup>Required</sup> <a name="filters" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectCreatedNotification.parameter.filters"></a>

- _Type:_ ...aws-cdk-lib.aws_s3.NotificationKeyFilter[]

Filters (see onEvent).

---

##### `addObjectRemovedNotification` <a name="addObjectRemovedNotification" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectRemovedNotification"></a>

```typescript
public addObjectRemovedNotification(dest: IBucketNotificationDestination, filters: ...NotificationKeyFilter[]): void
```

Subscribes a destination to receive notifications when an object is removed from the bucket.

This is identical to calling
`onEvent(EventType.OBJECT_REMOVED)`.

###### `dest`<sup>Required</sup> <a name="dest" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectRemovedNotification.parameter.dest"></a>

- _Type:_ aws-cdk-lib.aws_s3.IBucketNotificationDestination

The notification destination (see onEvent).

---

###### `filters`<sup>Required</sup> <a name="filters" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addObjectRemovedNotification.parameter.filters"></a>

- _Type:_ ...aws-cdk-lib.aws_s3.NotificationKeyFilter[]

Filters (see onEvent).

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(permission: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the resource policy for a principal (i.e. account/role/service) to perform actions on this bucket and/or its contents. Use `bucketArn` and `arnForObjects(keys)` to obtain ARNs for this bucket or objects.

Note that the policy statement may or may not be added to the policy.
For example, when an `IBucket` is created from an existing bucket,
it's not possible to tell whether the bucket already has a policy
attached, let alone to re-use that policy to add more statements to it.
So it's safest to do nothing in these cases.

###### `permission`<sup>Required</sup> <a name="permission" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addToResourcePolicy.parameter.permission"></a>

- _Type:_ aws-cdk-lib.aws_iam.PolicyStatement

the policy statement to be added to the bucket's policy.

---

##### `arnForObjects` <a name="arnForObjects" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.arnForObjects"></a>

```typescript
public arnForObjects(keyPattern: string): string
```

Returns an ARN that represents all objects within the bucket that match the key pattern specified.

To represent all keys, specify `"*"`.

If you need to specify a keyPattern with multiple components, concatenate them into a single string, e.g.:

arnForObjects(`home/${team}/${user}/*`)

###### `keyPattern`<sup>Required</sup> <a name="keyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.arnForObjects.parameter.keyPattern"></a>

- _Type:_ string

---

##### `enableEventBridgeNotification` <a name="enableEventBridgeNotification" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.enableEventBridgeNotification"></a>

```typescript
public enableEventBridgeNotification(): void
```

Enables event bridge notification, causing all events below to be sent to EventBridge:.

Object Deleted (DeleteObject)

- Object Deleted (Lifecycle expiration)
- Object Restore Initiated
- Object Restore Completed
- Object Restore Expired
- Object Storage Class Changed
- Object Access Tier Changed
- Object ACL Updated
- Object Tags Added
- Object Tags Deleted

##### `grantDelete` <a name="grantDelete" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantDelete"></a>

```typescript
public grantDelete(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grants s3:DeleteObject\* permission to an IAM principal for objects in this bucket.

###### `identity`<sup>Required</sup> <a name="identity" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantDelete.parameter.identity"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

The principal.

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantDelete.parameter.objectsKeyPattern"></a>

- _Type:_ any

Restrict the permission to a certain key pattern (default '\*').

Parameter type is `any` but `string` should be passed in.

---

##### `grantPublicAccess` <a name="grantPublicAccess" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPublicAccess"></a>

```typescript
public grantPublicAccess(allowedActions: ...string[], keyPrefix?: string): Grant
```

Allows unrestricted access to objects from this bucket.

IMPORTANT: This permission allows anyone to perform actions on S3 objects
in this bucket, which is useful for when you configure your bucket as a
website and want everyone to be able to read objects in the bucket without
needing to authenticate.

Without arguments, this method will grant read ("s3:GetObject") access to
all objects ("\*") in the bucket.

The method returns the `iam.Grant` object, which can then be modified
as needed. For example, you can add a condition that will restrict access only
to an IPv4 range like this:

    const grant = bucket.grantPublicAccess();
    grant.resourceStatement!.addCondition(‘IpAddress’, { “aws:SourceIp”: “54.240.143.0/24” });

Note that if this `IBucket` refers to an existing bucket, possibly not
managed by CloudFormation, this method will have no effect, since it's
impossible to modify the policy of an existing bucket.

###### `allowedActions`<sup>Required</sup> <a name="allowedActions" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPublicAccess.parameter.allowedActions"></a>

- _Type:_ ...string[]

the set of S3 actions to allow.

Default is "s3:GetObject".

---

###### `keyPrefix`<sup>Optional</sup> <a name="keyPrefix" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPublicAccess.parameter.keyPrefix"></a>

- _Type:_ string

the prefix of S3 object keys (e.g. `home/*`). Default is "\*".

---

##### `grantPut` <a name="grantPut" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPut"></a>

```typescript
public grantPut(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal.

If encryption is used, permission to use the key to encrypt the contents
of written files will also be granted to the same principal.

###### `identity`<sup>Required</sup> <a name="identity" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPut.parameter.identity"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

The principal.

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPut.parameter.objectsKeyPattern"></a>

- _Type:_ any

Restrict the permission to a certain key pattern (default '\*').

Parameter type is `any` but `string` should be passed in.

---

##### `grantPutAcl` <a name="grantPutAcl" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPutAcl"></a>

```typescript
public grantPutAcl(identity: IGrantable, objectsKeyPattern?: string): Grant
```

Grant the given IAM identity permissions to modify the ACLs of objects in the given Bucket.

If your application has the '@aws-cdk/aws-s3:grantWriteWithoutAcl' feature flag set,
calling `grantWrite` or `grantReadWrite` no longer grants permissions to modify the ACLs of the objects;
in this case, if you need to modify object ACLs, call this method explicitly.

###### `identity`<sup>Required</sup> <a name="identity" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPutAcl.parameter.identity"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantPutAcl.parameter.objectsKeyPattern"></a>

- _Type:_ string

---

##### `grantRead` <a name="grantRead" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantRead"></a>

```typescript
public grantRead(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grant read permissions for this bucket and it's contents to an IAM principal (Role/Group/User).

If encryption is used, permission to use the key to decrypt the contents
of the bucket will also be granted to the same principal.

###### `identity`<sup>Required</sup> <a name="identity" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantRead.parameter.identity"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

The principal.

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantRead.parameter.objectsKeyPattern"></a>

- _Type:_ any

Restrict the permission to a certain key pattern (default '\*').

Parameter type is `any` but `string` should be passed in.

---

##### `grantReadWrite` <a name="grantReadWrite" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite"></a>

```typescript
public grantReadWrite(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grants read/write permissions for this bucket and it's contents to an IAM principal (Role/Group/User).

If an encryption key is used, permission to use the key for
encrypt/decrypt will also be granted.

Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
which could be used to grant read/write object access to IAM principals in other accounts.
If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
in the `context` key of your cdk.json file.
If you've already updated, but still need the principal to have permissions to modify the ACLs,
use the `grantPutAcl` method.

###### `identity`<sup>Required</sup> <a name="identity" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite.parameter.identity"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite.parameter.objectsKeyPattern"></a>

- _Type:_ any

---

##### `grantWrite` <a name="grantWrite" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantWrite"></a>

```typescript
public grantWrite(identity: IGrantable, objectsKeyPattern?: any, allowedActionPatterns?: string[]): Grant
```

Grant write permissions to this bucket to an IAM principal.

If encryption is used, permission to use the key to encrypt the contents
of written files will also be granted to the same principal.

Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
which could be used to grant read/write object access to IAM principals in other accounts.
If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
in the `context` key of your cdk.json file.
If you've already updated, but still need the principal to have permissions to modify the ACLs,
use the `grantPutAcl` method.

###### `identity`<sup>Required</sup> <a name="identity" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantWrite.parameter.identity"></a>

- _Type:_ aws-cdk-lib.aws_iam.IGrantable

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantWrite.parameter.objectsKeyPattern"></a>

- _Type:_ any

---

###### `allowedActionPatterns`<sup>Optional</sup> <a name="allowedActionPatterns" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.grantWrite.parameter.allowedActionPatterns"></a>

- _Type:_ string[]

---

##### `onCloudTrailEvent` <a name="onCloudTrailEvent" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailEvent"></a>

```typescript
public onCloudTrailEvent(id: string, options?: OnCloudTrailBucketEventOptions): Rule
```

Define a CloudWatch event that triggers when something happens to this repository.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailEvent.parameter.id"></a>

- _Type:_ string

The id of the rule.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailEvent.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_s3.OnCloudTrailBucketEventOptions

Options for adding the rule.

---

##### `onCloudTrailPutObject` <a name="onCloudTrailPutObject" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailPutObject"></a>

```typescript
public onCloudTrailPutObject(id: string, options?: OnCloudTrailBucketEventOptions): Rule
```

Defines an AWS CloudWatch event that triggers when an object is uploaded to the specified paths (keys) in this bucket using the PutObject API call.

Note that some tools like `aws s3 cp` will automatically use either
PutObject or the multipart upload API depending on the file size,
so using `onCloudTrailWriteObject` may be preferable.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailPutObject.parameter.id"></a>

- _Type:_ string

The id of the rule.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailPutObject.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_s3.OnCloudTrailBucketEventOptions

Options for adding the rule.

---

##### `onCloudTrailWriteObject` <a name="onCloudTrailWriteObject" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailWriteObject"></a>

```typescript
public onCloudTrailWriteObject(id: string, options?: OnCloudTrailBucketEventOptions): Rule
```

Defines an AWS CloudWatch event that triggers when an object at the specified paths (keys) in this bucket are written to.

This includes
the events PutObject, CopyObject, and CompleteMultipartUpload.

Note that some tools like `aws s3 cp` will automatically use either
PutObject or the multipart upload API depending on the file size,
so using this method may be preferable to `onCloudTrailPutObject`.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailWriteObject.parameter.id"></a>

- _Type:_ string

The id of the rule.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.onCloudTrailWriteObject.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_s3.OnCloudTrailBucketEventOptions

Options for adding the rule.

---

##### `s3UrlForObject` <a name="s3UrlForObject" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.s3UrlForObject"></a>

```typescript
public s3UrlForObject(key?: string): string
```

The S3 URL of an S3 object. For example:.

`s3://onlybucket`

- `s3://bucket/key`

###### `key`<sup>Optional</sup> <a name="key" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.s3UrlForObject.parameter.key"></a>

- _Type:_ string

The S3 key of the object.

If not specified, the S3 URL of the
bucket is returned.

---

##### `transferAccelerationUrlForObject` <a name="transferAccelerationUrlForObject" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.transferAccelerationUrlForObject"></a>

```typescript
public transferAccelerationUrlForObject(key?: string, options?: TransferAccelerationUrlOptions): string
```

The https Transfer Acceleration URL of an S3 object.

Specify `dualStack: true` at the options
for dual-stack endpoint (connect to the bucket over IPv6). For example:

- `https://bucket.s3-accelerate.amazonaws.com`
- `https://bucket.s3-accelerate.amazonaws.com/key`

###### `key`<sup>Optional</sup> <a name="key" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.transferAccelerationUrlForObject.parameter.key"></a>

- _Type:_ string

The S3 key of the object.

If not specified, the URL of the
bucket is returned.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.transferAccelerationUrlForObject.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_s3.TransferAccelerationUrlOptions

Options for generating URL.

---

##### `urlForObject` <a name="urlForObject" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.urlForObject"></a>

```typescript
public urlForObject(key?: string): string
```

The https URL of an S3 object. Specify `regional: false` at the options for non-regional URLs. For example:.

`https://s3.us-west-1.amazonaws.com/onlybucket`

- `https://s3.us-west-1.amazonaws.com/bucket/key`
- `https://s3.cn-north-1.amazonaws.com.cn/china-bucket/mykey`

###### `key`<sup>Optional</sup> <a name="key" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.urlForObject.parameter.key"></a>

- _Type:_ string

The S3 key of the object.

If not specified, the URL of the
bucket is returned.

---

##### `virtualHostedUrlForObject` <a name="virtualHostedUrlForObject" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.virtualHostedUrlForObject"></a>

```typescript
public virtualHostedUrlForObject(key?: string, options?: VirtualHostedStyleUrlOptions): string
```

The virtual hosted-style URL of an S3 object. Specify `regional: false` at the options for non-regional URL. For example:.

`https://only-bucket.s3.us-west-1.amazonaws.com`

- `https://bucket.s3.us-west-1.amazonaws.com/key`
- `https://bucket.s3.amazonaws.com/key`
- `https://china-bucket.s3.cn-north-1.amazonaws.com.cn/mykey`

###### `key`<sup>Optional</sup> <a name="key" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.virtualHostedUrlForObject.parameter.key"></a>

- _Type:_ string

The S3 key of the object.

If not specified, the URL of the
bucket is returned.

---

###### `options`<sup>Optional</sup> <a name="options" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.virtualHostedUrlForObject.parameter.options"></a>

- _Type:_ aws-cdk-lib.aws_s3.VirtualHostedStyleUrlOptions

Options for generating URL.

---

##### `addCorsRule` <a name="addCorsRule" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addCorsRule"></a>

```typescript
public addCorsRule(rule: CorsRule): void
```

Adds a cross-origin access configuration for objects in an Amazon S3 bucket.

###### `rule`<sup>Required</sup> <a name="rule" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addCorsRule.parameter.rule"></a>

- _Type:_ aws-cdk-lib.aws_s3.CorsRule

The CORS configuration rule to add.

---

##### `addInventory` <a name="addInventory" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addInventory"></a>

```typescript
public addInventory(inventory: Inventory): void
```

Add an inventory configuration.

###### `inventory`<sup>Required</sup> <a name="inventory" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addInventory.parameter.inventory"></a>

- _Type:_ aws-cdk-lib.aws_s3.Inventory

configuration to add.

---

##### `addLifecycleRule` <a name="addLifecycleRule" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addLifecycleRule"></a>

```typescript
public addLifecycleRule(rule: LifecycleRule): void
```

Add a lifecycle rule to the bucket.

###### `rule`<sup>Required</sup> <a name="rule" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addLifecycleRule.parameter.rule"></a>

- _Type:_ aws-cdk-lib.aws_s3.LifecycleRule

The rule to add.

---

##### `addMetric` <a name="addMetric" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addMetric"></a>

```typescript
public addMetric(metric: BucketMetrics): void
```

Adds a metrics configuration for the CloudWatch request metrics from the bucket.

###### `metric`<sup>Required</sup> <a name="metric" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.addMetric.parameter.metric"></a>

- _Type:_ aws-cdk-lib.aws_s3.BucketMetrics

The metric configuration to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                                          | **Description**                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isConstruct">isConstruct</a></code>                   | Checks if `x` is a construct.                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isOwnedResource">isOwnedResource</a></code>           | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isResource">isResource</a></code>                     | Check whether the given construct is a Resource.                       |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketArn">fromBucketArn</a></code>               | _No description._                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketAttributes">fromBucketAttributes</a></code> | Creates a Bucket construct that represents an external bucket.         |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketName">fromBucketName</a></code>             | _No description._                                                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromCfnBucket">fromCfnBucket</a></code>               | Create a mutable `IBucket` based on a low-level `CfnBucket`.           |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.validateBucketName">validateBucketName</a></code>     | Thrown an exception if the given bucket name is not valid.             |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isConstruct"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isOwnedResource"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isOwnedResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isResource"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.isResource.parameter.construct"></a>

- _Type:_ constructs.IConstruct

---

##### `fromBucketArn` <a name="fromBucketArn" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketArn"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.fromBucketArn(scope: Construct, id: string, bucketArn: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketArn.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketArn.parameter.id"></a>

- _Type:_ string

---

###### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketArn.parameter.bucketArn"></a>

- _Type:_ string

---

##### `fromBucketAttributes` <a name="fromBucketAttributes" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketAttributes"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.fromBucketAttributes(scope: Construct, id: string, attrs: BucketAttributes)
```

Creates a Bucket construct that represents an external bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketAttributes.parameter.scope"></a>

- _Type:_ constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketAttributes.parameter.id"></a>

- _Type:_ string

The construct's name.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketAttributes.parameter.attrs"></a>

- _Type:_ aws-cdk-lib.aws_s3.BucketAttributes

A `BucketAttributes` object.

Can be obtained from a call to
`bucket.export()` or manually created.

---

##### `fromBucketName` <a name="fromBucketName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketName"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.fromBucketName(scope: Construct, id: string, bucketName: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketName.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketName.parameter.id"></a>

- _Type:_ string

---

###### `bucketName`<sup>Required</sup> <a name="bucketName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromBucketName.parameter.bucketName"></a>

- _Type:_ string

---

##### `fromCfnBucket` <a name="fromCfnBucket" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromCfnBucket"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.fromCfnBucket(cfnBucket: CfnBucket)
```

Create a mutable `IBucket` based on a low-level `CfnBucket`.

###### `cfnBucket`<sup>Required</sup> <a name="cfnBucket" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.fromCfnBucket.parameter.cfnBucket"></a>

- _Type:_ aws-cdk-lib.aws_s3.CfnBucket

---

##### `validateBucketName` <a name="validateBucketName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.validateBucketName"></a>

```typescript
import { GitLabCacheBucket } from '@dmoove/cdk-gitlab-runner'

GitLabCacheBucket.validateBucketName(physicalName: string)
```

Thrown an exception if the given bucket name is not valid.

###### `physicalName`<sup>Required</sup> <a name="physicalName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.validateBucketName.parameter.physicalName"></a>

- _Type:_ string

name of the bucket.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                             | **Type**                                     | **Description**                                                |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.node">node</a></code>                                           | <code>constructs.Node</code>                 | The tree node.                                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.env">env</a></code>                                             | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to.                      |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.stack">stack</a></code>                                         | <code>aws-cdk-lib.Stack</code>               | The stack in which this resource is defined.                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketArn">bucketArn</a></code>                                 | <code>string</code>                          | The ARN of the bucket.                                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketDomainName">bucketDomainName</a></code>                   | <code>string</code>                          | The IPv4 DNS name of the specified bucket.                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketDualStackDomainName">bucketDualStackDomainName</a></code> | <code>string</code>                          | The IPv6 DNS name of the specified bucket.                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketName">bucketName</a></code>                               | <code>string</code>                          | The name of the bucket.                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketRegionalDomainName">bucketRegionalDomainName</a></code>   | <code>string</code>                          | The regional domain name of the specified bucket.              |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketWebsiteDomainName">bucketWebsiteDomainName</a></code>     | <code>string</code>                          | The Domain name of the static website.                         |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketWebsiteUrl">bucketWebsiteUrl</a></code>                   | <code>string</code>                          | The URL of the static website.                                 |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.encryptionKey">encryptionKey</a></code>                         | <code>aws-cdk-lib.aws_kms.IKey</code>        | Optional KMS encryption key associated with this bucket.       |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.isWebsite">isWebsite</a></code>                                 | <code>boolean</code>                         | If this bucket has been configured for static website hosting. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.policy">policy</a></code>                                       | <code>aws-cdk-lib.aws_s3.BucketPolicy</code> | The resource policy associated with this bucket.               |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- _Type:_ aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- _Type:_ aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- _Type:_ string

The ARN of the bucket.

---

##### `bucketDomainName`<sup>Required</sup> <a name="bucketDomainName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketDomainName"></a>

```typescript
public readonly bucketDomainName: string;
```

- _Type:_ string

The IPv4 DNS name of the specified bucket.

---

##### `bucketDualStackDomainName`<sup>Required</sup> <a name="bucketDualStackDomainName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketDualStackDomainName"></a>

```typescript
public readonly bucketDualStackDomainName: string;
```

- _Type:_ string

The IPv6 DNS name of the specified bucket.

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- _Type:_ string

The name of the bucket.

---

##### `bucketRegionalDomainName`<sup>Required</sup> <a name="bucketRegionalDomainName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketRegionalDomainName"></a>

```typescript
public readonly bucketRegionalDomainName: string;
```

- _Type:_ string

The regional domain name of the specified bucket.

---

##### `bucketWebsiteDomainName`<sup>Required</sup> <a name="bucketWebsiteDomainName" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketWebsiteDomainName"></a>

```typescript
public readonly bucketWebsiteDomainName: string;
```

- _Type:_ string

The Domain name of the static website.

---

##### `bucketWebsiteUrl`<sup>Required</sup> <a name="bucketWebsiteUrl" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.bucketWebsiteUrl"></a>

```typescript
public readonly bucketWebsiteUrl: string;
```

- _Type:_ string

The URL of the static website.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- _Type:_ aws-cdk-lib.aws_kms.IKey

Optional KMS encryption key associated with this bucket.

---

##### `isWebsite`<sup>Optional</sup> <a name="isWebsite" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.isWebsite"></a>

```typescript
public readonly isWebsite: boolean;
```

- _Type:_ boolean

If this bucket has been configured for static website hosting.

---

##### `policy`<sup>Optional</sup> <a name="policy" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucket.property.policy"></a>

```typescript
public readonly policy: BucketPolicy;
```

- _Type:_ aws-cdk-lib.aws_s3.BucketPolicy

The resource policy associated with this bucket.

If `autoCreatePolicy` is true, a `BucketPolicy` will be created upon the
first call to addToResourcePolicy(s).

---

### GitLabRunner <a name="GitLabRunner" id="@dmoove/cdk-gitlab-runner.GitLabRunner"></a>

- _Implements:_ <a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner">IGitLabRunner</a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer"></a>

```typescript
import { GitLabRunner } from '@dmoove/cdk-gitlab-runner'

new GitLabRunner(scope: Construct, id: string, props: GitLabRunnerProps)
```

| **Name**                                                                                             | **Type**                                                                                  | **Description**   |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                         | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                       | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunnerProps">GitLabRunnerProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabRunnerProps">GitLabRunnerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                               | **Description**                                            |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.toString">toString</a></code>                   | Returns a string representation of this construct.         |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.addDockerExecutor">addDockerExecutor</a></code> | Adds a Docker executor to the GitLab Runner configuration. |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.GitLabRunner.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDockerExecutor` <a name="addDockerExecutor" id="@dmoove/cdk-gitlab-runner.GitLabRunner.addDockerExecutor"></a>

```typescript
public addDockerExecutor(executorType: DockerExecutorType, props: DockerExecutorAttributes): void
```

Adds a Docker executor to the GitLab Runner configuration.

###### `executorType`<sup>Required</sup> <a name="executorType" id="@dmoove/cdk-gitlab-runner.GitLabRunner.addDockerExecutor.parameter.executorType"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a>

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.GitLabRunner.addDockerExecutor.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes">DockerExecutorAttributes</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                   | **Description**               |
| ------------------------------------------------------------------------------------------ | ----------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.GitLabRunner.isConstruct"></a>

```typescript
import { GitLabRunner } from '@dmoove/cdk-gitlab-runner'

GitLabRunner.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.GitLabRunner.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                | **Type**                                                                        | **Description**                                                                                    |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.property.node">node</a></code>                   | <code>constructs.Node</code>                                                    | The tree node.                                                                                     |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code>                                            | The AWS KMS key used for encrypting stored data by the GitLab Runner.                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.property.gitlabUrl">gitlabUrl</a></code>         | <code>string</code>                                                             | The URL of the gitlab instance.                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.property.glConfig">glConfig</a></code>           | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | Configuration details for the GitLab Runner, including job concurrency and authentication details. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunner.property.tokenSecret">tokenSecret</a></code>     | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                             | The secret used for token authentication.                                                          |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.GitLabRunner.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="@dmoove/cdk-gitlab-runner.GitLabRunner.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- _Type:_ aws-cdk-lib.aws_kms.Key

The AWS KMS key used for encrypting stored data by the GitLab Runner.

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.GitLabRunner.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

The URL of the gitlab instance.

---

##### `glConfig`<sup>Required</sup> <a name="glConfig" id="@dmoove/cdk-gitlab-runner.GitLabRunner.property.glConfig"></a>

```typescript
public readonly glConfig: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

Configuration details for the GitLab Runner, including job concurrency and authentication details.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.GitLabRunner.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The secret used for token authentication.

---

### GlCfnInit <a name="GlCfnInit" id="@dmoove/cdk-gitlab-runner.GlCfnInit"></a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.GlCfnInit.Initializer"></a>

```typescript
import { GlCfnInit } from '@dmoove/cdk-gitlab-runner'

new GlCfnInit(scope: Construct, id: string)
```

| **Name**                                                                                          | **Type**                          | **Description**                              |
| ------------------------------------------------------------------------------------------------- | --------------------------------- | -------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.id">id</a></code>       | <code>string</code>               | The scoped construct ID.                     |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.id"></a>

- _Type:_ string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                          | **Description**                                    |
| --------------------------------------------------------------------------------- | -------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.GlCfnInit.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                              | **Description**                                                      |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.isConstruct">isConstruct</a></code>               | Checks if `x` is a construct.                                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.addAwsCfnBootstrap">addAwsCfnBootstrap</a></code> | Adds the aws-cfn-bootstrap package to the user data of the instance. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.createInit">createInit</a></code>                 | Creates a CloudFormation Init to register a gitlab runner.           |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.GlCfnInit.isConstruct"></a>

```typescript
import { GlCfnInit } from '@dmoove/cdk-gitlab-runner'

GlCfnInit.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.GlCfnInit.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

##### `addAwsCfnBootstrap` <a name="addAwsCfnBootstrap" id="@dmoove/cdk-gitlab-runner.GlCfnInit.addAwsCfnBootstrap"></a>

```typescript
import { GlCfnInit } from '@dmoove/cdk-gitlab-runner'

GlCfnInit.addAwsCfnBootstrap(target: Instance | AutoScalingGroup)
```

Adds the aws-cfn-bootstrap package to the user data of the instance.

###### `target`<sup>Required</sup> <a name="target" id="@dmoove/cdk-gitlab-runner.GlCfnInit.addAwsCfnBootstrap.parameter.target"></a>

- _Type:_ aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

##### `createInit` <a name="createInit" id="@dmoove/cdk-gitlab-runner.GlCfnInit.createInit"></a>

```typescript
import { GlCfnInit } from '@dmoove/cdk-gitlab-runner'

GlCfnInit.createInit(that: Construct, props: GlCfnInitProps)
```

Creates a CloudFormation Init to register a gitlab runner.

###### `that`<sup>Required</sup> <a name="that" id="@dmoove/cdk-gitlab-runner.GlCfnInit.createInit.parameter.that"></a>

- _Type:_ constructs.Construct

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.GlCfnInit.createInit.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GlCfnInitProps">GlCfnInitProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                           | **Type**                     | **Description** |
| ---------------------------------------------------------------------------------- | ---------------------------- | --------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInit.property.node">node</a></code> | <code>constructs.Node</code> | The tree node.  |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.GlCfnInit.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

### RunnerScaler <a name="RunnerScaler" id="@dmoove/cdk-gitlab-runner.RunnerScaler"></a>

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer"></a>

```typescript
import { RunnerScaler } from '@dmoove/cdk-gitlab-runner'

new RunnerScaler(scope: Construct, id: string, props: RunnerScalerProps)
```

| **Name**                                                                                             | **Type**                                                                                  | **Description**   |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code>                                                         | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer.parameter.id">id</a></code>       | <code>string</code>                                                                       | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScalerProps">RunnerScalerProps</a></code> | _No description._ |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer.parameter.scope"></a>

- _Type:_ constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer.parameter.id"></a>

- _Type:_ string

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.RunnerScaler.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.RunnerScalerProps">RunnerScalerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                             | **Description**                                    |
| ------------------------------------------------------------------------------------ | -------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScaler.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@dmoove/cdk-gitlab-runner.RunnerScaler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                                   | **Description**               |
| ------------------------------------------------------------------------------------------ | ----------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScaler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@dmoove/cdk-gitlab-runner.RunnerScaler.isConstruct"></a>

```typescript
import { RunnerScaler } from '@dmoove/cdk-gitlab-runner'

RunnerScaler.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@dmoove/cdk-gitlab-runner.RunnerScaler.isConstruct.parameter.x"></a>

- _Type:_ any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                              | **Type**                     | **Description** |
| ------------------------------------------------------------------------------------- | ---------------------------- | --------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScaler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node.  |

---

##### `node`<sup>Required</sup> <a name="node" id="@dmoove/cdk-gitlab-runner.RunnerScaler.property.node"></a>

```typescript
public readonly node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

## Structs <a name="Structs" id="Structs"></a>

### AutoScalingConfig <a name="AutoScalingConfig" id="@dmoove/cdk-gitlab-runner.AutoScalingConfig"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.AutoScalingConfig.Initializer"></a>

```typescript
import { AutoScalingConfig } from '@dmoove/cdk-gitlab-runner'

const autoScalingConfig: AutoScalingConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                         | **Type**            | **Description**   |
| ---------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig.property.desiredCapacity">desiredCapacity</a></code> | <code>number</code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig.property.maxCapacity">maxCapacity</a></code>         | <code>number</code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig.property.minCapacity">minCapacity</a></code>         | <code>number</code> | _No description._ |

---

##### `desiredCapacity`<sup>Required</sup> <a name="desiredCapacity" id="@dmoove/cdk-gitlab-runner.AutoScalingConfig.property.desiredCapacity"></a>

```typescript
public readonly desiredCapacity: number;
```

- _Type:_ number

---

##### `maxCapacity`<sup>Required</sup> <a name="maxCapacity" id="@dmoove/cdk-gitlab-runner.AutoScalingConfig.property.maxCapacity"></a>

```typescript
public readonly maxCapacity: number;
```

- _Type:_ number

---

##### `minCapacity`<sup>Required</sup> <a name="minCapacity" id="@dmoove/cdk-gitlab-runner.AutoScalingConfig.property.minCapacity"></a>

```typescript
public readonly minCapacity: number;
```

- _Type:_ number

---

### BaseDockerExecutorProps <a name="BaseDockerExecutorProps" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.Initializer"></a>

```typescript
import { BaseDockerExecutorProps } from '@dmoove/cdk-gitlab-runner'

const baseDockerExecutorProps: BaseDockerExecutorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                   | **Type**                                                                                  | **Description**                                |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.config">config</a></code>                       | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code>           | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.tags">tags</a></code>                           | <code>string[]</code>                                                                     | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.gitlabUrl">gitlabUrl</a></code>                 | <code>string</code>                                                                       | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.instanceType">instanceType</a></code>           | <code>aws-cdk-lib.aws_ec2.InstanceType</code>                                             | The Instance Type used by the docker executor. |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.machineImage">machineImage</a></code>           | <code>aws-cdk-lib.aws_ec2.IMachineImage</code>                                            | The AMI used by the runner.                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.tokenSecret">tokenSecret</a></code>             | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                                       | The GitLab authentification token secret.      |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.vpcConfig">vpcConfig</a></code>                 | <code><a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code>                 | The VPC where the runner should run.           |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config.                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.volumeSize">volumeSize</a></code>               | <code>number</code>                                                                       | Size of the root EBS volume in GiB.            |

---

##### `config`<sup>Required</sup> <a name="config" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- _Type:_ aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- _Type:_ aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

##### `volumeSize`<sup>Optional</sup> <a name="volumeSize" id="@dmoove/cdk-gitlab-runner.BaseDockerExecutorProps.property.volumeSize"></a>

```typescript
public readonly volumeSize: number;
```

- _Type:_ number
- _Default:_ 80

Size of the root EBS volume in GiB.

---

### CacheConfig <a name="CacheConfig" id="@dmoove/cdk-gitlab-runner.CacheConfig"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.CacheConfig.Initializer"></a>

```typescript
import { CacheConfig } from '@dmoove/cdk-gitlab-runner'

const cacheConfig: CacheConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                               | **Type**                          | **Description**                            |
| ------------------------------------------------------------------------------------------------------ | --------------------------------- | ------------------------------------------ |
| <code><a href="#@dmoove/cdk-gitlab-runner.CacheConfig.property.enabled">enabled</a></code>             | <code>boolean</code>              | Wheter a cache should be enabled.          |
| <code><a href="#@dmoove/cdk-gitlab-runner.CacheConfig.property.bucketPrefix">bucketPrefix</a></code>   | <code>string</code>               | The prefix used for the bucket.            |
| <code><a href="#@dmoove/cdk-gitlab-runner.CacheConfig.property.cacheDuration">cacheDuration</a></code> | <code>aws-cdk-lib.Duration</code> | The duration for which the cache is valid. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="@dmoove/cdk-gitlab-runner.CacheConfig.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- _Type:_ boolean
- _Default:_ false

Wheter a cache should be enabled.

---

##### `bucketPrefix`<sup>Optional</sup> <a name="bucketPrefix" id="@dmoove/cdk-gitlab-runner.CacheConfig.property.bucketPrefix"></a>

```typescript
public readonly bucketPrefix: string;
```

- _Type:_ string
- _Default:_ {account}-{region}-gitlab-cache

The prefix used for the bucket.

---

##### `cacheDuration`<sup>Optional</sup> <a name="cacheDuration" id="@dmoove/cdk-gitlab-runner.CacheConfig.property.cacheDuration"></a>

```typescript
public readonly cacheDuration: Duration;
```

- _Type:_ aws-cdk-lib.Duration
- _Default:_ 7

The duration for which the cache is valid.

---

### ConfigDockerExecutor <a name="ConfigDockerExecutor" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.Initializer"></a>

```typescript
import { ConfigDockerExecutor } from '@dmoove/cdk-gitlab-runner'

const configDockerExecutor: ConfigDockerExecutor = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                      | **Type**                               | **Description**                    |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.disableCache">disableCache</a></code> | <code>boolean</code>                   | build cache for docker executor.   |
| <code><a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.env">env</a></code>                   | <code>{[ key: string ]: string}</code> | add custom environment variables.  |
| <code><a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.gitlabImage">gitlabImage</a></code>   | <code>string</code>                    | default image for docker executor. |
| <code><a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.privileged">privileged</a></code>     | <code>boolean</code>                   | default mode for containers.       |
| <code><a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.volumes">volumes</a></code>           | <code>string[]</code>                  | volumes for docker executor.       |

---

##### `disableCache`<sup>Optional</sup> <a name="disableCache" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.disableCache"></a>

```typescript
public readonly disableCache: boolean;
```

- _Type:_ boolean
- _Default:_ false

build cache for docker executor.

---

##### `env`<sup>Optional</sup> <a name="env" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- _Type:_ {[ key: string ]: string}

add custom environment variables.

---

##### `gitlabImage`<sup>Optional</sup> <a name="gitlabImage" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.gitlabImage"></a>

```typescript
public readonly gitlabImage: string;
```

- _Type:_ string
- _Default:_ ubuntu:20.04

default image for docker executor.

---

##### `privileged`<sup>Optional</sup> <a name="privileged" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.privileged"></a>

```typescript
public readonly privileged: boolean;
```

- _Type:_ boolean
- _Default:_ false

default mode for containers.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="@dmoove/cdk-gitlab-runner.ConfigDockerExecutor.property.volumes"></a>

```typescript
public readonly volumes: string[];
```

- _Type:_ string[]
- _Default:_ ["/var/run/docker.sock:/var/run/docker.sock", "/cache:/cache", "/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw"]

volumes for docker executor.

---

### DockerExecutorAttributes <a name="DockerExecutorAttributes" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.Initializer"></a>

```typescript
import { DockerExecutorAttributes } from '@dmoove/cdk-gitlab-runner'

const dockerExecutorAttributes: DockerExecutorAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                    | **Type**                                                                                                  | **Description**                                     |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.instanceType">instanceType</a></code>           | <code>aws-cdk-lib.aws_ec2.InstanceType</code>                                                             | The instance type of the GitLab Runner.             |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.machineImage">machineImage</a></code>           | <code>aws-cdk-lib.aws_ec2.IMachineImage</code>                                                            | The machine image of the GitLab Runner.             |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.vpcConfig">vpcConfig</a></code>                 | <code>aws-cdk-lib.aws_stepfunctions_tasks.VpcConfig</code>                                                | The VPC configuration of the GitLab Runner.         |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code>                 | The autoscaling configuration of the GitLab Runner. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.configProp">configProp</a></code>               | <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps">DockerExecutorConfigProps</a></code> | The configuration of the Docker executor.           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.tags">tags</a></code>                           | <code>string[]</code>                                                                                     | The tags of the GitLab Runner.                      |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- _Type:_ aws-cdk-lib.aws_ec2.InstanceType

The instance type of the GitLab Runner.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- _Type:_ aws-cdk-lib.aws_ec2.IMachineImage

The machine image of the GitLab Runner.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- _Type:_ aws-cdk-lib.aws_stepfunctions_tasks.VpcConfig

The VPC configuration of the GitLab Runner.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling configuration of the GitLab Runner.

---

##### `configProp`<sup>Optional</sup> <a name="configProp" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.configProp"></a>

```typescript
public readonly configProp: DockerExecutorConfigProps;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps">DockerExecutorConfigProps</a>

The configuration of the Docker executor.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.DockerExecutorAttributes.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

The tags of the GitLab Runner.

---

### DockerExecutorAutoscalingProps <a name="DockerExecutorAutoscalingProps" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.Initializer"></a>

```typescript
import { DockerExecutorAutoscalingProps } from '@dmoove/cdk-gitlab-runner'

const dockerExecutorAutoscalingProps: DockerExecutorAutoscalingProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                          | **Type**                                                                                  | **Description**                                |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.config">config</a></code>                       | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code>           | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tags">tags</a></code>                           | <code>string[]</code>                                                                     | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.gitlabUrl">gitlabUrl</a></code>                 | <code>string</code>                                                                       | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.instanceType">instanceType</a></code>           | <code>aws-cdk-lib.aws_ec2.InstanceType</code>                                             | The Instance Type used by the docker executor. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.machineImage">machineImage</a></code>           | <code>aws-cdk-lib.aws_ec2.IMachineImage</code>                                            | The AMI used by the runner.                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tokenSecret">tokenSecret</a></code>             | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                                       | The GitLab authentification token secret.      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.vpcConfig">vpcConfig</a></code>                 | <code><a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code>                 | The VPC where the runner should run.           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config.                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.volumeSize">volumeSize</a></code>               | <code>number</code>                                                                       | Size of the root EBS volume in GiB.            |

---

##### `config`<sup>Required</sup> <a name="config" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- _Type:_ aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- _Type:_ aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

##### `volumeSize`<sup>Optional</sup> <a name="volumeSize" id="@dmoove/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.volumeSize"></a>

```typescript
public readonly volumeSize: number;
```

- _Type:_ number
- _Default:_ 80

Size of the root EBS volume in GiB.

---

### DockerExecutorConfigProps <a name="DockerExecutorConfigProps" id="@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.Initializer"></a>

```typescript
import { DockerExecutorConfigProps } from '@dmoove/cdk-gitlab-runner'

const dockerExecutorConfigProps: DockerExecutorConfigProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                         | **Type**              | **Description**                                |
| ---------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.disableIpv4">disableIpv4</a></code> | <code>boolean</code>  | Whether to disable IPv4 for the GitLab Runner. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.image">image</a></code>             | <code>string</code>   | default image for docker executor.             |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.privileged">privileged</a></code>   | <code>boolean</code>  | default privileged for docker executor.        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.volumes">volumes</a></code>         | <code>string[]</code> | default volumes for docker executor.           |

---

##### `disableIpv4`<sup>Optional</sup> <a name="disableIpv4" id="@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.disableIpv4"></a>

```typescript
public readonly disableIpv4: boolean;
```

- _Type:_ boolean
- _Default:_ false

Whether to disable IPv4 for the GitLab Runner.

---

##### `image`<sup>Optional</sup> <a name="image" id="@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.image"></a>

```typescript
public readonly image: string;
```

- _Type:_ string
- _Default:_ ubuntu:latest

default image for docker executor.

---

##### `privileged`<sup>Optional</sup> <a name="privileged" id="@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.privileged"></a>

```typescript
public readonly privileged: boolean;
```

- _Type:_ boolean
- _Default:_ false

default privileged for docker executor.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="@dmoove/cdk-gitlab-runner.DockerExecutorConfigProps.property.volumes"></a>

```typescript
public readonly volumes: string[];
```

- _Type:_ string[]
- _Default:_ []

default volumes for docker executor.

---

### DockerExecutorInstanceProps <a name="DockerExecutorInstanceProps" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.Initializer"></a>

```typescript
import { DockerExecutorInstanceProps } from '@dmoove/cdk-gitlab-runner'

const dockerExecutorInstanceProps: DockerExecutorInstanceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                       | **Type**                                                                                  | **Description**                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.config">config</a></code>                       | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code>           | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tags">tags</a></code>                           | <code>string[]</code>                                                                     | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.gitlabUrl">gitlabUrl</a></code>                 | <code>string</code>                                                                       | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.instanceType">instanceType</a></code>           | <code>aws-cdk-lib.aws_ec2.InstanceType</code>                                             | The Instance Type used by the docker executor. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.machineImage">machineImage</a></code>           | <code>aws-cdk-lib.aws_ec2.IMachineImage</code>                                            | The AMI used by the runner.                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tokenSecret">tokenSecret</a></code>             | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                                       | The GitLab authentification token secret.      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.vpcConfig">vpcConfig</a></code>                 | <code><a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code>                 | The VPC where the runner should run.           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config.                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.volumeSize">volumeSize</a></code>               | <code>number</code>                                                                       | Size of the root EBS volume in GiB.            |

---

##### `config`<sup>Required</sup> <a name="config" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- _Type:_ aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- _Type:_ aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

##### `volumeSize`<sup>Optional</sup> <a name="volumeSize" id="@dmoove/cdk-gitlab-runner.DockerExecutorInstanceProps.property.volumeSize"></a>

```typescript
public readonly volumeSize: number;
```

- _Type:_ number
- _Default:_ 80

Size of the root EBS volume in GiB.

---

### DockerExecutorProps <a name="DockerExecutorProps" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.Initializer"></a>

```typescript
import { DockerExecutorProps } from '@dmoove/cdk-gitlab-runner'

const dockerExecutorProps: DockerExecutorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                 | **Type**                                                                                    | **Description**                                |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.config">config</a></code>                         | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code>             | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.tags">tags</a></code>                             | <code>string[]</code>                                                                       | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.gitlabUrl">gitlabUrl</a></code>                   | <code>string</code>                                                                         | _No description._                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.instanceType">instanceType</a></code>             | <code>aws-cdk-lib.aws_ec2.InstanceType</code>                                               | The Instance Type used by the docker executor. |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.machineImage">machineImage</a></code>             | <code>aws-cdk-lib.aws_ec2.IMachineImage</code>                                              | The AMI used by the runner.                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.tokenSecret">tokenSecret</a></code>               | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                                         | The GitLab authentification token secret.      |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.vpcConfig">vpcConfig</a></code>                   | <code><a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code>                   | The VPC where the runner should run.           |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.autoscalingConfig">autoscalingConfig</a></code>   | <code><a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code>   | The autoscaling config.                        |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.volumeSize">volumeSize</a></code>                 | <code>number</code>                                                                         | Size of the root EBS volume in GiB.            |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.dockerExecutorType">dockerExecutorType</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a></code> | Choose the docker executor type.               |

---

##### `config`<sup>Required</sup> <a name="config" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- _Type:_ aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- _Type:_ aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

##### `volumeSize`<sup>Optional</sup> <a name="volumeSize" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.volumeSize"></a>

```typescript
public readonly volumeSize: number;
```

- _Type:_ number
- _Default:_ 80

Size of the root EBS volume in GiB.

---

##### `dockerExecutorType`<sup>Required</sup> <a name="dockerExecutorType" id="@dmoove/cdk-gitlab-runner.DockerExecutorProps.property.dockerExecutorType"></a>

```typescript
public readonly dockerExecutorType: DockerExecutorType;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a>

Choose the docker executor type.

---

### DrainFunctionProps <a name="DrainFunctionProps" id="@dmoove/cdk-gitlab-runner.DrainFunctionProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DrainFunctionProps.Initializer"></a>

```typescript
import { DrainFunctionProps } from '@dmoove/cdk-gitlab-runner'

const drainFunctionProps: DrainFunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                            | **Type**                                                   | **Description**   |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps.property.autoScalingGroup">autoScalingGroup</a></code> | <code>aws-cdk-lib.aws_autoscaling.IAutoScalingGroup</code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps.property.gitEndpoint">gitEndpoint</a></code>           | <code>string</code>                                        | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps.property.secret">secret</a></code>                     | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>        | _No description._ |

---

##### `autoScalingGroup`<sup>Required</sup> <a name="autoScalingGroup" id="@dmoove/cdk-gitlab-runner.DrainFunctionProps.property.autoScalingGroup"></a>

```typescript
public readonly autoScalingGroup: IAutoScalingGroup;
```

- _Type:_ aws-cdk-lib.aws_autoscaling.IAutoScalingGroup

---

##### `gitEndpoint`<sup>Required</sup> <a name="gitEndpoint" id="@dmoove/cdk-gitlab-runner.DrainFunctionProps.property.gitEndpoint"></a>

```typescript
public readonly gitEndpoint: string;
```

- _Type:_ string

---

##### `secret`<sup>Required</sup> <a name="secret" id="@dmoove/cdk-gitlab-runner.DrainFunctionProps.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

---

### DrainStateMachineProps <a name="DrainStateMachineProps" id="@dmoove/cdk-gitlab-runner.DrainStateMachineProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.DrainStateMachineProps.Initializer"></a>

```typescript
import { DrainStateMachineProps } from '@dmoove/cdk-gitlab-runner'

const drainStateMachineProps: DrainStateMachineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                | **Type**                                                                                    | **Description**   |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachineProps.property.autoScalingGroup">autoScalingGroup</a></code> | <code>aws-cdk-lib.aws_autoscaling.IAutoScalingGroup</code>                                  | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DrainStateMachineProps.property.functionProps">functionProps</a></code>       | <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a></code> | _No description._ |

---

##### `autoScalingGroup`<sup>Required</sup> <a name="autoScalingGroup" id="@dmoove/cdk-gitlab-runner.DrainStateMachineProps.property.autoScalingGroup"></a>

```typescript
public readonly autoScalingGroup: IAutoScalingGroup;
```

- _Type:_ aws-cdk-lib.aws_autoscaling.IAutoScalingGroup

---

##### `functionProps`<sup>Required</sup> <a name="functionProps" id="@dmoove/cdk-gitlab-runner.DrainStateMachineProps.property.functionProps"></a>

```typescript
public readonly functionProps: DrainFunctionProps;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a>

---

### ExecutorProps <a name="ExecutorProps" id="@dmoove/cdk-gitlab-runner.ExecutorProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.ExecutorProps.Initializer"></a>

```typescript
import { ExecutorProps } from '@dmoove/cdk-gitlab-runner'

const executorProps: ExecutorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                   | **Type**                                                                        | **Description**   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.ExecutorProps.property.config">config</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.ExecutorProps.property.tags">tags</a></code>     | <code>string[]</code>                                                           | _No description._ |

---

##### `config`<sup>Required</sup> <a name="config" id="@dmoove/cdk-gitlab-runner.ExecutorProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.ExecutorProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

---

### GitLabCacheBucketProps <a name="GitLabCacheBucketProps" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.Initializer"></a>

```typescript
import { GitLabCacheBucketProps } from '@dmoove/cdk-gitlab-runner'

const gitLabCacheBucketProps: GitLabCacheBucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                | **Type**                             | **Description**                                             |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.property.encryptionKey">encryptionKey</a></code>       | <code>aws-cdk-lib.aws_kms.Key</code> | bucket encryption?                                          |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.property.bucketNamePrefix">bucketNamePrefix</a></code> | <code>string</code>                  | bucketNamePrefix, so that it can follow your naming scheme. |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.property.cacheDuration">cacheDuration</a></code>       | <code>aws-cdk-lib.Duration</code>    | How many days the objects should be cached.                 |

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- _Type:_ aws-cdk-lib.aws_kms.Key
- _Default:_ key for the gitlab runner stack

bucket encryption?

---

##### `bucketNamePrefix`<sup>Optional</sup> <a name="bucketNamePrefix" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.property.bucketNamePrefix"></a>

```typescript
public readonly bucketNamePrefix: string;
```

- _Type:_ string
- _Default:_ {account}-{region}-gitlab-cache

bucketNamePrefix, so that it can follow your naming scheme.

---

##### `cacheDuration`<sup>Optional</sup> <a name="cacheDuration" id="@dmoove/cdk-gitlab-runner.GitLabCacheBucketProps.property.cacheDuration"></a>

```typescript
public readonly cacheDuration: Duration;
```

- _Type:_ aws-cdk-lib.Duration
- _Default:_ 7

How many days the objects should be cached.

---

### GitLabRunnerProps <a name="GitLabRunnerProps" id="@dmoove/cdk-gitlab-runner.GitLabRunnerProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.GitLabRunnerProps.Initializer"></a>

```typescript
import { GitLabRunnerProps } from '@dmoove/cdk-gitlab-runner'

const gitLabRunnerProps: GitLabRunnerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                     | **Type**                                                                        | **Description**              |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunnerProps.property.runnerConfig">runnerConfig</a></code>   | <code><a href="#@dmoove/cdk-gitlab-runner.RunnerConfig">RunnerConfig</a></code> | basic runner configuration.  |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunnerProps.property.cacheConfig">cacheConfig</a></code>     | <code><a href="#@dmoove/cdk-gitlab-runner.CacheConfig">CacheConfig</a></code>   | basic cache configuration.   |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabRunnerProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code>                                            | which encryption key to use. |

---

##### `runnerConfig`<sup>Required</sup> <a name="runnerConfig" id="@dmoove/cdk-gitlab-runner.GitLabRunnerProps.property.runnerConfig"></a>

```typescript
public readonly runnerConfig: RunnerConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.RunnerConfig">RunnerConfig</a>

basic runner configuration.

---

##### `cacheConfig`<sup>Optional</sup> <a name="cacheConfig" id="@dmoove/cdk-gitlab-runner.GitLabRunnerProps.property.cacheConfig"></a>

```typescript
public readonly cacheConfig: CacheConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.CacheConfig">CacheConfig</a>

basic cache configuration.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@dmoove/cdk-gitlab-runner.GitLabRunnerProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- _Type:_ aws-cdk-lib.aws_kms.Key
- _Default:_ customer key per gitlab runner instance

which encryption key to use.

---

### GlCfnInitProps <a name="GlCfnInitProps" id="@dmoove/cdk-gitlab-runner.GlCfnInitProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.GlCfnInitProps.Initializer"></a>

```typescript
import { GlCfnInitProps } from '@dmoove/cdk-gitlab-runner'

const glCfnInitProps: GlCfnInitProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                              | **Type**                                                                        | **Description**   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.config">config</a></code>           | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                             | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.url">url</a></code>                 | <code>string</code>                                                             | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.tags">tags</a></code>               | <code>string[]</code>                                                           | _No description._ |

---

##### `config`<sup>Required</sup> <a name="config" id="@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `url`<sup>Required</sup> <a name="url" id="@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.url"></a>

```typescript
public readonly url: string;
```

- _Type:_ string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@dmoove/cdk-gitlab-runner.GlCfnInitProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- _Type:_ string[]

---

### GlConfigGeneratorProps <a name="GlConfigGeneratorProps" id="@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps"></a>

Properties for the GlConfigGenerator class.

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps.Initializer"></a>

```typescript
import { GlConfigGeneratorProps } from '@dmoove/cdk-gitlab-runner'

const glConfigGeneratorProps: GlConfigGeneratorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                    | **Type**            | **Description**                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps.property.concurrent">concurrent</a></code> | <code>number</code> | How many jobs can run concurrently? |
| <code><a href="#@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps.property.gitlabUrl">gitlabUrl</a></code>   | <code>string</code> | The gitlab url.                     |

---

##### `concurrent`<sup>Required</sup> <a name="concurrent" id="@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps.property.concurrent"></a>

```typescript
public readonly concurrent: number;
```

- _Type:_ number

How many jobs can run concurrently?

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

The gitlab url.

---

### RunnerConfig <a name="RunnerConfig" id="@dmoove/cdk-gitlab-runner.RunnerConfig"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.RunnerConfig.Initializer"></a>

```typescript
import { RunnerConfig } from '@dmoove/cdk-gitlab-runner'

const runnerConfig: RunnerConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                          | **Type**                                            | **Description**                                                        |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerConfig.property.token">token</a></code>           | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab Runner registration token.                                  |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerConfig.property.concurrent">concurrent</a></code> | <code>number</code>                                 | The maximum number of concurrent jobs that the GitLab Runner will run. |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerConfig.property.url">url</a></code>               | <code>string</code>                                 | The GitLab URL.                                                        |

---

##### `token`<sup>Required</sup> <a name="token" id="@dmoove/cdk-gitlab-runner.RunnerConfig.property.token"></a>

```typescript
public readonly token: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab Runner registration token.

---

##### `concurrent`<sup>Optional</sup> <a name="concurrent" id="@dmoove/cdk-gitlab-runner.RunnerConfig.property.concurrent"></a>

```typescript
public readonly concurrent: number;
```

- _Type:_ number
- _Default:_ 2

The maximum number of concurrent jobs that the GitLab Runner will run.

---

##### `url`<sup>Optional</sup> <a name="url" id="@dmoove/cdk-gitlab-runner.RunnerConfig.property.url"></a>

```typescript
public readonly url: string;
```

- _Type:_ string
- _Default:_ https://gitlab.com/

The GitLab URL.

---

### RunnerScalerProps <a name="RunnerScalerProps" id="@dmoove/cdk-gitlab-runner.RunnerScalerProps"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.RunnerScalerProps.Initializer"></a>

```typescript
import { RunnerScalerProps } from '@dmoove/cdk-gitlab-runner'

const runnerScalerProps: RunnerScalerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                           | **Type**                                                  | **Description**   |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.autoScalingGroup">autoScalingGroup</a></code> | <code>aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.gitlabUrl">gitlabUrl</a></code>               | <code>string</code>                                       | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.tokenSecret">tokenSecret</a></code>           | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>       | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.schedule">schedule</a></code>                 | <code>aws-cdk-lib.aws_events.Schedule</code>              | _No description._ |

---

##### `autoScalingGroup`<sup>Required</sup> <a name="autoScalingGroup" id="@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.autoScalingGroup"></a>

```typescript
public readonly autoScalingGroup: AutoScalingGroup;
```

- _Type:_ aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="@dmoove/cdk-gitlab-runner.RunnerScalerProps.property.schedule"></a>

```typescript
public readonly schedule: Schedule;
```

- _Type:_ aws-cdk-lib.aws_events.Schedule

---

### VpcConfig <a name="VpcConfig" id="@dmoove/cdk-gitlab-runner.VpcConfig"></a>

#### Initializer <a name="Initializer" id="@dmoove/cdk-gitlab-runner.VpcConfig.Initializer"></a>

```typescript
import { VpcConfig } from '@dmoove/cdk-gitlab-runner'

const vpcConfig: VpcConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                       | **Type**                                         | **Description**   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.VpcConfig.property.vpc">vpc</a></code>               | <code>aws-cdk-lib.aws_ec2.IVpc</code>            | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.VpcConfig.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | _No description._ |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@dmoove/cdk-gitlab-runner.VpcConfig.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- _Type:_ aws-cdk-lib.aws_ec2.IVpc

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@dmoove/cdk-gitlab-runner.VpcConfig.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- _Type:_ aws-cdk-lib.aws_ec2.SubnetSelection

---

## Classes <a name="Classes" id="Classes"></a>

### GitLabConfig <a name="GitLabConfig" id="@dmoove/cdk-gitlab-runner.GitLabConfig"></a>

- _Implements:_ <a href="#@dmoove/cdk-gitlab-runner.IGitLabConfig">IGitLabConfig</a>

Generates a gitlab config toml file.

#### Initializers <a name="Initializers" id="@dmoove/cdk-gitlab-runner.GitLabConfig.Initializer"></a>

```typescript
import { GitLabConfig } from '@dmoove/cdk-gitlab-runner'

new GitLabConfig(props: GlConfigGeneratorProps)
```

| **Name**                                                                                             | **Type**                                                                                            | **Description**   |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig.Initializer.parameter.props">props</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps">GlConfigGeneratorProps</a></code> | _No description._ |

---

##### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.GitLabConfig.Initializer.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GlConfigGeneratorProps">GlConfigGeneratorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                               | **Description**                                      |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig.addCache">addCache</a></code>                   | Adds a cache to the configuration.                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig.addDockerExecutor">addDockerExecutor</a></code> | Adds an executor to the configuration.               |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig.generateToml">generateToml</a></code>           | Generates the GitLab configuration as a TOML string. |

---

##### `addCache` <a name="addCache" id="@dmoove/cdk-gitlab-runner.GitLabConfig.addCache"></a>

```typescript
public addCache(scope: Construct, bucket: GitLabCacheBucket): void
```

Adds a cache to the configuration.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.GitLabConfig.addCache.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@dmoove/cdk-gitlab-runner.GitLabConfig.addCache.parameter.bucket"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket">GitLabCacheBucket</a>

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@dmoove/cdk-gitlab-runner.GitLabConfig.addDockerExecutor"></a>

```typescript
public addDockerExecutor(props?: ConfigDockerExecutor): void
```

Adds an executor to the configuration.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.GitLabConfig.addDockerExecutor.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor">ConfigDockerExecutor</a>

---

##### `generateToml` <a name="generateToml" id="@dmoove/cdk-gitlab-runner.GitLabConfig.generateToml"></a>

```typescript
public generateToml(): string
```

Generates the GitLab configuration as a TOML string.

## Protocols <a name="Protocols" id="Protocols"></a>

### IDockerExecutor <a name="IDockerExecutor" id="@dmoove/cdk-gitlab-runner.IDockerExecutor"></a>

- _Implemented By:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutor">DockerExecutor</a>, <a href="#@dmoove/cdk-gitlab-runner.IDockerExecutor">IDockerExecutor</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                        | **Description**   |
| --------------------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IDockerExecutor.addTaggingPermission">addTaggingPermission</a></code> | _No description._ |

---

##### `addTaggingPermission` <a name="addTaggingPermission" id="@dmoove/cdk-gitlab-runner.IDockerExecutor.addTaggingPermission"></a>

```typescript
public addTaggingPermission(grantee: IRole): void
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="@dmoove/cdk-gitlab-runner.IDockerExecutor.addTaggingPermission.parameter.grantee"></a>

- _Type:_ aws-cdk-lib.aws_iam.IRole

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                         | **Type**                                                                                  | **Description**   |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IDockerExecutor.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | _No description._ |

---

##### `executor`<sup>Required</sup> <a name="executor" id="@dmoove/cdk-gitlab-runner.IDockerExecutor.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- _Type:_ aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

### IDrainStateMachine <a name="IDrainStateMachine" id="@dmoove/cdk-gitlab-runner.IDrainStateMachine"></a>

- _Implemented By:_ <a href="#@dmoove/cdk-gitlab-runner.DrainStateMachine">DrainStateMachine</a>, <a href="#@dmoove/cdk-gitlab-runner.IDrainStateMachine">IDrainStateMachine</a>

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                      | **Type**                                                                          | **Description**   |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IDrainStateMachine.property.drainFunction">drainFunction</a></code> | <code><a href="#@dmoove/cdk-gitlab-runner.DrainFunction">DrainFunction</a></code> | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.IDrainStateMachine.property.stateMachine">stateMachine</a></code>   | <code>aws-cdk-lib.aws_stepfunctions.IStateMachine</code>                          | _No description._ |

---

##### `drainFunction`<sup>Required</sup> <a name="drainFunction" id="@dmoove/cdk-gitlab-runner.IDrainStateMachine.property.drainFunction"></a>

```typescript
public readonly drainFunction: DrainFunction;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DrainFunction">DrainFunction</a>

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="@dmoove/cdk-gitlab-runner.IDrainStateMachine.property.stateMachine"></a>

```typescript
public readonly stateMachine: IStateMachine;
```

- _Type:_ aws-cdk-lib.aws_stepfunctions.IStateMachine

---

### IExecutor <a name="IExecutor" id="@dmoove/cdk-gitlab-runner.IExecutor"></a>

- _Implemented By:_ <a href="#@dmoove/cdk-gitlab-runner.IExecutor">IExecutor</a>

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                   | **Type**                                                                                  | **Description**   |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IExecutor.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | _No description._ |

---

##### `executor`<sup>Required</sup> <a name="executor" id="@dmoove/cdk-gitlab-runner.IExecutor.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- _Type:_ aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

### IGitLabConfig <a name="IGitLabConfig" id="@dmoove/cdk-gitlab-runner.IGitLabConfig"></a>

- _Implemented By:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>, <a href="#@dmoove/cdk-gitlab-runner.IGitLabConfig">IGitLabConfig</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                | **Description**                                      |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabConfig.addCache">addCache</a></code>                   | Adds a cache to the configuration.                   |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabConfig.addDockerExecutor">addDockerExecutor</a></code> | Adds an executor to the configuration.               |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabConfig.generateToml">generateToml</a></code>           | Generates the GitLab configuration as a TOML string. |

---

##### `addCache` <a name="addCache" id="@dmoove/cdk-gitlab-runner.IGitLabConfig.addCache"></a>

```typescript
public addCache(scope: Construct, bucket: GitLabCacheBucket): void
```

Adds a cache to the configuration.

###### `scope`<sup>Required</sup> <a name="scope" id="@dmoove/cdk-gitlab-runner.IGitLabConfig.addCache.parameter.scope"></a>

- _Type:_ constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@dmoove/cdk-gitlab-runner.IGitLabConfig.addCache.parameter.bucket"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabCacheBucket">GitLabCacheBucket</a>

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@dmoove/cdk-gitlab-runner.IGitLabConfig.addDockerExecutor"></a>

```typescript
public addDockerExecutor(props?: ConfigDockerExecutor): void
```

Adds an executor to the configuration.

###### `props`<sup>Optional</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.IGitLabConfig.addDockerExecutor.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.ConfigDockerExecutor">ConfigDockerExecutor</a>

The properties for the executor.

---

##### `generateToml` <a name="generateToml" id="@dmoove/cdk-gitlab-runner.IGitLabConfig.generateToml"></a>

```typescript
public generateToml(): string
```

Generates the GitLab configuration as a TOML string.

### IGitLabRunner <a name="IGitLabRunner" id="@dmoove/cdk-gitlab-runner.IGitLabRunner"></a>

- _Implemented By:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabRunner">GitLabRunner</a>, <a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner">IGitLabRunner</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                | **Description**                                            |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor">addDockerExecutor</a></code> | Adds a Docker executor to the GitLab Runner configuration. |

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor"></a>

```typescript
public addDockerExecutor(executorType: DockerExecutorType, props: DockerExecutorAttributes): void
```

Adds a Docker executor to the GitLab Runner configuration.

_Example_

```typescript
runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
  image: 'ubuntu:latest',
  privileged: true,
  volumes: ['/var/run/docker.sock:/var/run/docker.sock'],
});
```

###### `executorType`<sup>Required</sup> <a name="executorType" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor.parameter.executorType"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a>

the type of Docker executor.

---

###### `props`<sup>Required</sup> <a name="props" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor.parameter.props"></a>

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.DockerExecutorAttributes">DockerExecutorAttributes</a>

properties for the Docker executor.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                 | **Type**                                                                        | **Description**                                                                                    |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code>                                            | The AWS KMS key used for encrypting stored data by the GitLab Runner.                              |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner.property.gitlabUrl">gitlabUrl</a></code>         | <code>string</code>                                                             | The URL of the gitlab instance.                                                                    |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner.property.glConfig">glConfig</a></code>           | <code><a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | Configuration details for the GitLab Runner, including job concurrency and authentication details. |
| <code><a href="#@dmoove/cdk-gitlab-runner.IGitLabRunner.property.tokenSecret">tokenSecret</a></code>     | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code>                             | The secret used for token authentication.                                                          |

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- _Type:_ aws-cdk-lib.aws_kms.Key

The AWS KMS key used for encrypting stored data by the GitLab Runner.

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- _Type:_ string

The URL of the gitlab instance.

---

##### `glConfig`<sup>Required</sup> <a name="glConfig" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.property.glConfig"></a>

```typescript
public readonly glConfig: GitLabConfig;
```

- _Type:_ <a href="#@dmoove/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

Configuration details for the GitLab Runner, including job concurrency and authentication details.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@dmoove/cdk-gitlab-runner.IGitLabRunner.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- _Type:_ aws-cdk-lib.aws_secretsmanager.ISecret

The secret used for token authentication.

---

## Enums <a name="Enums" id="Enums"></a>

### CacheType <a name="CacheType" id="@dmoove/cdk-gitlab-runner.CacheType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name**                                                              | **Description**   |
| --------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.CacheType.S3">S3</a></code> | _No description._ |

---

##### `S3` <a name="S3" id="@dmoove/cdk-gitlab-runner.CacheType.S3"></a>

---

### DockerExecutorType <a name="DockerExecutorType" id="@dmoove/cdk-gitlab-runner.DockerExecutorType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name**                                                                                                 | **Description**   |
| -------------------------------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorType.AUTOSCALING">AUTOSCALING</a></code>         | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.DockerExecutorType.SINGLE_INSTANCE">SINGLE_INSTANCE</a></code> | _No description._ |

---

##### `AUTOSCALING` <a name="AUTOSCALING" id="@dmoove/cdk-gitlab-runner.DockerExecutorType.AUTOSCALING"></a>

---

##### `SINGLE_INSTANCE` <a name="SINGLE_INSTANCE" id="@dmoove/cdk-gitlab-runner.DockerExecutorType.SINGLE_INSTANCE"></a>

---

### GitlabExecutor <a name="GitlabExecutor" id="@dmoove/cdk-gitlab-runner.GitlabExecutor"></a>

#### Members <a name="Members" id="Members"></a>

| **Name**                                                                                   | **Description**   |
| ------------------------------------------------------------------------------------------ | ----------------- |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitlabExecutor.DOCKER">DOCKER</a></code>         | _No description._ |
| <code><a href="#@dmoove/cdk-gitlab-runner.GitlabExecutor.KUBERNETES">KUBERNETES</a></code> | _No description._ |

---

##### `DOCKER` <a name="DOCKER" id="@dmoove/cdk-gitlab-runner.GitlabExecutor.DOCKER"></a>

---

##### `KUBERNETES` <a name="KUBERNETES" id="@dmoove/cdk-gitlab-runner.GitlabExecutor.KUBERNETES"></a>

---
