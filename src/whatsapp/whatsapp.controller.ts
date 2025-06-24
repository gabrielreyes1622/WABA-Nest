import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { WhatsAppService } from './whatsapp.service';
import { WsGateway } from 'src/websocket.gateway';

@Controller()
export class WhatsAppController {
  constructor(
    private readonly whatsappService: WhatsAppService,
    private readonly ws: WsGateway,
  ) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return await this.whatsappService.sendTextMessage(body.to, body.message);
  }

  @Post()
  handleMessage(@Body() body: any, @Res() res: Response) {
    const msg = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (msg) {
      const from = msg.from;
      const text = msg.text?.body;

      const formatted = { from, text };
      console.log('📩 Mensaje recibido:', formatted);

      // Enviar al frontend vía WebSocket
      this.ws.sendMessageToClients(formatted);
    }

    res.sendStatus(200);
  }
}
