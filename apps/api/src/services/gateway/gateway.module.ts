import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { WALLET_SERVICE } from './constants';
import { WalletController } from './wallet.controller';
import { ResponseInterceptor } from './response-interceptor';

@Module({
  imports: [
    ConfigurationModule,
    ClientsModule.register([
      {
        name: WALLET_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [ResponseInterceptor],
})
export class GatewayModule {}
