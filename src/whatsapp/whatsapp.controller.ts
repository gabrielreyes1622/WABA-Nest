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
  const value = body?.entry?.[0]?.changes?.[0]?.value;
  const msg = value?.messages?.[0];
  const contact = value?.contacts?.[0];

  const wa_id = contact?.wa_id ?? msg?.from; // número del usuario
  const name = contact?.profile?.name || 'Desconocido';
  const text = msg?.text?.body ?? '';

  if (msg && wa_id && text) {
    const formatted = {
      from: wa_id,
      name,
      text,
    };

    console.log('📩 Mensaje recibido:', formatted);

    // Emitir al frontend por WebSocket
    this.ws.sendMessageToClients(formatted);
  }

  res.sendStatus(200);
}

}
