// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsAppService {
  private readonly token = 'EAAOuK8f1ZADkBO9s2V8gLqSpqFn7mqwhOQvi5nfq8cUpLmdQ3gCZBVOWynTzbo9ZC5wimgFr9ouYMnERpxOMFiRskJVTLJwSBRH38m9M5DP6VFnyHt0PHajDF6y9o3HYavNvHnUXpsdKAZB2LE20BKtbsVyFNGGGCK9VEVqmZCAxD8BDZCZCNEHOredAqce8844fA63KEy0oHI85hczpieZAZAExPbjbZA11nSPh5FdF7cntWZAUAcZD';
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
