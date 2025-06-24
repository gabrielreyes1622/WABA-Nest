import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

  sendMessageToClients(message: any) {
    this.server.emit('new-message', message);
    console.log('📤 Emitido a frontend por WebSocket:', message);
  }
}
