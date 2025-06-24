import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppController } from './whatsapp.controller';
import { WsGateway } from 'src/websocket.gateway';

@Module({
      imports: [HttpModule],
  providers: [WhatsAppService, WsGateway],
  controllers: [WhatsAppController],
})
export class WhatsAppModule {}
