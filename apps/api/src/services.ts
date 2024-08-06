import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayModule } from './services/gateway/gateway.module';
import { AppFactory, SERVICE_TYPE } from './types';
import { WalletModule } from './services/wallet/wallet.module';

const gatewayApp: AppFactory = async () => {
  const app = await NestFactory.create(GatewayModule);
  const swaggerConfig = new DocumentBuilder().setTitle('Gateway').build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDocument);
  app.enableCors({
    origin: '*',
  });
  await app.listen(4000);
  return app;
};

const walletApp: AppFactory = async() => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WalletModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats:4222'],
      },
    },
  );
  app.listen();
  return app;
}

export const SERVICES: Record<SERVICE_TYPE, AppFactory> = {
  [SERVICE_TYPE.WALLET]: walletApp,
  [SERVICE_TYPE.GATEWAY]: gatewayApp,
};
