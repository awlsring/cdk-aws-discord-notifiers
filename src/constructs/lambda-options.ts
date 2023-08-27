import { Policy } from 'aws-cdk-lib/aws-iam';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LogLevel } from './log-levels';

export interface LambdaOptions {
  /**
   * The lambda runtime
   *
   * @default NODES_LATEST
   */
  readonly runtime?: Runtime;
  /**
   * The lambda name
   *
   * @default TrueNasAlertNotifier
   */
  readonly name?: string;
  /**
   * The lambda log level
   *
   * @default INFO
   */
  readonly logLevel?: LogLevel;
  /**
   * The lambda architecture
   *
   * @default ARM_64
   */
  readonly architecture?: Architecture;
  /**
 * An additional policy to attach to the lambda
 *
 * @default none
 */
  readonly rolePolicy?: Policy;
}