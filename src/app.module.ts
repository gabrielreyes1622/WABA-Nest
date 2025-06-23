import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [WebhookModule, WhatsAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
