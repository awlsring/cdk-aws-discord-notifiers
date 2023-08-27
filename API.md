# AWS CDK Discord Notifier Constructs

This is a CDK construct library the vends constructs used to notify via discord about various resources and services.

## Constructs

The following constructs are available:

`MonthlyCostNotifier` - This construct will notify a discord webhook with a formatted embed of the monthly billing for the account.
`TrueNasAlertNotifier` - Creates resources to ingest a TrueNAS SNS alert by sending it to a lambda where it is parsed and sent to a discord webhook.

## Available Packages

This provider is built for the following languages:

* Javascript/Typescript
* Python
* C#

Details on how to find these packages are below and on [ConstructHub](https://constructs.dev/packages/@awlsring/cdk-aws-discord-notifiers)

### NPM

Javascript/Typescript package is available on NPM.

The npm package is viewable at https://www.npmjs.com/package/@awlsring/cdk-aws-discord-notifiers

```bash
npm install @awlsring/cdk-aws-discord-notifiers
```

### PyPi

Python package is available on PyPi.

The pypi package is viewable at https://pypi.org/project/cdk-aws-discord-notifiers/

```bash
pip install cdk-aws-discord-notifiers
```

### Nuget

C# package is available on Nuget.

The nuget package is viewable at https://www.nuget.org/packages/awlsring.CdkAwsDiscordNotifiers/

```bash
dotnet add package awlsring.CdkAwsDiscordNotifiers
```
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MonthlyCostNotifier <a name="MonthlyCostNotifier" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier"></a>

A construct that creates a lambda function bundled with the 'monthly-notifier-lambda' code This is trigger via eventbridge on a schedule to post to a discord webhook for the monthly costs  WARNING: This lambda uses a pay per request API.

Each call to cost explorer costs $0.01 USD.

#### Initializers <a name="Initializers" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer"></a>

```typescript
import { MonthlyCostNotifier } from '@awlsring/cdk-aws-discord-notifiers'

new MonthlyCostNotifier(scope: Construct, id: string, props: MonthlyCostNotifierProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer.parameter.props">props</a></code> | <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps">MonthlyCostNotifierProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.Initializer.parameter.props"></a>

- *Type:* <a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps">MonthlyCostNotifierProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.isConstruct"></a>

```typescript
import { MonthlyCostNotifier } from '@awlsring/cdk-aws-discord-notifiers'

MonthlyCostNotifier.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### TrueNasAlertNotifier <a name="TrueNasAlertNotifier" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier"></a>

A construct that creates a series of resources that allows TrueNAS SNS alerts to be sent to a discord webhook.

#### Initializers <a name="Initializers" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer"></a>

```typescript
import { TrueNasAlertNotifier } from '@awlsring/cdk-aws-discord-notifiers'

new TrueNasAlertNotifier(scope: Construct, id: string, props: TrueNasAlertNotifierProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer.parameter.props">props</a></code> | <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps">TrueNasAlertNotifierProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.Initializer.parameter.props"></a>

- *Type:* <a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps">TrueNasAlertNotifierProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.isConstruct"></a>

```typescript
import { TrueNasAlertNotifier } from '@awlsring/cdk-aws-discord-notifiers'

TrueNasAlertNotifier.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifier.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### LambdaOptions <a name="LambdaOptions" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions.Initializer"></a>

```typescript
import { LambdaOptions } from '@awlsring/cdk-aws-discord-notifiers'

const lambdaOptions: LambdaOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The lambda architecture. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.logLevel">logLevel</a></code> | <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel">LogLevel</a></code> | The lambda log level. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.name">name</a></code> | <code>string</code> | The lambda name. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.rolePolicy">rolePolicy</a></code> | <code>aws-cdk-lib.aws_iam.Policy</code> | An additional policy to attach to the lambda. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The lambda runtime. |

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* ARM_64

The lambda architecture.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.logLevel"></a>

```typescript
public readonly logLevel: LogLevel;
```

- *Type:* <a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel">LogLevel</a>
- *Default:* INFO

The lambda log level.

---

##### `name`<sup>Optional</sup> <a name="name" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* TrueNasAlertNotifier

The lambda name.

---

##### `rolePolicy`<sup>Optional</sup> <a name="rolePolicy" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.rolePolicy"></a>

```typescript
public readonly rolePolicy: Policy;
```

- *Type:* aws-cdk-lib.aws_iam.Policy
- *Default:* none

An additional policy to attach to the lambda.

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@awlsring/cdk-aws-discord-notifiers.LambdaOptions.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* NODES_LATEST

The lambda runtime.

---

### MonthlyCostNotifierProps <a name="MonthlyCostNotifierProps" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps"></a>

Properties for a MonthlyCostNotifier.

#### Initializer <a name="Initializer" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.Initializer"></a>

```typescript
import { MonthlyCostNotifierProps } from '@awlsring/cdk-aws-discord-notifiers'

const monthlyCostNotifierProps: MonthlyCostNotifierProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhook">webhook</a></code> | <code>string</code> | The webhook to post to. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.accountId">accountId</a></code> | <code>string</code> | The accountId this is being deployed to. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.accountName">accountName</a></code> | <code>string</code> | The name of the account this is being deployed to. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaOptions">lambdaOptions</a></code> | <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions">LambdaOptions</a></code> | options to configure the lambda. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.ruleName">ruleName</a></code> | <code>string</code> | The eventbridge rule name. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.ruleSchedule">ruleSchedule</a></code> | <code>aws-cdk-lib.aws_events.Schedule</code> | The eventbridge rule schedule. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhookAvatar">webhookAvatar</a></code> | <code>string</code> | The user avatar to use. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhookUser">webhookUser</a></code> | <code>string</code> | User to post to the webhook as. |

---

##### `webhook`<sup>Required</sup> <a name="webhook" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhook"></a>

```typescript
public readonly webhook: string;
```

- *Type:* string

The webhook to post to.

---

##### `accountId`<sup>Optional</sup> <a name="accountId" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

The accountId this is being deployed to.

---

##### `accountName`<sup>Optional</sup> <a name="accountName" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

The name of the account this is being deployed to.

---

##### `lambdaOptions`<sup>Optional</sup> <a name="lambdaOptions" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaOptions"></a>

```typescript
public readonly lambdaOptions: LambdaOptions;
```

- *Type:* <a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions">LambdaOptions</a>

options to configure the lambda.

---

##### `ruleName`<sup>Optional</sup> <a name="ruleName" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.ruleName"></a>

```typescript
public readonly ruleName: string;
```

- *Type:* string
- *Default:* MonthlyCostNotifierRule

The eventbridge rule name.

---

##### `ruleSchedule`<sup>Optional</sup> <a name="ruleSchedule" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.ruleSchedule"></a>

```typescript
public readonly ruleSchedule: Schedule;
```

- *Type:* aws-cdk-lib.aws_events.Schedule
- *Default:* { minute: '0', hour: '15', day: '1', month: '*', year: '*' }

The eventbridge rule schedule.

---

##### `webhookAvatar`<sup>Optional</sup> <a name="webhookAvatar" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhookAvatar"></a>

```typescript
public readonly webhookAvatar: string;
```

- *Type:* string

The user avatar to use.

---

##### `webhookUser`<sup>Optional</sup> <a name="webhookUser" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhookUser"></a>

```typescript
public readonly webhookUser: string;
```

- *Type:* string

User to post to the webhook as.

---

### TrueNasAlertNotifierProps <a name="TrueNasAlertNotifierProps" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps"></a>

#### Initializer <a name="Initializer" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.Initializer"></a>

```typescript
import { TrueNasAlertNotifierProps } from '@awlsring/cdk-aws-discord-notifiers'

const trueNasAlertNotifierProps: TrueNasAlertNotifierProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.webhook">webhook</a></code> | <code>string</code> | The webhook to post to. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.createIamRole">createIamRole</a></code> | <code>boolean</code> | If an IAM role should be created TrueNAS to post to the SNS topic. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.displayCurrentAlerts">displayCurrentAlerts</a></code> | <code>boolean</code> | If current alerts should be displayed in embed. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.lambdaOptions">lambdaOptions</a></code> | <code><a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions">LambdaOptions</a></code> | options to configure the lambda. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.truenasUrl">truenasUrl</a></code> | <code>string</code> | The URL of the truenas instance. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.webhookAvatar">webhookAvatar</a></code> | <code>string</code> | The user avatar to use. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.webhookUser">webhookUser</a></code> | <code>string</code> | User to post to the webhook as. |

---

##### `webhook`<sup>Required</sup> <a name="webhook" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.webhook"></a>

```typescript
public readonly webhook: string;
```

- *Type:* string

The webhook to post to.

---

##### `createIamRole`<sup>Optional</sup> <a name="createIamRole" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.createIamRole"></a>

```typescript
public readonly createIamRole: boolean;
```

- *Type:* boolean

If an IAM role should be created TrueNAS to post to the SNS topic.

---

##### `displayCurrentAlerts`<sup>Optional</sup> <a name="displayCurrentAlerts" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.displayCurrentAlerts"></a>

```typescript
public readonly displayCurrentAlerts: boolean;
```

- *Type:* boolean

If current alerts should be displayed in embed.

---

##### `lambdaOptions`<sup>Optional</sup> <a name="lambdaOptions" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.lambdaOptions"></a>

```typescript
public readonly lambdaOptions: LambdaOptions;
```

- *Type:* <a href="#@awlsring/cdk-aws-discord-notifiers.LambdaOptions">LambdaOptions</a>

options to configure the lambda.

---

##### `truenasUrl`<sup>Optional</sup> <a name="truenasUrl" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.truenasUrl"></a>

```typescript
public readonly truenasUrl: string;
```

- *Type:* string

The URL of the truenas instance.

---

##### `webhookAvatar`<sup>Optional</sup> <a name="webhookAvatar" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.webhookAvatar"></a>

```typescript
public readonly webhookAvatar: string;
```

- *Type:* string

The user avatar to use.

---

##### `webhookUser`<sup>Optional</sup> <a name="webhookUser" id="@awlsring/cdk-aws-discord-notifiers.TrueNasAlertNotifierProps.property.webhookUser"></a>

```typescript
public readonly webhookUser: string;
```

- *Type:* string

User to post to the webhook as.

---



## Enums <a name="Enums" id="Enums"></a>

### LogLevel <a name="LogLevel" id="@awlsring/cdk-aws-discord-notifiers.LogLevel"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel.TRACE">TRACE</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel.DEBUG">DEBUG</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel.INFO">INFO</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel.WARN">WARN</a></code> | *No description.* |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel.ERROR">ERROR</a></code> | *No description.* |

---

##### `TRACE` <a name="TRACE" id="@awlsring/cdk-aws-discord-notifiers.LogLevel.TRACE"></a>

---


##### `DEBUG` <a name="DEBUG" id="@awlsring/cdk-aws-discord-notifiers.LogLevel.DEBUG"></a>

---


##### `INFO` <a name="INFO" id="@awlsring/cdk-aws-discord-notifiers.LogLevel.INFO"></a>

---


##### `WARN` <a name="WARN" id="@awlsring/cdk-aws-discord-notifiers.LogLevel.WARN"></a>

---


##### `ERROR` <a name="ERROR" id="@awlsring/cdk-aws-discord-notifiers.LogLevel.ERROR"></a>

---

