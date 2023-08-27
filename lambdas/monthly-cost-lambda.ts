import { CostExplorerClient, GetCostAndUsageCommand, GetCostAndUsageCommandOutput } from '@aws-sdk/client-cost-explorer';
import { Embed, EmbedColor, EmbedField, EmbedType, WebhookMessage, sendDiscordWebhookMessage } from './common/discord';
import { configureLogger } from './common/logger';

const AWS_IMAGE = 'https://marvel-b1-cdn.bc0a.com/f00000000243109/www.jdrf.org/wp-content/uploads/2020/12/AWS-logo-2.jpg';

interface Config {
  readonly webhook: string;
  readonly logLevel: string;
  readonly webhookUser: string;
  readonly webhookAvatar: string;
  readonly awsAccountId?: string;
  readonly awsAccountName?: string;
}

function loadConfig(): Config {
  if (process.env.WEBHOOK == '') {
    logger.fatal('WEBHOOK environment variable is not set');
    process.exit(1);
  }
  const config: Config = {
    webhook: process.env.WEBHOOK!,
    logLevel: process.env.LOG_LEVEL ?? 'info',
    webhookUser: process.env.WEBHOOK_USER ?? 'AWS Cost Reporter',
    webhookAvatar: process.env.WEBHOOK_AVATAR ?? AWS_IMAGE,
    awsAccountId: process.env.AWS_ACCOUNT_ID ?? undefined,
    awsAccountName: process.env.AWS_ACCOUNT_NAME ?? undefined,
  };
  return config;
}

const config = loadConfig();
const logger = configureLogger({ name: 'monthly-cost-lambda', logLevel: 'debug' });

export interface DiscordMessage {
  readonly username: string;
  readonly content: string;
}

export interface AwsCostCategory {
  readonly service: string;
  readonly amount: number;
  readonly unit: string;
}

export interface AwsCostReport {
  readonly categories: AwsCostCategory[];
  readonly total: number;
  readonly unit: string;
}

function parseCostData(data: GetCostAndUsageCommandOutput): AwsCostReport {
  let totalCost = 0;
  let unit = '';
  const categories: AwsCostCategory[] = [];
  for (const results of data.ResultsByTime ?? []) {
    for (const group of results.Groups ?? []) {
      if (!group.Keys?.[0]) {
        logger.warn(`Group has no keys: ${JSON.stringify(group)}`);
        continue;
      }
      const service = group.Keys?.[0];
      const amount = group.Metrics?.AmortizedCost.Amount;
      const roundedAmount = Math.round(parseFloat(amount ?? '0') * 100) / 100;

      if (roundedAmount == 0) {
        logger.info(`Skipping ${service} because cost is 0`);
        continue;
      }

      const localUnit = group.Metrics?.AmortizedCost.Unit ?? '';
      totalCost += roundedAmount;
      unit = localUnit;
      const cat = {
        service: service,
        amount: roundedAmount,
        unit: localUnit,
      };
      categories.push(cat);
    }
  }
  categories.sort((a, b) => b.amount - a.amount);

  return {
    categories: categories,
    total: totalCost,
    unit: unit,
  };
}

async function getCostData(): Promise<AwsCostReport> {
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
    GroupBy: [
      {
        Type: 'DIMENSION',
        Key: 'SERVICE',
      },
    ],
  });

  try {
    logger.debug('Calling Cost Explorer API');
    const data = await client.send(command);
    logger.debug(`Cost data response: ${console.log(JSON.stringify(data))}`);
    return parseCostData(data);
  } catch (error) {
    logger.error(`Error calling Cost Explorer API: ${error}`);
    throw error;
  }
}

function buildFields(report: AwsCostReport): EmbedField[] {
  const fields: EmbedField[] = [];

  for (const category of report.categories) {
    fields.push({
      name: category.service,
      value: `${category.amount} ${category.unit}`,
    });
  }

  return fields;
}

function formTitle(): string {
  if (config.awsAccountName && config.awsAccountId) {
    return `Monthly Cost Report for ${config.awsAccountName} (${config.awsAccountId})`;
  }
  if (config.awsAccountName) {
    return `Monthly Cost Report for ${config.awsAccountName}`;
  } else if (config.awsAccountId) {
    return `Monthly Cost Report for ${config.awsAccountId}`;
  } else {
    return 'Monthly Cost Report';
  }
}

function createWebhookMessage(report: AwsCostReport): WebhookMessage {
  const embed: Embed = {
    type: EmbedType.Rich,
    title: formTitle(),
    description: `Total Cost: ${report.total} ${report.unit}`,
    fields: buildFields(report),
    color: EmbedColor.Orange,
    thumbnail: {
      url: AWS_IMAGE,
    },
  };

  return {
    username: config.webhookUser,
    avatar_url: config.webhookAvatar,
    embeds: [embed],
  };
}

export const lambdaHandler = async () => {
  logger.info('Starting monthly cost lambda');

  const cost = await getCostData();
  logger.debug(`Cost Report: ${cost}`);

  const message = createWebhookMessage(cost);
  logger.debug(`Message for Discord: ${message}`);

  const response = await sendDiscordWebhookMessage(process.env.WEBHOOK!, message);
  logger.debug(`Discord Response: ${response}`);
};