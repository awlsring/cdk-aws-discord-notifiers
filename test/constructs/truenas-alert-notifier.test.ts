import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TrueNasAlertNotifier } from '../../src/constructs/truenas-alert-notifier';

const CFN_LAMBDA = 'AWS::Lambda::Function';
const CFN_QUEUE = 'AWS::SQS::Queue';
const CFN_TOPIC = 'AWS::SNS::Topic';
const CFN_IAM_USER = 'AWS::IAM::User';

describe('MonthlyCostNotifier', () => {
  test('defaults synthesizes the way we expect', () => {
    const app = new App();

    const stack = new Stack(app, 'test');

    new TrueNasAlertNotifier(stack, 'notifier', {
      webhook: 'not a webhook',
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties(CFN_LAMBDA, {
      Handler: 'index.lambdaHandler',
      FunctionName: 'TrueNasAlertNotifier',
      Architectures: ['arm64'],
    });

    template.resourceCountIs(CFN_QUEUE, 1);
    template.resourceCountIs(CFN_TOPIC, 1);
  });

  test('synthesizes with user', () => {
    const app = new App();

    const stack = new Stack(app, 'test');

    new TrueNasAlertNotifier(stack, 'notifier', {
      webhook: 'not a webhook',
      createIamRole: true,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties(CFN_LAMBDA, {
      Handler: 'index.lambdaHandler',
      FunctionName: 'TrueNasAlertNotifier',
      Architectures: ['arm64'],
    });

    template.resourceCountIs(CFN_QUEUE, 1);
    template.resourceCountIs(CFN_TOPIC, 1);
    template.resourceCountIs(CFN_IAM_USER, 1);
  });
});
