// src/whatsapp/whatsapp.controller.ts
import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WhatsAppService } from './whatsapp.service';
import { WebSocketGateway } from 'src/websocket.gateway';

@Controller()
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService, private readonly ws: WebSocketGateway) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return await this.whatsappService.sendTextMessage(body.to, body.message);
  }
  @Post()
  handleMessage(@Body() body: any, @Res() res: Response) {
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const msg = changes?.value?.messages?.[0];

    if (msg) {
      const from = msg.from;
      const text = msg.text?.body;

      const formatted = { from, text };
      console.log('📩 Mensaje recibido:', formatted);

      // Emitir al frontend por websocket
      this.ws.sendMessageToClients(formatted);
    }

    res.sendStatus(200);
  }
  }
}
