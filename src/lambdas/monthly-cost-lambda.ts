import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';
import fetch from 'node-fetch';

async function getCostData(): Promise<string> {
  const date = new Date();
  const firstDayPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);

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
    const data = await client.send(command);
    console.log(`Cost data response: ${JSON.stringify(data)}`);

    const amountStr = data?.ResultsByTime?.[0].Total?.AmortizedCost.Amount;
    const currency = data?.ResultsByTime?.[0].Total?.AmortizedCost.Unit;

    var amount;
    if (amountStr) {
      amount = parseFloat(amountStr).toFixed(2);
    } else {
      throw Error('No amount returned');
    }
    const cost = `${amount} ${currency}`;
    return cost;
  } catch (error) {
    throw Error('Error calling Cost Explorer API');
  }
}

export const lambdaHandler = async () => {
  const account = process.env.ACCOUNT_ID;
  const token = process.env.TOKEN;
  const url = `https://canary.discord.com/api/webhooks/${token}`;

  const cost = await getCostData();

  const message = {
    username: 'AWS Monthly Cost',
    content: `Cost for account ${account} last month: ${cost}`,
  };

  console.log(`Message for Discord: ${message}`);

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(`Discord Response: ${JSON.stringify(response)}`);
};
