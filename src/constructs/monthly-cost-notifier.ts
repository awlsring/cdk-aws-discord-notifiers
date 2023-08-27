import { join } from 'path';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { LambdaOptions } from './lambda-options';
import { LogLevel } from './log-levels';

/**
 * Properties for a MonthlyCostNotifier.
 */
export interface MonthlyCostNotifierProps {
  /**
   * The webhook to post to.
   */
  readonly webhook: string;
  /**
   * The accountId this is being deployed to.
   */
  readonly accountId?: string;
  /**
   * The name of the account this is being deployed to.
   */
  readonly accountName?: string;
  /**
   * User to post to the webhook as
   */
  readonly webhookUser?: string;
  /**
     * The user avatar to use
     */
  readonly webhookAvatar?: string;
  /**
   * The eventbridge rule name
   *
   * @default MonthlyCostNotifierRule
   */
  readonly ruleName?: string;
  /**
   * The eventbridge rule schedule
   *
   * @default - { minute: '0', hour: '15', day: '1', month: '*', year: '*' }
   */
  readonly ruleSchedule?: Schedule;
  /**
   * options to configure the lambda
   */
  readonly lambdaOptions?: LambdaOptions;
}

/**
 * A construct that creates a lambda function bundled with the 'monthly-notifier-lambda' code
 * This is trigger via eventbridge on a schedule to post to a discord webhook for the monthly costs
 *
 * WARNING: This lambda uses a pay per request API. Each call to cost explorer costs $0.01 USD.
 */
export class MonthlyCostNotifier extends Construct {
  constructor(scope: Construct, id: string, props: MonthlyCostNotifierProps) {
    super(scope, id);

    const lambda = new NodejsFunction(this, 'lambda', {
      entry: join(__dirname, '../../lambdas/monthly-cost-lambda.ts'),
      handler: 'lambdaHandler',
      runtime: Runtime.NODEJS_18_X,
      functionName: props.lambdaOptions?.name ?? 'MonthlyCostNotifier',
      architecture: props.lambdaOptions?.architecture ?? Architecture.ARM_64,
      environment: {
        WEBHOOK: props.webhook,
        LOG_LEVEL: props.lambdaOptions?.logLevel ?? LogLevel.INFO,
        WEBHOOK_USER: props.webhookUser ?? 'AWS Cost Reporter',
        WEBHOOK_AVATAR: props.webhookAvatar ?? '',
        AWS_ACCOUNT_ID: props.accountId ?? '',
        AWS_ACCOUNT_NAME: props.accountName ?? '',
      },
      bundling: {
        externalModules: ['@aws-sdk'],
      },
    });

    lambda.role?.attachInlinePolicy(new Policy(this, 'ce-all-policy', {
      statements: [
        new PolicyStatement({
          actions: ['ce:*'],
          effect: Effect.ALLOW,
          resources: ['*'],
        }),
      ],
    }));

    if (props.lambdaOptions?.rolePolicy) {
      lambda.role?.attachInlinePolicy(props.lambdaOptions.rolePolicy);
    }

    const lambdaTarget = new LambdaFunction(lambda);
    new Rule(this, 'rule', {
      ruleName: props.ruleName ?? 'MonthlyCostNotifierRule',
      schedule: props.ruleSchedule ?? Schedule.cron({ minute: '0', hour: '15', day: '1', month: '*', year: '*' }),
      targets: [lambdaTarget],
    });

  }
}