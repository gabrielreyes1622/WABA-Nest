import { Controller, Post, Body } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller()
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return await this.whatsappService.sendTextMessage(body.to, body.message);
  }
}
