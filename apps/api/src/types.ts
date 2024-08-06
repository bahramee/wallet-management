import { INestApplicationContext } from '@nestjs/common';

export enum SERVICE_TYPE {
  WALLET = 'Wallet',
  GATEWAY = 'Gateway',
}

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type AppFactory = () => Promise<INestApplicationContext>;

export interface Configuration {
  SERVICE_TYPE: SERVICE_TYPE;
  NODE_ENV: NODE_ENV;
}
