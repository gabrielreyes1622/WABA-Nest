import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { WsGateway } from './websocket.gateway';

@Module({
  imports: [WebhookModule, WhatsAppModule],
  controllers: [AppController],
  providers: [AppService, WsGateway],
})
export class AppModule {}
