// src/webhook/webhook.controller.ts
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('webhook')
export class WebhookController {
  @Get()
  verify(@Req() req: Request, @Res() res: Response) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === 'mi_token_seguro') {
      console.log('WEBHOOK VERIFICADO');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  @Post()
  receiveMessage(@Req() req: Request, @Res() res: Response) {
    console.log('Mensaje recibido:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  }
}
