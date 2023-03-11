import { Logger } from 'tslog';

export interface LoggerConfig {
  readonly name: string;
  readonly logLevel?: string;
}

export function configureLogger(config: LoggerConfig) {
  const logger = new Logger({ name: config.name, minLevel: 3 });

  if (config.logLevel) {
    let level: number = 3;
    switch (config.logLevel) {
      case 'info': {
        level = 3;
        break;
      }
      case 'debug': {
        level = 2;
        break;
      }
      case 'trace': {
        level = 1;
        break;
      }
      case 'warn': {
        level = 4;
        break;
      }
      case 'error': {
        level = 5;
        break;
      }
      default: {
        logger.info(`Invalid log level: ${config.logLevel}. Defaulting to info`);
        break;
      }
    }
    logger.settings.minLevel = level;
  }
  return logger;
}