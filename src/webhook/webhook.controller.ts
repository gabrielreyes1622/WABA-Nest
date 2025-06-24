// src/webhook/webhook.controller.ts
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WsGateway } from 'src/websocket.gateway';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly ws: WsGateway) {}
  @Get()
  verify(@Req() req: Request, @Res() res: Response) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === 'mi_token123') {
      console.log('WEBHOOK VERIFICADO');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  @Post()
receiveMessage(@Req() req: Request, @Res() res: Response) {
  console.log('Mensaje recibido:', JSON.stringify(req.body, null, 2));

  const value = req.body?.entry?.[0]?.changes?.[0]?.value;
  const msg = value?.messages?.[0];
  const contact = value?.contacts?.[0];

  const from = contact?.wa_id ?? msg?.from;
  const name = contact?.profile?.name?.trim() || 'Desconocido';
  const text = msg?.text?.body;

  console.log('📛 Contact name:', name);

  if (msg && text) {
    const formatted = { from, name, text };
    console.log('📤 Emitido a frontend por WebSocket:', formatted);
    this.ws.sendMessageToClients(formatted);
  }

  res.sendStatus(200);
}

}
