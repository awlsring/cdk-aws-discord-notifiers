import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';
import fetch from 'node-fetch';
import { configureLogger } from './common/logger';

const logger = configureLogger({ name: 'monthly-cost-lambda', logLevel: process.env.LOG_LEVEL });

export interface DiscordMessage {
  readonly username: string;
  readonly content: string;
}

async function getCostData(): Promise<string> {
  logger.debug('Getting cost data from Cost Explorer API');
  const date = new Date();
  const firstDayPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  logger.debug(`First day of previous month: ${firstDayPrevMonth}`);
  logger.debug(`Last day of previous month: ${lastDayPrevMonth}`);

  const client = new CostExplorerClient({ region: 'us-east-1' });

  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: firstDayPrevMonth.toISOString().split('T')[0],
      End: lastDayPrevMonth.toISOString().split('T')[0],
    },
    Granularity: 'MONTHLY',
    Metrics: ['AmortizedCost'],
  });

  try {
    logger.debug('Calling Cost Explorer API');
    const data = await client.send(command);
    logger.debug(`Cost data response: ${JSON.stringify(data)}`);

    const amountStr = data?.ResultsByTime?.[0].Total?.AmortizedCost.Amount;
    const currency = data?.ResultsByTime?.[0].Total?.AmortizedCost.Unit;
    logger.debug(`Amount: ${amountStr}`);
    logger.debug(`Currency: ${currency}`);

    var amount;
    if (amountStr) {
      amount = parseFloat(amountStr).toFixed(2);
    } else {
      logger.error('No amount returned');
      throw Error('No amount returned');
    }
    const cost = `${amount} ${currency}`;
    return cost;
  } catch (error) {
    logger.error(`Error calling Cost Explorer API: ${error}`);
    throw Error('Error calling Cost Explorer API');
  }
}

export const lambdaHandler = async () => {
  logger.info('Starting monthly cost lambda');

  logger.debug('Getting info from environment variables');
  const account = process.env.ACCOUNT_ID;
  const webhook = process.env.WEBHOOK;

  if (!account || !webhook) {
    logger.error('Missing environment variables');
    throw Error('Missing environment variables. ACCOUNT_ID and WEBHOOK must be set.');
  }

  const cost = await getCostData();
  logger.debug(`Cost: ${cost}`);

  const message = {
    username: 'AWS Monthly Cost',
    content: `Cost for account ${account} last month: ${cost}`,
  };
  logger.debug(`Message for Discord: ${message}`);

  const response = await fetch(webhook, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' },
  });

  logger.debug(`Discord Response: ${JSON.stringify(response)}`);
};
