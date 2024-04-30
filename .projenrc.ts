import { AwlsringAwsCdkLibrary } from '@awlsring/projen-commons';

const project = new AwlsringAwsCdkLibrary({
  constructsVersion: '10.1.52',
  cdkVersion: '2.55.0',
  name: 'cdk-aws-discord-notifiers',
  repositoryUrl: 'https://github.com/awlsring/cdk-aws-discord-notifiers.git',
  description:
    'A package that vends constructs to notify about AWS resources via discord',
  keywords: ['discord', 'notification', 'aws', 'billing'],
  deps: ['constructs@^10.1.52'],
  devDeps: ['constructs@10.1.52', 'esbuild'],
  publish: false,
  bundledDeps: [
    'pino',
    '@types/pino',
    'node-fetch',
    '@types/node-fetch',
    'aws-lambda',
    '@types/aws-lambda',
    '@aws-sdk/client-cost-explorer',
  ],
});
project.synth();
