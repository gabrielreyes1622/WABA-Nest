// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsAppService {
  private readonly token = 'EAAOuK8f1ZADkBO6BQSPwZCqGnoYLDsjZA3uGOlXTldu1DTiZCtOAhc7NZAFFpTO6mVmGMYj8Ipj3aKSkL9ThXpMblCRhx3WMstRWC3IFbqnSt2eCUzez75vZCgGHCoEaCm4jy5zMFutITWgWwGHbiFJ4hWLRI7aKrhUOZAe5v4uqGacqj674Rx6b5uzZA0A9cuZA2W7kUEHdSESiSnWjWVM7hg2xZAjGBfLy7Kh4cYLV9vureShwZDZD';
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
