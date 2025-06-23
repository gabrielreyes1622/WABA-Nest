// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsAppService {
  private readonly token = 'EAAOuK8f1ZADkBO5hq4my3tY86tWOVq4I4JooDzc6ojIPiSRqniFpbjEjC8YTzOzl7iZAjF7BpKf7YcQJedt9iZBSS41RTZCVZCgVJPuxtfMZC2NnEUQoqxv9ZC3PxTPfC05vBJeQwtmBuNTjkhUJvf8yOF43YF0erEV9vWsQfdxRwyYKJH0tDsQMyS0ZA2uwtuFznQzWvm4jZC5L47LdO1bpQLeifvZCmTHctzRZAxM7EgYE9ZBH4wZDZD';
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
