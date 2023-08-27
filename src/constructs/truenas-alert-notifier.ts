import * as path from 'path';
import { User } from 'aws-cdk-lib/aws-iam';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { SqsSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { LambdaOptions } from './lambda-options';
import { LogLevel } from './log-levels';

export interface TrueNasAlertNotifierProps {
  /**
   * The webhook to post to.
   */
  readonly webhook: string;
  /**
   * The URL of the truenas instance
   */
  readonly truenasUrl?: string;
  /**
   * If current alerts should be displayed in embed
   */
  readonly displayCurrentAlerts?: boolean;
  /**
   * User to post to the webhook as
   */
  readonly webhookUser?: string;
  /**
   * The user avatar to use
   */
  readonly webhookAvatar?: string;
  /**
   * options to configure the lambda
   */
  readonly lambdaOptions?: LambdaOptions;
  /**
   * If an IAM role should be created TrueNAS to post to the SNS topic
   */
  readonly createIamRole?: boolean;
}

/**
 * A construct that creates a series of resources that allows TrueNAS SNS alerts to be sent to a discord webhook
 */
export class TrueNasAlertNotifier extends Construct {
  constructor(scope: Construct, id: string, props: TrueNasAlertNotifierProps) {
    super(scope, id);

    const topic = new Topic(this, 'topic', {
      topicName: 'TrueNasAlertTopic',
    });

    const queue = new Queue(this, 'queue');
    topic.addSubscription(new SqsSubscription(queue));

    const discordWebhook = new NodejsFunction(this, 'lambda', {
      entry: path.join(__dirname, '../lambdas/truenas-notifier-lambda.ts'),
      handler: 'lambdaHandler',
      runtime: Runtime.NODEJS_18_X,
      functionName: props?.lambdaOptions?.name ?? 'TrueNasAlertNotifier',
      architecture: props?.lambdaOptions?.architecture ?? Architecture.ARM_64,
      environment: {
        WEBHOOK: props.webhook,
        LOG_LEVEL: props?.lambdaOptions?.logLevel ?? LogLevel.INFO,
        TRUENAS_URL: props.truenasUrl ?? '',
        DISPLAY_CURRENT_ALERTS: 'true',
        WEBHOOK_USER: props.webhookUser ?? 'TrueNAS',
        WEBHOOK_AVATAR: props.webhookAvatar ?? '',
      },
      bundling: {
        externalModules: ['@aws-sdk', 'aws-lambda'],
      },
      logRetention: RetentionDays.ONE_MONTH,
    });
    if (props.lambdaOptions?.rolePolicy) {
      discordWebhook.role?.attachInlinePolicy(props.lambdaOptions.rolePolicy);
    }
    discordWebhook.addEventSource(new SqsEventSource(queue));

    if (props.createIamRole) {
      const iamRole = new User(this, 'user');
      topic.grantPublish(iamRole);
    }
  }
}