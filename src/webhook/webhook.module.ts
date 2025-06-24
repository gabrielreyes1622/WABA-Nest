// src/webhook/webhook.module.ts
import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WsGateway } from 'src/websocket.gateway';

@Module({
  controllers: [WebhookController],
    providers: [WsGateway], // ✅ aquí
})
export class WebhookModule {}
