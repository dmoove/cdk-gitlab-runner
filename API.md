# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DockerExecutor <a name="DockerExecutor" id="@yanu23/cdk-gitlab-runner.DockerExecutor"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.IDockerExecutor">IDockerExecutor</a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer"></a>

```typescript
import { DockerExecutor } from '@yanu23/cdk-gitlab-runner'

new DockerExecutor(scope: Construct, id: string, props: DockerExecutorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps">DockerExecutorProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutor.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps">DockerExecutorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.addTaggingPermission">addTaggingPermission</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DockerExecutor.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addTaggingPermission` <a name="addTaggingPermission" id="@yanu23/cdk-gitlab-runner.DockerExecutor.addTaggingPermission"></a>

```typescript
public addTaggingPermission(grantee: IRole): void
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.DockerExecutor.addTaggingPermission.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.DockerExecutor.isConstruct"></a>

```typescript
import { DockerExecutor } from '@yanu23/cdk-gitlab-runner'

DockerExecutor.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.DockerExecutor.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DockerExecutor.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `executor`<sup>Required</sup> <a name="executor" id="@yanu23/cdk-gitlab-runner.DockerExecutor.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---


### DockerExecutorAutoscaling <a name="DockerExecutorAutoscaling" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling"></a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer"></a>

```typescript
import { DockerExecutorAutoscaling } from '@yanu23/cdk-gitlab-runner'

new DockerExecutorAutoscaling(scope: Construct, id: string, props: DockerExecutorAutoscalingProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps">DockerExecutorAutoscalingProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps">DockerExecutorAutoscalingProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook">addLifecycleHook</a></code> | Send a message to either an SQS queue or SNS topic when instances launch or terminate. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addSecurityGroup">addSecurityGroup</a></code> | Add the security group to all instances via the launch template security groups array. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by instances of this fleet. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addUserData">addUserData</a></code> | Add command to the startup script of fleet instances. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addWarmPool">addWarmPool</a></code> | Add a pool of pre-initialized EC2 instances that sits alongside an Auto Scaling group. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit">applyCloudFormationInit</a></code> | Use a CloudFormation Init configuration at instance startup. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.areNewInstancesProtectedFromScaleIn">areNewInstancesProtectedFromScaleIn</a></code> | Returns `true` if newly-launched instances are protected from scale-in. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToApplicationTargetGroup">attachToApplicationTargetGroup</a></code> | Attach to ELBv2 Application Target Group. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToClassicLB">attachToClassicLB</a></code> | Attach to a classic load balancer. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToNetworkTargetGroup">attachToNetworkTargetGroup</a></code> | Attach to ELBv2 Application Target Group. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.protectNewInstancesFromScaleIn">protectNewInstancesFromScaleIn</a></code> | Ensures newly-launched instances are protected from scale-in. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization">scaleOnCpuUtilization</a></code> | Scale out or in to achieve a target CPU utilization. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes">scaleOnIncomingBytes</a></code> | Scale out or in to achieve a target network ingress rate. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric">scaleOnMetric</a></code> | Scale out or in, in response to a metric. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes">scaleOnOutgoingBytes</a></code> | Scale out or in to achieve a target network egress rate. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount">scaleOnRequestCount</a></code> | Scale out or in to achieve a target request handling rate. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule">scaleOnSchedule</a></code> | Scale out or in based on time. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric">scaleToTrackMetric</a></code> | Scale out or in in order to keep a metric around a target value. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addLifecycleHook` <a name="addLifecycleHook" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook"></a>

```typescript
public addLifecycleHook(id: string, props: BasicLifecycleHookProps): LifecycleHook
```

Send a message to either an SQS queue or SNS topic when instances launch or terminate.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addLifecycleHook.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.BasicLifecycleHookProps

---

##### `addSecurityGroup` <a name="addSecurityGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addSecurityGroup"></a>

```typescript
public addSecurityGroup(securityGroup: ISecurityGroup): void
```

Add the security group to all instances via the launch template security groups array.

###### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addSecurityGroup.parameter.securityGroup"></a>

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

: The security group to add.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by instances of this fleet.

###### `statement`<sup>Required</sup> <a name="statement" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `addUserData` <a name="addUserData" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addUserData"></a>

```typescript
public addUserData(commands: string): void
```

Add command to the startup script of fleet instances.

The command must be in the scripting language supported by the fleet's OS (i.e. Linux/Windows).
Does nothing for imported ASGs.

###### `commands`<sup>Required</sup> <a name="commands" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addUserData.parameter.commands"></a>

- *Type:* string

---

##### `addWarmPool` <a name="addWarmPool" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addWarmPool"></a>

```typescript
public addWarmPool(options?: WarmPoolOptions): WarmPool
```

Add a pool of pre-initialized EC2 instances that sits alongside an Auto Scaling group.

###### `options`<sup>Optional</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.addWarmPool.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.WarmPoolOptions

---

##### `applyCloudFormationInit` <a name="applyCloudFormationInit" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit"></a>

```typescript
public applyCloudFormationInit(init: CloudFormationInit, options?: ApplyCloudFormationInitOptions): void
```

Use a CloudFormation Init configuration at instance startup.

This does the following:

- Attaches the CloudFormation Init metadata to the AutoScalingGroup resource.
- Add commands to the UserData to run `cfn-init` and `cfn-signal`.
- Update the instance's CreationPolicy to wait for `cfn-init` to finish
  before reporting success.

###### `init`<sup>Required</sup> <a name="init" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit.parameter.init"></a>

- *Type:* aws-cdk-lib.aws_ec2.CloudFormationInit

---

###### `options`<sup>Optional</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.applyCloudFormationInit.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.ApplyCloudFormationInitOptions

---

##### `areNewInstancesProtectedFromScaleIn` <a name="areNewInstancesProtectedFromScaleIn" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.areNewInstancesProtectedFromScaleIn"></a>

```typescript
public areNewInstancesProtectedFromScaleIn(): boolean
```

Returns `true` if newly-launched instances are protected from scale-in.

##### `attachToApplicationTargetGroup` <a name="attachToApplicationTargetGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToApplicationTargetGroup"></a>

```typescript
public attachToApplicationTargetGroup(targetGroup: IApplicationTargetGroup): LoadBalancerTargetProps
```

Attach to ELBv2 Application Target Group.

###### `targetGroup`<sup>Required</sup> <a name="targetGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToApplicationTargetGroup.parameter.targetGroup"></a>

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationTargetGroup

---

##### `attachToClassicLB` <a name="attachToClassicLB" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToClassicLB"></a>

```typescript
public attachToClassicLB(loadBalancer: LoadBalancer): void
```

Attach to a classic load balancer.

###### `loadBalancer`<sup>Required</sup> <a name="loadBalancer" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToClassicLB.parameter.loadBalancer"></a>

- *Type:* aws-cdk-lib.aws_elasticloadbalancing.LoadBalancer

---

##### `attachToNetworkTargetGroup` <a name="attachToNetworkTargetGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToNetworkTargetGroup"></a>

```typescript
public attachToNetworkTargetGroup(targetGroup: INetworkTargetGroup): LoadBalancerTargetProps
```

Attach to ELBv2 Application Target Group.

###### `targetGroup`<sup>Required</sup> <a name="targetGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.attachToNetworkTargetGroup.parameter.targetGroup"></a>

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.INetworkTargetGroup

---

##### `protectNewInstancesFromScaleIn` <a name="protectNewInstancesFromScaleIn" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.protectNewInstancesFromScaleIn"></a>

```typescript
public protectNewInstancesFromScaleIn(): void
```

Ensures newly-launched instances are protected from scale-in.

##### `scaleOnCpuUtilization` <a name="scaleOnCpuUtilization" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization"></a>

```typescript
public scaleOnCpuUtilization(id: string, props: CpuUtilizationScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target CPU utilization.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnCpuUtilization.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.CpuUtilizationScalingProps

---

##### `scaleOnIncomingBytes` <a name="scaleOnIncomingBytes" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes"></a>

```typescript
public scaleOnIncomingBytes(id: string, props: NetworkUtilizationScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target network ingress rate.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnIncomingBytes.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.NetworkUtilizationScalingProps

---

##### `scaleOnMetric` <a name="scaleOnMetric" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric"></a>

```typescript
public scaleOnMetric(id: string, props: BasicStepScalingPolicyProps): StepScalingPolicy
```

Scale out or in, in response to a metric.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnMetric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.BasicStepScalingPolicyProps

---

##### `scaleOnOutgoingBytes` <a name="scaleOnOutgoingBytes" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes"></a>

```typescript
public scaleOnOutgoingBytes(id: string, props: NetworkUtilizationScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target network egress rate.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnOutgoingBytes.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.NetworkUtilizationScalingProps

---

##### `scaleOnRequestCount` <a name="scaleOnRequestCount" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount"></a>

```typescript
public scaleOnRequestCount(id: string, props: RequestCountScalingProps): TargetTrackingScalingPolicy
```

Scale out or in to achieve a target request handling rate.

The AutoScalingGroup must have been attached to an Application Load Balancer
in order to be able to call this.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnRequestCount.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.RequestCountScalingProps

---

##### `scaleOnSchedule` <a name="scaleOnSchedule" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule"></a>

```typescript
public scaleOnSchedule(id: string, props: BasicScheduledActionProps): ScheduledAction
```

Scale out or in based on time.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleOnSchedule.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.BasicScheduledActionProps

---

##### `scaleToTrackMetric` <a name="scaleToTrackMetric" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric"></a>

```typescript
public scaleToTrackMetric(id: string, props: MetricTargetTrackingProps): TargetTrackingScalingPolicy
```

Scale out or in in order to keep a metric around a target value.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.scaleToTrackMetric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_autoscaling.MetricTargetTrackingProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName">fromAutoScalingGroupName</a></code> | *No description.* |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct"></a>

```typescript
import { DockerExecutorAutoscaling } from '@yanu23/cdk-gitlab-runner'

DockerExecutorAutoscaling.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isOwnedResource"></a>

```typescript
import { DockerExecutorAutoscaling } from '@yanu23/cdk-gitlab-runner'

DockerExecutorAutoscaling.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isResource"></a>

```typescript
import { DockerExecutorAutoscaling } from '@yanu23/cdk-gitlab-runner'

DockerExecutorAutoscaling.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromAutoScalingGroupName` <a name="fromAutoScalingGroupName" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName"></a>

```typescript
import { DockerExecutorAutoscaling } from '@yanu23/cdk-gitlab-runner'

DockerExecutorAutoscaling.fromAutoScalingGroupName(scope: Construct, id: string, autoScalingGroupName: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName.parameter.id"></a>

- *Type:* string

---

###### `autoScalingGroupName`<sup>Required</sup> <a name="autoScalingGroupName" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.fromAutoScalingGroupName.parameter.autoScalingGroupName"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupArn">autoScalingGroupArn</a></code> | <code>string</code> | Arn of the AutoScalingGroup. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupName">autoScalingGroupName</a></code> | <code>string</code> | Name of the AutoScalingGroup. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The network connections associated with this resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal to grant permissions to. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.osType">osType</a></code> | <code>aws-cdk-lib.aws_ec2.OperatingSystemType</code> | The type of OS instances of this fleet are running. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM Role in the instance profile. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.userData">userData</a></code> | <code>aws-cdk-lib.aws_ec2.UserData</code> | The Base64-encoded user data to make available to the launched EC2 instances. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.maxInstanceLifetime">maxInstanceLifetime</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum amount of time that an instance can be in service. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.spotPrice">spotPrice</a></code> | <code>string</code> | The maximum spot price configured for the autoscaling group. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `autoScalingGroupArn`<sup>Required</sup> <a name="autoScalingGroupArn" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupArn"></a>

```typescript
public readonly autoScalingGroupArn: string;
```

- *Type:* string

Arn of the AutoScalingGroup.

---

##### `autoScalingGroupName`<sup>Required</sup> <a name="autoScalingGroupName" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.autoScalingGroupName"></a>

```typescript
public readonly autoScalingGroupName: string;
```

- *Type:* string

Name of the AutoScalingGroup.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---

##### `osType`<sup>Required</sup> <a name="osType" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.osType"></a>

```typescript
public readonly osType: OperatingSystemType;
```

- *Type:* aws-cdk-lib.aws_ec2.OperatingSystemType

The type of OS instances of this fleet are running.

---

##### `role`<sup>Required</sup> <a name="role" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The IAM Role in the instance profile.

---

##### `userData`<sup>Required</sup> <a name="userData" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.userData"></a>

```typescript
public readonly userData: UserData;
```

- *Type:* aws-cdk-lib.aws_ec2.UserData

The Base64-encoded user data to make available to the launched EC2 instances.

---

##### `maxInstanceLifetime`<sup>Optional</sup> <a name="maxInstanceLifetime" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.maxInstanceLifetime"></a>

```typescript
public readonly maxInstanceLifetime: Duration;
```

- *Type:* aws-cdk-lib.Duration

The maximum amount of time that an instance can be in service.

---

##### `spotPrice`<sup>Optional</sup> <a name="spotPrice" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.spotPrice"></a>

```typescript
public readonly spotPrice: string;
```

- *Type:* string

The maximum spot price configured for the autoscaling group.

`undefined`
indicates that this group uses on-demand capacity.

---


### DockerExecutorInstance <a name="DockerExecutorInstance" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance"></a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer"></a>

```typescript
import { DockerExecutorInstance } from '@yanu23/cdk-gitlab-runner'

new DockerExecutorInstance(scope: Construct, id: string, props: DockerExecutorInstanceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps">DockerExecutorInstanceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps">DockerExecutorInstanceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addSecurityGroup">addSecurityGroup</a></code> | Add the security group to the instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addUserData">addUserData</a></code> | Add command to the startup script of the instance. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addSecurityGroup` <a name="addSecurityGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addSecurityGroup"></a>

```typescript
public addSecurityGroup(securityGroup: ISecurityGroup): void
```

Add the security group to the instance.

###### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addSecurityGroup.parameter.securityGroup"></a>

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

: The security group to add.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `addUserData` <a name="addUserData" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addUserData"></a>

```typescript
public addUserData(commands: string): void
```

Add command to the startup script of the instance.

The command must be in the scripting language supported by the instance's OS (i.e. Linux/Windows).

###### `commands`<sup>Required</sup> <a name="commands" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.addUserData.parameter.commands"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isConstruct"></a>

```typescript
import { DockerExecutorInstance } from '@yanu23/cdk-gitlab-runner'

DockerExecutorInstance.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isOwnedResource"></a>

```typescript
import { DockerExecutorInstance } from '@yanu23/cdk-gitlab-runner'

DockerExecutorInstance.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isResource"></a>

```typescript
import { DockerExecutorInstance } from '@yanu23/cdk-gitlab-runner'

DockerExecutorInstance.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Allows specify security group connections for the instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal to grant permissions to. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instance">instance</a></code> | <code>aws-cdk-lib.aws_ec2.CfnInstance</code> | the underlying instance resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instanceAvailabilityZone">instanceAvailabilityZone</a></code> | <code>string</code> | The availability zone the instance was launched in. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instanceId">instanceId</a></code> | <code>string</code> | The instance's ID. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateDnsName">instancePrivateDnsName</a></code> | <code>string</code> | Private DNS name for this instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateIp">instancePrivateIp</a></code> | <code>string</code> | Private IP for this instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicDnsName">instancePublicDnsName</a></code> | <code>string</code> | Publicly-routable DNS name for this instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicIp">instancePublicIp</a></code> | <code>string</code> | Publicly-routable IP  address for this instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.osType">osType</a></code> | <code>aws-cdk-lib.aws_ec2.OperatingSystemType</code> | The type of OS the instance is running. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role assumed by the instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.userData">userData</a></code> | <code>aws-cdk-lib.aws_ec2.UserData</code> | UserData for the instance. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Allows specify security group connections for the instance.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---

##### `instance`<sup>Required</sup> <a name="instance" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instance"></a>

```typescript
public readonly instance: CfnInstance;
```

- *Type:* aws-cdk-lib.aws_ec2.CfnInstance

the underlying instance resource.

---

##### `instanceAvailabilityZone`<sup>Required</sup> <a name="instanceAvailabilityZone" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instanceAvailabilityZone"></a>

```typescript
public readonly instanceAvailabilityZone: string;
```

- *Type:* string

The availability zone the instance was launched in.

---

##### `instanceId`<sup>Required</sup> <a name="instanceId" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instanceId"></a>

```typescript
public readonly instanceId: string;
```

- *Type:* string

The instance's ID.

---

##### `instancePrivateDnsName`<sup>Required</sup> <a name="instancePrivateDnsName" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateDnsName"></a>

```typescript
public readonly instancePrivateDnsName: string;
```

- *Type:* string

Private DNS name for this instance.

---

##### `instancePrivateIp`<sup>Required</sup> <a name="instancePrivateIp" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePrivateIp"></a>

```typescript
public readonly instancePrivateIp: string;
```

- *Type:* string

Private IP for this instance.

---

##### `instancePublicDnsName`<sup>Required</sup> <a name="instancePublicDnsName" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicDnsName"></a>

```typescript
public readonly instancePublicDnsName: string;
```

- *Type:* string

Publicly-routable DNS name for this instance.

(May be an empty string if the instance does not have a public name).

---

##### `instancePublicIp`<sup>Required</sup> <a name="instancePublicIp" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.instancePublicIp"></a>

```typescript
public readonly instancePublicIp: string;
```

- *Type:* string

Publicly-routable IP  address for this instance.

(May be an empty string if the instance does not have a public IP).

---

##### `osType`<sup>Required</sup> <a name="osType" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.osType"></a>

```typescript
public readonly osType: OperatingSystemType;
```

- *Type:* aws-cdk-lib.aws_ec2.OperatingSystemType

The type of OS the instance is running.

---

##### `role`<sup>Required</sup> <a name="role" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The IAM role assumed by the instance.

---

##### `userData`<sup>Required</sup> <a name="userData" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.userData"></a>

```typescript
public readonly userData: UserData;
```

- *Type:* aws-cdk-lib.aws_ec2.UserData

UserData for the instance.

---


### DrainFunction <a name="DrainFunction" id="@yanu23/cdk-gitlab-runner.DrainFunction"></a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.DrainFunction.Initializer"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

new DrainFunction(scope: Construct, id: string, props: DrainFunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DrainFunction.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainFunction.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.grantInvokeCompositePrincipal">grantInvokeCompositePrincipal</a></code> | Grant multiple principals the ability to invoke this Lambda via CompositePrincipal. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addAlias">addAlias</a></code> | Defines an alias for this function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.invalidateVersionBasedOn">invalidateVersionBasedOn</a></code> | Mix additional information into the hash of the Version object. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DrainFunction.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@yanu23/cdk-gitlab-runner.DrainFunction.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@yanu23/cdk-gitlab-runner.DrainFunction.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEventSource"></a>

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

###### `source`<sup>Required</sup> <a name="source" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="@yanu23/cdk-gitlab-runner.DrainFunction.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DrainFunction.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="@yanu23/cdk-gitlab-runner.DrainFunction.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainFunction.addPermission.parameter.id"></a>

- *Type:* string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="@yanu23/cdk-gitlab-runner.DrainFunction.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="@yanu23/cdk-gitlab-runner.DrainFunction.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="@yanu23/cdk-gitlab-runner.DrainFunction.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="@yanu23/cdk-gitlab-runner.DrainFunction.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DrainFunction.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="@yanu23/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="@yanu23/cdk-gitlab-runner.DrainFunction.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="@yanu23/cdk-gitlab-runner.DrainFunction.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.DrainFunction.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeCompositePrincipal` <a name="grantInvokeCompositePrincipal" id="@yanu23/cdk-gitlab-runner.DrainFunction.grantInvokeCompositePrincipal"></a>

```typescript
public grantInvokeCompositePrincipal(compositePrincipal: CompositePrincipal): Grant[]
```

Grant multiple principals the ability to invoke this Lambda via CompositePrincipal.

###### `compositePrincipal`<sup>Required</sup> <a name="compositePrincipal" id="@yanu23/cdk-gitlab-runner.DrainFunction.grantInvokeCompositePrincipal.parameter.compositePrincipal"></a>

- *Type:* aws-cdk-lib.aws_iam.CompositePrincipal

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="@yanu23/cdk-gitlab-runner.DrainFunction.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.DrainFunction.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="@yanu23/cdk-gitlab-runner.DrainFunction.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@yanu23/cdk-gitlab-runner.DrainFunction.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="@yanu23/cdk-gitlab-runner.DrainFunction.addAlias"></a>

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

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="@yanu23/cdk-gitlab-runner.DrainFunction.addAlias.parameter.aliasName"></a>

- *Type:* string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DrainFunction.addAlias.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="@yanu23/cdk-gitlab-runner.DrainFunction.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="@yanu23/cdk-gitlab-runner.DrainFunction.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="@yanu23/cdk-gitlab-runner.DrainFunction.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

##### `invalidateVersionBasedOn` <a name="invalidateVersionBasedOn" id="@yanu23/cdk-gitlab-runner.DrainFunction.invalidateVersionBasedOn"></a>

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

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.DrainFunction.invalidateVersionBasedOn.parameter.x"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.classifyVersionProperty">classifyVersionProperty</a></code> | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionArn">fromFunctionArn</a></code> | Import a lambda function into the CDK using its ARN. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes">fromFunctionAttributes</a></code> | Creates a Lambda function object which represents a function not defined within this stack. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionName">fromFunctionName</a></code> | Import a lambda function into the CDK using its name. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAll">metricAll</a></code> | Return the given named metric for this Lambda. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code> | Metric for the number of concurrent executions across all Lambdas. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAllDuration">metricAllDuration</a></code> | Metric for the Duration executing all Lambdas. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAllErrors">metricAllErrors</a></code> | Metric for the number of Errors executing all Lambdas. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAllInvocations">metricAllInvocations</a></code> | Metric for the number of invocations of all Lambdas. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAllThrottles">metricAllThrottles</a></code> | Metric for the number of throttled invocations of all Lambdas. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.DrainFunction.isConstruct"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.DrainFunction.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@yanu23/cdk-gitlab-runner.DrainFunction.isOwnedResource"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@yanu23/cdk-gitlab-runner.DrainFunction.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@yanu23/cdk-gitlab-runner.DrainFunction.isResource"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@yanu23/cdk-gitlab-runner.DrainFunction.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="@yanu23/cdk-gitlab-runner.DrainFunction.classifyVersionProperty"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="@yanu23/cdk-gitlab-runner.DrainFunction.classifyVersionProperty.parameter.propertyName"></a>

- *Type:* string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="@yanu23/cdk-gitlab-runner.DrainFunction.classifyVersionProperty.parameter.locked"></a>

- *Type:* boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionArn"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

For `Function.addPermissions()` to work on this imported lambda, make sure that is
in the same account and region as the stack you are importing it into.

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionArn.parameter.id"></a>

- *Type:* string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionArn.parameter.functionArn"></a>

- *Type:* string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

For `Function.addPermissions()` to work on this imported lambda, set the sameEnvironment property to true
if this imported lambda is in the same account and region as the stack you are importing it into.

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes.parameter.id"></a>

- *Type:* string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionName"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionName.parameter.id"></a>

- *Type:* string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="@yanu23/cdk-gitlab-runner.DrainFunction.fromFunctionName.parameter.functionName"></a>

- *Type:* string

---

##### `metricAll` <a name="metricAll" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAll"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAll.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAll.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllConcurrentExecutions"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllDuration"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllErrors"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllInvocations"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllThrottles"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { DrainFunction } from '@yanu23/cdk-gitlab-runner'

DrainFunction.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainFunction.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64). |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.functionArn">functionArn</a></code> | <code>string</code> | ARN of this function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.functionName">functionName</a></code> | <code>string</code> | Name of this function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this function. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime configured for this lambda. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout configured for this lambda. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@yanu23/cdk-gitlab-runner.DrainFunction.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

The timeout configured for this lambda.

---


### DrainStateMachine <a name="DrainStateMachine" id="@yanu23/cdk-gitlab-runner.DrainStateMachine"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.IDrainStateMachine">IDrainStateMachine</a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer"></a>

```typescript
import { DrainStateMachine } from '@yanu23/cdk-gitlab-runner'

new DrainStateMachine(scope: Construct, id: string, props: DrainStateMachineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachineProps">DrainStateMachineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DrainStateMachineProps">DrainStateMachineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.isConstruct"></a>

```typescript
import { DrainStateMachine } from '@yanu23/cdk-gitlab-runner'

DrainStateMachine.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.property.drainFunction">drainFunction</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction">DrainFunction</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine.property.stateMachine">stateMachine</a></code> | <code>aws-cdk-lib.aws_stepfunctions.IStateMachine</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `drainFunction`<sup>Required</sup> <a name="drainFunction" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.property.drainFunction"></a>

```typescript
public readonly drainFunction: DrainFunction;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DrainFunction">DrainFunction</a>

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="@yanu23/cdk-gitlab-runner.DrainStateMachine.property.stateMachine"></a>

```typescript
public readonly stateMachine: IStateMachine;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.IStateMachine

---


### GitLabCacheBucket <a name="GitLabCacheBucket" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.ICacheBucket">ICacheBucket</a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer"></a>

```typescript
import { GitLabCacheBucket } from '@yanu23/cdk-gitlab-runner'

new GitLabCacheBucket(scope: Construct, id: string, props: GitLabCacheBucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps">GitLabCacheBucketProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps">GitLabCacheBucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite">grantReadWrite</a></code> | Grant read and write access to the bucket to the grantee. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `grantReadWrite` <a name="grantReadWrite" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite"></a>

```typescript
public grantReadWrite(grantee: IPrincipal): void
```

Grant read and write access to the bucket to the grantee.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.isConstruct"></a>

```typescript
import { GitLabCacheBucket } from '@yanu23/cdk-gitlab-runner'

GitLabCacheBucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | The bucket that was created for the cache. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucket.property.bucket"></a>

```typescript
public readonly bucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

The bucket that was created for the cache.

---


### GitLabRunner <a name="GitLabRunner" id="@yanu23/cdk-gitlab-runner.GitLabRunner"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner">IGitLabRunner</a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer"></a>

```typescript
import { GitLabRunner } from '@yanu23/cdk-gitlab-runner'

new GitLabRunner(scope: Construct, id: string, props: GitLabRunnerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunnerProps">GitLabRunnerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GitLabRunner.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabRunnerProps">GitLabRunnerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.addCache">addCache</a></code> | Adds a cache to the GitLab Runner configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.addDockerExecutor">addDockerExecutor</a></code> | Adds a Docker executor to the GitLab Runner configuration. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.GitLabRunner.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addCache` <a name="addCache" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addCache"></a>

```typescript
public addCache(bucketPrefix?: string, cacheDuration?: Duration): void
```

Adds a cache to the GitLab Runner configuration.

*Example*

```typescript
runner.addCache('my-cache', Duration.days(7));
```


###### `bucketPrefix`<sup>Optional</sup> <a name="bucketPrefix" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addCache.parameter.bucketPrefix"></a>

- *Type:* string

the prefix for the S3 bucket used for caching.

---

###### `cacheDuration`<sup>Optional</sup> <a name="cacheDuration" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addCache.parameter.cacheDuration"></a>

- *Type:* aws-cdk-lib.Duration

the duration for which the cache is valid.

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addDockerExecutor"></a>

```typescript
public addDockerExecutor(type: DockerExecutorType, props: DockerExecutorAttributes): void
```

Adds a Docker executor to the GitLab Runner configuration.

###### `type`<sup>Required</sup> <a name="type" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addDockerExecutor.parameter.type"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a>

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addDockerExecutor.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes">DockerExecutorAttributes</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.GitLabRunner.isConstruct"></a>

```typescript
import { GitLabRunner } from '@yanu23/cdk-gitlab-runner'

GitLabRunner.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.GitLabRunner.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | The AWS KMS key used for encrypting stored data by the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | The URL of the gitlab instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.property.glConfig">glConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | Configuration details for the GitLab Runner, including job concurrency and authentication details. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunner.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The secret used for token authentication. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.GitLabRunner.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="@yanu23/cdk-gitlab-runner.GitLabRunner.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key

The AWS KMS key used for encrypting stored data by the GitLab Runner.

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.GitLabRunner.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

The URL of the gitlab instance.

---

##### `glConfig`<sup>Required</sup> <a name="glConfig" id="@yanu23/cdk-gitlab-runner.GitLabRunner.property.glConfig"></a>

```typescript
public readonly glConfig: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

Configuration details for the GitLab Runner, including job concurrency and authentication details.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.GitLabRunner.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The secret used for token authentication.

---


### GlCfnInit <a name="GlCfnInit" id="@yanu23/cdk-gitlab-runner.GlCfnInit"></a>

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.GlCfnInit.Initializer"></a>

```typescript
import { GlCfnInit } from '@yanu23/cdk-gitlab-runner'

new GlCfnInit(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@yanu23/cdk-gitlab-runner.GlCfnInit.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.GlCfnInit.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.addAwsCfnBootstrap">addAwsCfnBootstrap</a></code> | Adds the aws-cfn-bootstrap package to the user data of the instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.createInit">createInit</a></code> | Creates a CloudFormation Init to register a gitlab runner. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yanu23/cdk-gitlab-runner.GlCfnInit.isConstruct"></a>

```typescript
import { GlCfnInit } from '@yanu23/cdk-gitlab-runner'

GlCfnInit.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yanu23/cdk-gitlab-runner.GlCfnInit.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `addAwsCfnBootstrap` <a name="addAwsCfnBootstrap" id="@yanu23/cdk-gitlab-runner.GlCfnInit.addAwsCfnBootstrap"></a>

```typescript
import { GlCfnInit } from '@yanu23/cdk-gitlab-runner'

GlCfnInit.addAwsCfnBootstrap(target: Instance | AutoScalingGroup)
```

Adds the aws-cfn-bootstrap package to the user data of the instance.

###### `target`<sup>Required</sup> <a name="target" id="@yanu23/cdk-gitlab-runner.GlCfnInit.addAwsCfnBootstrap.parameter.target"></a>

- *Type:* aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

##### `createInit` <a name="createInit" id="@yanu23/cdk-gitlab-runner.GlCfnInit.createInit"></a>

```typescript
import { GlCfnInit } from '@yanu23/cdk-gitlab-runner'

GlCfnInit.createInit(that: Construct, props: GlCfnInitProps)
```

Creates a CloudFormation Init to register a gitlab runner.

###### `that`<sup>Required</sup> <a name="that" id="@yanu23/cdk-gitlab-runner.GlCfnInit.createInit.parameter.that"></a>

- *Type:* constructs.Construct

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GlCfnInit.createInit.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GlCfnInitProps">GlCfnInitProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.GlCfnInit.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### AutoScalingConfig <a name="AutoScalingConfig" id="@yanu23/cdk-gitlab-runner.AutoScalingConfig"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.AutoScalingConfig.Initializer"></a>

```typescript
import { AutoScalingConfig } from '@yanu23/cdk-gitlab-runner'

const autoScalingConfig: AutoScalingConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig.property.desiredCapacity">desiredCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig.property.maxCapacity">maxCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig.property.minCapacity">minCapacity</a></code> | <code>number</code> | *No description.* |

---

##### `desiredCapacity`<sup>Required</sup> <a name="desiredCapacity" id="@yanu23/cdk-gitlab-runner.AutoScalingConfig.property.desiredCapacity"></a>

```typescript
public readonly desiredCapacity: number;
```

- *Type:* number

---

##### `maxCapacity`<sup>Required</sup> <a name="maxCapacity" id="@yanu23/cdk-gitlab-runner.AutoScalingConfig.property.maxCapacity"></a>

```typescript
public readonly maxCapacity: number;
```

- *Type:* number

---

##### `minCapacity`<sup>Required</sup> <a name="minCapacity" id="@yanu23/cdk-gitlab-runner.AutoScalingConfig.property.minCapacity"></a>

```typescript
public readonly minCapacity: number;
```

- *Type:* number

---

### BaseDockerExecutorProps <a name="BaseDockerExecutorProps" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.Initializer"></a>

```typescript
import { BaseDockerExecutorProps } from '@yanu23/cdk-gitlab-runner'

const baseDockerExecutorProps: BaseDockerExecutorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.config">config</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.vpcConfig">vpcConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code> | The VPC where the runner should run. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config. |

---

##### `config`<sup>Required</sup> <a name="config" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

### ConfigDockerExecutor <a name="ConfigDockerExecutor" id="@yanu23/cdk-gitlab-runner.ConfigDockerExecutor"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.Initializer"></a>

```typescript
import { ConfigDockerExecutor } from '@yanu23/cdk-gitlab-runner'

const configDockerExecutor: ConfigDockerExecutor = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.disableCache">disableCache</a></code> | <code>boolean</code> | build cache for docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.gitlabImage">gitlabImage</a></code> | <code>string</code> | default image for docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.privileged">privileged</a></code> | <code>boolean</code> | default mode for containers. |
| <code><a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.volumes">volumes</a></code> | <code>string[]</code> | volumes for docker executor. |

---

##### `disableCache`<sup>Optional</sup> <a name="disableCache" id="@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.disableCache"></a>

```typescript
public readonly disableCache: boolean;
```

- *Type:* boolean
- *Default:* false

build cache for docker executor.

---

##### `gitlabImage`<sup>Optional</sup> <a name="gitlabImage" id="@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.gitlabImage"></a>

```typescript
public readonly gitlabImage: string;
```

- *Type:* string
- *Default:* ubuntu:20.04

default image for docker executor.

---

##### `privileged`<sup>Optional</sup> <a name="privileged" id="@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.privileged"></a>

```typescript
public readonly privileged: boolean;
```

- *Type:* boolean
- *Default:* false

default mode for containers.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="@yanu23/cdk-gitlab-runner.ConfigDockerExecutor.property.volumes"></a>

```typescript
public readonly volumes: string[];
```

- *Type:* string[]
- *Default:* ["/var/run/docker.sock:/var/run/docker.sock", "/cache:/cache", "/home/gitlab-runner/.aws/credentials:/etc/.aws/credentials:rw"]

volumes for docker executor.

---

### DockerExecutorAttributes <a name="DockerExecutorAttributes" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.Initializer"></a>

```typescript
import { DockerExecutorAttributes } from '@yanu23/cdk-gitlab-runner'

const dockerExecutorAttributes: DockerExecutorAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The instance type of the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The machine image of the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.vpcConfig">vpcConfig</a></code> | <code>aws-cdk-lib.aws_stepfunctions_tasks.VpcConfig</code> | The VPC configuration of the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling configuration of the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.configProp">configProp</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps">DockerExecutorConfigProps</a></code> | The configuration of the Docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.tags">tags</a></code> | <code>string[]</code> | The tags of the GitLab Runner. |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

The instance type of the GitLab Runner.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

The machine image of the GitLab Runner.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- *Type:* aws-cdk-lib.aws_stepfunctions_tasks.VpcConfig

The VPC configuration of the GitLab Runner.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling configuration of the GitLab Runner.

---

##### `configProp`<sup>Optional</sup> <a name="configProp" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.configProp"></a>

```typescript
public readonly configProp: DockerExecutorConfigProps;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps">DockerExecutorConfigProps</a>

The configuration of the Docker executor.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

The tags of the GitLab Runner.

---

### DockerExecutorAutoscalingProps <a name="DockerExecutorAutoscalingProps" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.Initializer"></a>

```typescript
import { DockerExecutorAutoscalingProps } from '@yanu23/cdk-gitlab-runner'

const dockerExecutorAutoscalingProps: DockerExecutorAutoscalingProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.config">config</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.vpcConfig">vpcConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code> | The VPC where the runner should run. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config. |

---

##### `config`<sup>Required</sup> <a name="config" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

### DockerExecutorConfigProps <a name="DockerExecutorConfigProps" id="@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.Initializer"></a>

```typescript
import { DockerExecutorConfigProps } from '@yanu23/cdk-gitlab-runner'

const dockerExecutorConfigProps: DockerExecutorConfigProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.disableIpv4">disableIpv4</a></code> | <code>boolean</code> | Whether to disable IPv4 for the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.image">image</a></code> | <code>string</code> | default image for docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.privileged">privileged</a></code> | <code>boolean</code> | default privileged for docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.volumes">volumes</a></code> | <code>string[]</code> | default volumes for docker executor. |

---

##### `disableIpv4`<sup>Optional</sup> <a name="disableIpv4" id="@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.disableIpv4"></a>

```typescript
public readonly disableIpv4: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable IPv4 for the GitLab Runner.

---

##### `image`<sup>Optional</sup> <a name="image" id="@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string
- *Default:* ubuntu:latest

default image for docker executor.

---

##### `privileged`<sup>Optional</sup> <a name="privileged" id="@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.privileged"></a>

```typescript
public readonly privileged: boolean;
```

- *Type:* boolean
- *Default:* false

default privileged for docker executor.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.volumes"></a>

```typescript
public readonly volumes: string[];
```

- *Type:* string[]
- *Default:* []

default volumes for docker executor.

---

### DockerExecutorInstanceProps <a name="DockerExecutorInstanceProps" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.Initializer"></a>

```typescript
import { DockerExecutorInstanceProps } from '@yanu23/cdk-gitlab-runner'

const dockerExecutorInstanceProps: DockerExecutorInstanceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.config">config</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.vpcConfig">vpcConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code> | The VPC where the runner should run. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config. |

---

##### `config`<sup>Required</sup> <a name="config" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

### DockerExecutorProps <a name="DockerExecutorProps" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.Initializer"></a>

```typescript
import { DockerExecutorProps } from '@yanu23/cdk-gitlab-runner'

const dockerExecutorProps: DockerExecutorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.config">config</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.vpcConfig">vpcConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a></code> | The VPC where the runner should run. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | The autoscaling config. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.dockerExecutorType">dockerExecutorType</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a></code> | Choose the docker executor type. |

---

##### `config`<sup>Required</sup> <a name="config" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

The Instance Type used by the docker executor.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

The AMI used by the runner.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab authentification token secret.

---

##### `vpcConfig`<sup>Required</sup> <a name="vpcConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.vpcConfig"></a>

```typescript
public readonly vpcConfig: VpcConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.VpcConfig">VpcConfig</a>

The VPC where the runner should run.

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

The autoscaling config.

---

##### `dockerExecutorType`<sup>Required</sup> <a name="dockerExecutorType" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.dockerExecutorType"></a>

```typescript
public readonly dockerExecutorType: DockerExecutorType;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a>

Choose the docker executor type.

---

### DrainFunctionProps <a name="DrainFunctionProps" id="@yanu23/cdk-gitlab-runner.DrainFunctionProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DrainFunctionProps.Initializer"></a>

```typescript
import { DrainFunctionProps } from '@yanu23/cdk-gitlab-runner'

const drainFunctionProps: DrainFunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps.property.autoScalingGroup">autoScalingGroup</a></code> | <code>aws-cdk-lib.aws_autoscaling.IAutoScalingGroup</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps.property.gitEndpoint">gitEndpoint</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |

---

##### `autoScalingGroup`<sup>Required</sup> <a name="autoScalingGroup" id="@yanu23/cdk-gitlab-runner.DrainFunctionProps.property.autoScalingGroup"></a>

```typescript
public readonly autoScalingGroup: IAutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_autoscaling.IAutoScalingGroup

---

##### `gitEndpoint`<sup>Required</sup> <a name="gitEndpoint" id="@yanu23/cdk-gitlab-runner.DrainFunctionProps.property.gitEndpoint"></a>

```typescript
public readonly gitEndpoint: string;
```

- *Type:* string

---

##### `secret`<sup>Required</sup> <a name="secret" id="@yanu23/cdk-gitlab-runner.DrainFunctionProps.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

### DrainStateMachineProps <a name="DrainStateMachineProps" id="@yanu23/cdk-gitlab-runner.DrainStateMachineProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.DrainStateMachineProps.Initializer"></a>

```typescript
import { DrainStateMachineProps } from '@yanu23/cdk-gitlab-runner'

const drainStateMachineProps: DrainStateMachineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachineProps.property.autoScalingGroup">autoScalingGroup</a></code> | <code>aws-cdk-lib.aws_autoscaling.IAutoScalingGroup</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DrainStateMachineProps.property.functionProps">functionProps</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a></code> | *No description.* |

---

##### `autoScalingGroup`<sup>Required</sup> <a name="autoScalingGroup" id="@yanu23/cdk-gitlab-runner.DrainStateMachineProps.property.autoScalingGroup"></a>

```typescript
public readonly autoScalingGroup: IAutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_autoscaling.IAutoScalingGroup

---

##### `functionProps`<sup>Required</sup> <a name="functionProps" id="@yanu23/cdk-gitlab-runner.DrainStateMachineProps.property.functionProps"></a>

```typescript
public readonly functionProps: DrainFunctionProps;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DrainFunctionProps">DrainFunctionProps</a>

---

### ExecutorProps <a name="ExecutorProps" id="@yanu23/cdk-gitlab-runner.ExecutorProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.ExecutorProps.Initializer"></a>

```typescript
import { ExecutorProps } from '@yanu23/cdk-gitlab-runner'

const executorProps: ExecutorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.ExecutorProps.property.config">config</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.ExecutorProps.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="@yanu23/cdk-gitlab-runner.ExecutorProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.ExecutorProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

### GitLabCacheBucketProps <a name="GitLabCacheBucketProps" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.Initializer"></a>

```typescript
import { GitLabCacheBucketProps } from '@yanu23/cdk-gitlab-runner'

const gitLabCacheBucketProps: GitLabCacheBucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | bucket encryption? |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.property.bucketNamePrefix">bucketNamePrefix</a></code> | <code>string</code> | bucketNamePrefix, so that it can follow your naming scheme. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.property.cacheDuration">cacheDuration</a></code> | <code>aws-cdk-lib.Duration</code> | How many days the objects should be cached. |

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key
- *Default:* key for the gitlab runner stack

bucket encryption?

---

##### `bucketNamePrefix`<sup>Optional</sup> <a name="bucketNamePrefix" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.property.bucketNamePrefix"></a>

```typescript
public readonly bucketNamePrefix: string;
```

- *Type:* string
- *Default:* {account}-{region}-gitlab-cache

bucketNamePrefix, so that it can follow your naming scheme.

---

##### `cacheDuration`<sup>Optional</sup> <a name="cacheDuration" id="@yanu23/cdk-gitlab-runner.GitLabCacheBucketProps.property.cacheDuration"></a>

```typescript
public readonly cacheDuration: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 7

How many days the objects should be cached.

---

### GitLabRunnerProps <a name="GitLabRunnerProps" id="@yanu23/cdk-gitlab-runner.GitLabRunnerProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.GitLabRunnerProps.Initializer"></a>

```typescript
import { GitLabRunnerProps } from '@yanu23/cdk-gitlab-runner'

const gitLabRunnerProps: GitLabRunnerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunnerProps.property.runnerConfig">runnerConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.RunnerConfig">RunnerConfig</a></code> | basic runner configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabRunnerProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | which encryption key to use. |

---

##### `runnerConfig`<sup>Required</sup> <a name="runnerConfig" id="@yanu23/cdk-gitlab-runner.GitLabRunnerProps.property.runnerConfig"></a>

```typescript
public readonly runnerConfig: RunnerConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.RunnerConfig">RunnerConfig</a>

basic runner configuration.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@yanu23/cdk-gitlab-runner.GitLabRunnerProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key
- *Default:* customer key per gitlab runner instance

which encryption key to use.

---

### GlCfnInitProps <a name="GlCfnInitProps" id="@yanu23/cdk-gitlab-runner.GlCfnInitProps"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.GlCfnInitProps.Initializer"></a>

```typescript
import { GlCfnInitProps } from '@yanu23/cdk-gitlab-runner'

const glCfnInitProps: GlCfnInitProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInitProps.property.config">config</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInitProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInitProps.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="@yanu23/cdk-gitlab-runner.GlCfnInitProps.property.config"></a>

```typescript
public readonly config: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.GlCfnInitProps.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.GlCfnInitProps.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

---

### GlConfigGeneratorProps <a name="GlConfigGeneratorProps" id="@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps"></a>

Properties for the GlConfigGenerator class.

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps.Initializer"></a>

```typescript
import { GlConfigGeneratorProps } from '@yanu23/cdk-gitlab-runner'

const glConfigGeneratorProps: GlConfigGeneratorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps.property.concurrent">concurrent</a></code> | <code>number</code> | How many jobs can run concurrently? |
| <code><a href="#@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | The gitlab url. |

---

##### `concurrent`<sup>Required</sup> <a name="concurrent" id="@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps.property.concurrent"></a>

```typescript
public readonly concurrent: number;
```

- *Type:* number

How many jobs can run concurrently?

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

The gitlab url.

---

### RunnerConfig <a name="RunnerConfig" id="@yanu23/cdk-gitlab-runner.RunnerConfig"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.RunnerConfig.Initializer"></a>

```typescript
import { RunnerConfig } from '@yanu23/cdk-gitlab-runner'

const runnerConfig: RunnerConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.RunnerConfig.property.token">token</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab Runner registration token. |
| <code><a href="#@yanu23/cdk-gitlab-runner.RunnerConfig.property.concurrent">concurrent</a></code> | <code>number</code> | The maximum number of concurrent jobs that the GitLab Runner will run. |
| <code><a href="#@yanu23/cdk-gitlab-runner.RunnerConfig.property.url">url</a></code> | <code>string</code> | The GitLab URL. |

---

##### `token`<sup>Required</sup> <a name="token" id="@yanu23/cdk-gitlab-runner.RunnerConfig.property.token"></a>

```typescript
public readonly token: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The GitLab Runner registration token.

---

##### `concurrent`<sup>Optional</sup> <a name="concurrent" id="@yanu23/cdk-gitlab-runner.RunnerConfig.property.concurrent"></a>

```typescript
public readonly concurrent: number;
```

- *Type:* number
- *Default:* 2

The maximum number of concurrent jobs that the GitLab Runner will run.

---

##### `url`<sup>Optional</sup> <a name="url" id="@yanu23/cdk-gitlab-runner.RunnerConfig.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string
- *Default:* https://gitlab.com/

The GitLab URL.

---

### VpcConfig <a name="VpcConfig" id="@yanu23/cdk-gitlab-runner.VpcConfig"></a>

#### Initializer <a name="Initializer" id="@yanu23/cdk-gitlab-runner.VpcConfig.Initializer"></a>

```typescript
import { VpcConfig } from '@yanu23/cdk-gitlab-runner'

const vpcConfig: VpcConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.VpcConfig.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.VpcConfig.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | *No description.* |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@yanu23/cdk-gitlab-runner.VpcConfig.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@yanu23/cdk-gitlab-runner.VpcConfig.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

---

## Classes <a name="Classes" id="Classes"></a>

### GitLabConfig <a name="GitLabConfig" id="@yanu23/cdk-gitlab-runner.GitLabConfig"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.IGitLabConfig">IGitLabConfig</a>

Generates a gitlab config toml file.

#### Initializers <a name="Initializers" id="@yanu23/cdk-gitlab-runner.GitLabConfig.Initializer"></a>

```typescript
import { GitLabConfig } from '@yanu23/cdk-gitlab-runner'

new GitLabConfig(props: GlConfigGeneratorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.Initializer.parameter.props">props</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps">GlConfigGeneratorProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GitLabConfig.Initializer.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GlConfigGeneratorProps">GlConfigGeneratorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.addCache">addCache</a></code> | Adds a cache to the configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.addDockerExecutor">addDockerExecutor</a></code> | Adds an executor to the configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.addEnvironment">addEnvironment</a></code> | Adds an environment variable to the configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.generateToml">generateToml</a></code> | Generates the GitLab configuration as a TOML string. |

---

##### `addCache` <a name="addCache" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addCache"></a>

```typescript
public addCache(scope: Construct, bucket: GitLabCacheBucket): void
```

Adds a cache to the configuration.

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addCache.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addCache.parameter.bucket"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket">GitLabCacheBucket</a>

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addDockerExecutor"></a>

```typescript
public addDockerExecutor(props?: ConfigDockerExecutor): void
```

Adds an executor to the configuration.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addDockerExecutor.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor">ConfigDockerExecutor</a>

---

##### `addEnvironment` <a name="addEnvironment" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

Adds an environment variable to the configuration.

###### `key`<sup>Required</sup> <a name="key" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addEnvironment.parameter.value"></a>

- *Type:* string

---

##### `generateToml` <a name="generateToml" id="@yanu23/cdk-gitlab-runner.GitLabConfig.generateToml"></a>

```typescript
public generateToml(): string
```

Generates the GitLab configuration as a TOML string.




## Protocols <a name="Protocols" id="Protocols"></a>

### ICacheBucket <a name="ICacheBucket" id="@yanu23/cdk-gitlab-runner.ICacheBucket"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket">GitLabCacheBucket</a>, <a href="#@yanu23/cdk-gitlab-runner.ICacheBucket">ICacheBucket</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.ICacheBucket.grantReadWrite">grantReadWrite</a></code> | Grant read and write access to the bucket to the grantee. |

---

##### `grantReadWrite` <a name="grantReadWrite" id="@yanu23/cdk-gitlab-runner.ICacheBucket.grantReadWrite"></a>

```typescript
public grantReadWrite(grantee: IPrincipal): void
```

Grant read and write access to the bucket to the grantee.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.ICacheBucket.grantReadWrite.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.ICacheBucket.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | The bucket that was created for the cache. |

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@yanu23/cdk-gitlab-runner.ICacheBucket.property.bucket"></a>

```typescript
public readonly bucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

The bucket that was created for the cache.

---

### IDockerExecutor <a name="IDockerExecutor" id="@yanu23/cdk-gitlab-runner.IDockerExecutor"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutor">DockerExecutor</a>, <a href="#@yanu23/cdk-gitlab-runner.IDockerExecutor">IDockerExecutor</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IDockerExecutor.addTaggingPermission">addTaggingPermission</a></code> | *No description.* |

---

##### `addTaggingPermission` <a name="addTaggingPermission" id="@yanu23/cdk-gitlab-runner.IDockerExecutor.addTaggingPermission"></a>

```typescript
public addTaggingPermission(grantee: IRole): void
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.IDockerExecutor.addTaggingPermission.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IDockerExecutor.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | *No description.* |

---

##### `executor`<sup>Required</sup> <a name="executor" id="@yanu23/cdk-gitlab-runner.IDockerExecutor.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

### IDrainStateMachine <a name="IDrainStateMachine" id="@yanu23/cdk-gitlab-runner.IDrainStateMachine"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.DrainStateMachine">DrainStateMachine</a>, <a href="#@yanu23/cdk-gitlab-runner.IDrainStateMachine">IDrainStateMachine</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IDrainStateMachine.property.drainFunction">drainFunction</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DrainFunction">DrainFunction</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.IDrainStateMachine.property.stateMachine">stateMachine</a></code> | <code>aws-cdk-lib.aws_stepfunctions.IStateMachine</code> | *No description.* |

---

##### `drainFunction`<sup>Required</sup> <a name="drainFunction" id="@yanu23/cdk-gitlab-runner.IDrainStateMachine.property.drainFunction"></a>

```typescript
public readonly drainFunction: DrainFunction;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DrainFunction">DrainFunction</a>

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="@yanu23/cdk-gitlab-runner.IDrainStateMachine.property.stateMachine"></a>

```typescript
public readonly stateMachine: IStateMachine;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.IStateMachine

---

### IExecutor <a name="IExecutor" id="@yanu23/cdk-gitlab-runner.IExecutor"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IExecutor.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | *No description.* |

---

##### `executor`<sup>Required</sup> <a name="executor" id="@yanu23/cdk-gitlab-runner.IExecutor.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---

### IGitLabConfig <a name="IGitLabConfig" id="@yanu23/cdk-gitlab-runner.IGitLabConfig"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>, <a href="#@yanu23/cdk-gitlab-runner.IGitLabConfig">IGitLabConfig</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabConfig.addCache">addCache</a></code> | Adds a cache to the configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabConfig.addDockerExecutor">addDockerExecutor</a></code> | Adds an executor to the configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabConfig.addEnvironment">addEnvironment</a></code> | Adds an environment variable to the configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabConfig.generateToml">generateToml</a></code> | Generates the GitLab configuration as a TOML string. |

---

##### `addCache` <a name="addCache" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addCache"></a>

```typescript
public addCache(scope: Construct, bucket: GitLabCacheBucket): void
```

Adds a cache to the configuration.

###### `scope`<sup>Required</sup> <a name="scope" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addCache.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addCache.parameter.bucket"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket">GitLabCacheBucket</a>

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addDockerExecutor"></a>

```typescript
public addDockerExecutor(props?: ConfigDockerExecutor): void
```

Adds an executor to the configuration.

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addDockerExecutor.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor">ConfigDockerExecutor</a>

The properties for the executor.

---

##### `addEnvironment` <a name="addEnvironment" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

Adds an environment variable to the configuration.

###### `key`<sup>Required</sup> <a name="key" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.addEnvironment.parameter.value"></a>

- *Type:* string

---

##### `generateToml` <a name="generateToml" id="@yanu23/cdk-gitlab-runner.IGitLabConfig.generateToml"></a>

```typescript
public generateToml(): string
```

Generates the GitLab configuration as a TOML string.


### IGitLabRunner <a name="IGitLabRunner" id="@yanu23/cdk-gitlab-runner.IGitLabRunner"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.GitLabRunner">GitLabRunner</a>, <a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner">IGitLabRunner</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner.addCache">addCache</a></code> | Adds a cache to the GitLab Runner configuration. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor">addDockerExecutor</a></code> | Adds a Docker executor to the GitLab Runner configuration. |

---

##### `addCache` <a name="addCache" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.addCache"></a>

```typescript
public addCache(bucketPrefix?: string, cacheDuration?: Duration): void
```

Adds a cache to the GitLab Runner configuration.

###### `bucketPrefix`<sup>Optional</sup> <a name="bucketPrefix" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.addCache.parameter.bucketPrefix"></a>

- *Type:* string

the prefix for the S3 bucket used for caching.

---

###### `cacheDuration`<sup>Optional</sup> <a name="cacheDuration" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.addCache.parameter.cacheDuration"></a>

- *Type:* aws-cdk-lib.Duration

the duration for which the cache is valid.

---

##### `addDockerExecutor` <a name="addDockerExecutor" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor"></a>

```typescript
public addDockerExecutor(type: DockerExecutorType, props: DockerExecutorAttributes): void
```

Adds a Docker executor to the GitLab Runner configuration.

*Example*

```typescript
runner.addDockerExecutor(DockerExecutorType.SINGLE_INSTANCE, {
  image: 'ubuntu:latest',
  privileged: true,
  volumes: ['/var/run/docker.sock:/var/run/docker.sock'],
});
```


###### `type`<sup>Required</sup> <a name="type" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor.parameter.type"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorType">DockerExecutorType</a>

the type of Docker executor.

---

###### `props`<sup>Required</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.addDockerExecutor.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes">DockerExecutorAttributes</a>

properties for the Docker executor.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | The AWS KMS key used for encrypting stored data by the GitLab Runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner.property.gitlabUrl">gitlabUrl</a></code> | <code>string</code> | The URL of the gitlab instance. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner.property.glConfig">glConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a></code> | Configuration details for the GitLab Runner, including job concurrency and authentication details. |
| <code><a href="#@yanu23/cdk-gitlab-runner.IGitLabRunner.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The secret used for token authentication. |

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key

The AWS KMS key used for encrypting stored data by the GitLab Runner.

---

##### `gitlabUrl`<sup>Required</sup> <a name="gitlabUrl" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.property.gitlabUrl"></a>

```typescript
public readonly gitlabUrl: string;
```

- *Type:* string

The URL of the gitlab instance.

---

##### `glConfig`<sup>Required</sup> <a name="glConfig" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.property.glConfig"></a>

```typescript
public readonly glConfig: GitLabConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.GitLabConfig">GitLabConfig</a>

Configuration details for the GitLab Runner, including job concurrency and authentication details.

---

##### `tokenSecret`<sup>Required</sup> <a name="tokenSecret" id="@yanu23/cdk-gitlab-runner.IGitLabRunner.property.tokenSecret"></a>

```typescript
public readonly tokenSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The secret used for token authentication.

---

## Enums <a name="Enums" id="Enums"></a>

### DockerExecutorType <a name="DockerExecutorType" id="@yanu23/cdk-gitlab-runner.DockerExecutorType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorType.AUTOSCALING">AUTOSCALING</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorType.SINGLE_INSTANCE">SINGLE_INSTANCE</a></code> | *No description.* |

---

##### `AUTOSCALING` <a name="AUTOSCALING" id="@yanu23/cdk-gitlab-runner.DockerExecutorType.AUTOSCALING"></a>

---


##### `SINGLE_INSTANCE` <a name="SINGLE_INSTANCE" id="@yanu23/cdk-gitlab-runner.DockerExecutorType.SINGLE_INSTANCE"></a>

---


### GitlabExecutor <a name="GitlabExecutor" id="@yanu23/cdk-gitlab-runner.GitlabExecutor"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitlabExecutor.DOCKER">DOCKER</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitlabExecutor.KUBERNETES">KUBERNETES</a></code> | *No description.* |

---

##### `DOCKER` <a name="DOCKER" id="@yanu23/cdk-gitlab-runner.GitlabExecutor.DOCKER"></a>

---


##### `KUBERNETES` <a name="KUBERNETES" id="@yanu23/cdk-gitlab-runner.GitlabExecutor.KUBERNETES"></a>

---

