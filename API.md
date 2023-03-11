# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MonthlyCostNotifier <a name="MonthlyCostNotifier" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifier"></a>

A construct that creates a lambda function bundled with the 'monthly-notifier-lambda' code This is trigger via eventbridge on a schedule to post to a discord webhook for the monthly costts  WARNING: This lambda uses a pay per request API.

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


## Structs <a name="Structs" id="Structs"></a>

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
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.accountId">accountId</a></code> | <code>string</code> | The accountId this is being deployed to. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhook">webhook</a></code> | <code>string</code> | The webhook to post to. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaArchitecture">lambdaArchitecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The lambda architecture. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaLogLevel">lambdaLogLevel</a></code> | <code><a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel">LogLevel</a></code> | The lambda log level. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaName">lambdaName</a></code> | <code>string</code> | The lambda name. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaRolePolicy">lambdaRolePolicy</a></code> | <code>aws-cdk-lib.aws_iam.Policy</code> | An additional policy to attach to the lambda. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.ruleName">ruleName</a></code> | <code>string</code> | The eventbridge rule name. |
| <code><a href="#@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.ruleSchedule">ruleSchedule</a></code> | <code>aws-cdk-lib.aws_events.Schedule</code> | The eventbridge rule schedule. |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

The accountId this is being deployed to.

---

##### `webhook`<sup>Required</sup> <a name="webhook" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.webhook"></a>

```typescript
public readonly webhook: string;
```

- *Type:* string

The webhook to post to.

---

##### `lambdaArchitecture`<sup>Optional</sup> <a name="lambdaArchitecture" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaArchitecture"></a>

```typescript
public readonly lambdaArchitecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* ARM_64

The lambda architecture.

---

##### `lambdaLogLevel`<sup>Optional</sup> <a name="lambdaLogLevel" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaLogLevel"></a>

```typescript
public readonly lambdaLogLevel: LogLevel;
```

- *Type:* <a href="#@awlsring/cdk-aws-discord-notifiers.LogLevel">LogLevel</a>
- *Default:* MonthlyCostNotifier

The lambda log level.

---

##### `lambdaName`<sup>Optional</sup> <a name="lambdaName" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaName"></a>

```typescript
public readonly lambdaName: string;
```

- *Type:* string
- *Default:* MonthlyCostNotifier

The lambda name.

---

##### `lambdaRolePolicy`<sup>Optional</sup> <a name="lambdaRolePolicy" id="@awlsring/cdk-aws-discord-notifiers.MonthlyCostNotifierProps.property.lambdaRolePolicy"></a>

```typescript
public readonly lambdaRolePolicy: Policy;
```

- *Type:* aws-cdk-lib.aws_iam.Policy
- *Default:* none

An additional policy to attach to the lambda.

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

