import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { MonthlyCostNotifier } from '../../src/constructs/monthly-cost-notifier';

describe('MonthlyCostNotifier', () => {
  test('defaults synthesizes the way we expect', () => {
    const app = new App();

    const stack = new Stack(app, 'test');

    new MonthlyCostNotifier(stack, 'notifier', {
      webhook: 'not a webhook',
      accountId: '00000000',
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.lambdaHandler',
      FunctionName: 'MonthlyCostNotifier',
      Architectures: ['arm64'],
    });

    template.hasResourceProperties('AWS::Events::Rule', {
      Name: 'MonthlyCostNotifierRule',
      ScheduleExpression: 'cron(0 15 1 * ? *)',
    });
  });

  test('synthesizes with custom props', () => {
    const app = new App();

    const stack = new Stack(app, 'test');

    new MonthlyCostNotifier(stack, 'notifier', {
      webhook: 'not a webhook',
      accountId: '00000000',
      ruleName: 'CustomRuleName',
      lambdaName: 'CustomFunctionName',
      ruleSchedule: Schedule.cron({ minute: '0', hour: '16', day: '1', month: '*', year: '*' }),
      lambdaArchitecture: Architecture.X86_64,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.lambdaHandler',
      FunctionName: 'CustomFunctionName',
      Architectures: ['x86_64'],
    });

    template.hasResourceProperties('AWS::Events::Rule', {
      Name: 'CustomRuleName',
      ScheduleExpression: 'cron(0 16 1 * ? *)',
    });
  });
});
