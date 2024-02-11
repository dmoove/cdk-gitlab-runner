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
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutor.property.executor">executor</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a></code> | *No description.* |

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
public readonly executor: IExecutor;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a>

---


### DockerExecutorAutoscaling <a name="DockerExecutorAutoscaling" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a>

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

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

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

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `executor`<sup>Required</sup> <a name="executor" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

---


### DockerExecutorInstance <a name="DockerExecutorInstance" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance"></a>

- *Implements:* <a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a>

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

---

##### `toString` <a name="toString" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

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

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.executor">executor</a></code> | <code>aws-cdk-lib.aws_ec2.Instance \| aws-cdk-lib.aws_autoscaling.AutoScalingGroup</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `executor`<sup>Required</sup> <a name="executor" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstance.property.executor"></a>

```typescript
public readonly executor: Instance | AutoScalingGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.Instance | aws-cdk-lib.aws_autoscaling.AutoScalingGroup

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
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.grantReadWrite">grantReadWrite</a></code> | *No description.* |

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
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |

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

###### `bucketPrefix`<sup>Optional</sup> <a name="bucketPrefix" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addCache.parameter.bucketPrefix"></a>

- *Type:* string

---

###### `cacheDuration`<sup>Optional</sup> <a name="cacheDuration" id="@yanu23/cdk-gitlab-runner.GitLabRunner.addCache.parameter.cacheDuration"></a>

- *Type:* aws-cdk-lib.Duration

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
| <code><a href="#@yanu23/cdk-gitlab-runner.GlCfnInit.createInit">createInit</a></code> | *No description.* |

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
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where the runner should run. |
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

##### `vpc`<sup>Required</sup> <a name="vpc" id="@yanu23/cdk-gitlab-runner.BaseDockerExecutorProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

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
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.autoscalingConfig">autoscalingConfig</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.configProp">configProp</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps">DockerExecutorConfigProps</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.tags">tags</a></code> | <code>string[]</code> | *No description.* |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `autoscalingConfig`<sup>Optional</sup> <a name="autoscalingConfig" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.autoscalingConfig"></a>

```typescript
public readonly autoscalingConfig: AutoScalingConfig;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.AutoScalingConfig">AutoScalingConfig</a>

---

##### `configProp`<sup>Optional</sup> <a name="configProp" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.configProp"></a>

```typescript
public readonly configProp: DockerExecutorConfigProps;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps">DockerExecutorConfigProps</a>

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@yanu23/cdk-gitlab-runner.DockerExecutorAttributes.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

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
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where the runner should run. |
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

##### `vpc`<sup>Required</sup> <a name="vpc" id="@yanu23/cdk-gitlab-runner.DockerExecutorAutoscalingProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

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
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.image">image</a></code> | <code>string</code> | default image for docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.privileged">privileged</a></code> | <code>boolean</code> | default privileged for docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorConfigProps.property.volumes">volumes</a></code> | <code>string[]</code> | default volumes for docker executor. |

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
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where the runner should run. |
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

##### `vpc`<sup>Required</sup> <a name="vpc" id="@yanu23/cdk-gitlab-runner.DockerExecutorInstanceProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

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
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | The Instance Type used by the docker executor. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The AMI used by the runner. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.tokenSecret">tokenSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The GitLab authentification token secret. |
| <code><a href="#@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where the runner should run. |
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

##### `vpc`<sup>Required</sup> <a name="vpc" id="@yanu23/cdk-gitlab-runner.DockerExecutorProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

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

## Classes <a name="Classes" id="Classes"></a>

### GitLabConfig <a name="GitLabConfig" id="@yanu23/cdk-gitlab-runner.GitLabConfig"></a>

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
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.addCache">addCache</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.addDockerExecutor">addDockerExecutor</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.addEnvironment">addEnvironment</a></code> | *No description.* |
| <code><a href="#@yanu23/cdk-gitlab-runner.GitLabConfig.generateToml">generateToml</a></code> | *No description.* |

---

##### `addCache` <a name="addCache" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addCache"></a>

```typescript
public addCache(scope: Construct, bucket: GitLabCacheBucket): void
```

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

###### `props`<sup>Optional</sup> <a name="props" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addDockerExecutor.parameter.props"></a>

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.ConfigDockerExecutor">ConfigDockerExecutor</a>

---

##### `addEnvironment` <a name="addEnvironment" id="@yanu23/cdk-gitlab-runner.GitLabConfig.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

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




## Protocols <a name="Protocols" id="Protocols"></a>

### ICacheBucket <a name="ICacheBucket" id="@yanu23/cdk-gitlab-runner.ICacheBucket"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.GitLabCacheBucket">GitLabCacheBucket</a>, <a href="#@yanu23/cdk-gitlab-runner.ICacheBucket">ICacheBucket</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.ICacheBucket.grantReadWrite">grantReadWrite</a></code> | *No description.* |

---

##### `grantReadWrite` <a name="grantReadWrite" id="@yanu23/cdk-gitlab-runner.ICacheBucket.grantReadWrite"></a>

```typescript
public grantReadWrite(grantee: IPrincipal): void
```

###### `grantee`<sup>Required</sup> <a name="grantee" id="@yanu23/cdk-gitlab-runner.ICacheBucket.grantReadWrite.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yanu23/cdk-gitlab-runner.ICacheBucket.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@yanu23/cdk-gitlab-runner.ICacheBucket.property.bucket"></a>

```typescript
public readonly bucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

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
| <code><a href="#@yanu23/cdk-gitlab-runner.IDockerExecutor.property.executor">executor</a></code> | <code><a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a></code> | *No description.* |

---

##### `executor`<sup>Required</sup> <a name="executor" id="@yanu23/cdk-gitlab-runner.IDockerExecutor.property.executor"></a>

```typescript
public readonly executor: IExecutor;
```

- *Type:* <a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a>

---

### IExecutor <a name="IExecutor" id="@yanu23/cdk-gitlab-runner.IExecutor"></a>

- *Implemented By:* <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorAutoscaling">DockerExecutorAutoscaling</a>, <a href="#@yanu23/cdk-gitlab-runner.DockerExecutorInstance">DockerExecutorInstance</a>, <a href="#@yanu23/cdk-gitlab-runner.IExecutor">IExecutor</a>


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

