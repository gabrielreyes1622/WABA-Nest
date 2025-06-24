// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsAppService {
  private readonly token = 'EAAOuK8f1ZADkBO7UrSiZBlxvNWAThbyZB9VcCA1PYlZCrs8E1ZAckuaBjJwae9IfforrcPghMgrn8MkyNkAs35WVuNxQXgFLEoeECEZAVo6JtqK9Ry3Niq5RpQqhyibXRGxZBvvajuJuA5cVojYwRoYeiPv9gcRk0WH2mypPnPbMNip6xlBLBpIaeVZCHEh5FeoWGPonKshxkCBAHZB2Nmp5GaeLexIEETNmNFNArJ1ZB9W3ZCKVQZDZD';
  private readonly phoneNumberId = '701311453062851';

  constructor(private readonly http: HttpService) {}

  async sendTextMessage(to: string, message: string): Promise<any> {
    const url = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;

    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    };

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };

    const res = await firstValueFrom(this.http.post(url, data, { headers }));
    return res.data;
  }
}
