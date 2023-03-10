import { join } from 'path';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

/**
 * Properties for a MonthlyCostNotifier.
 */
export interface MonthlyCostNotifierProps {
  /**
   * The webhook token to post to.
   */
  readonly webhookToken: string;
  /**
   * The accountId this is being deployed to.
   */
  readonly accountId: string;
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
   * The lambda name
   *
   * @default MonthlyCostNotifier
   */
  readonly lambdaName?: string;
  /**
   * An additional policy to attach to the lambda
   *
   * @default none
   */
  readonly lambdaRolePolicy?: Policy;
  /**
   * The lambda architecture
   *
   * @default ARM_64
   */
  readonly lambdaArchitecture?: Architecture;
}

/**
 * A construct that creates a lambda function bundled with the 'monthly-notifier-lambda' code
 * This is trigger via eventbridge on a schedule to post to a discord webhook for the monthly costts
 *
 * WARNING: This lambda uses a pay per request API. Each call to cost explorer costs $0.01 USD.
 */
export class MonthlyCostNotifier extends Construct {
  constructor(scope: Construct, id: string, props: MonthlyCostNotifierProps) {
    super(scope, id);

    const lambda = new NodejsFunction(this, 'lambda', {
      entry: join(__dirname, '../lambdas/monthly-cost-lambda.ts'),
      handler: 'lambdaHandler',
      functionName: props.lambdaName ?? 'MonthlyCostNotifier',
      architecture: props.lambdaArchitecture ?? Architecture.ARM_64,
      environment: {
        TOKEN: props.webhookToken,
        ACCOUNT_ID: props.accountId,
      },
      bundling: {
        minify: false,
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

    if (props.lambdaRolePolicy) {
      lambda.role?.attachInlinePolicy(props.lambdaRolePolicy);
    }

    const lambdaTarget = new LambdaFunction(lambda);
    new Rule(this, 'rule', {
      ruleName: props.ruleName ?? 'MonthlyCostNotifierRule',
      schedule: props.ruleSchedule ?? Schedule.cron({ minute: '0', hour: '15', day: '1', month: '*', year: '*' }),
      targets: [lambdaTarget],
    });

  }
}