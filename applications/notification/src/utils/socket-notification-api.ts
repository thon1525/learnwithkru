import { Server, Socket }  from 'socket.io';
import { IMessageLocals, SocketApi } from './@types/socket-sender.type';
import http from 'http';
import { logger } from './logger';

export class SocketNotificationEmailApi implements SocketApi {
  private io: Server;

  constructor() {
    const server = http.createServer();
    this.io = new Server(server);
    this.listen();
  }

  private async listen(): Promise<void> {
    try {
      this.io.on('connection', (socket: Socket) => {
        logger.info(`Socket ${socket.id} connected`);
        socket.on('chat message', (msg) => {
          logger.info(`Received message: ${JSON.stringify(msg)}`);
          this.sendNotification('chat message', msg.receiver, {
            type: 'chat',
            message: msg.message,
            timestamp: new Date(),
            title: 'New Chat Message',
          });
          socket.emit('message received', { status: 'success', message: 'Message delivered successfully' });
        });
        this.disconnect(socket);
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  private async disconnect(socket: Socket): Promise<void> {
    try {
      socket.on('disconnect', () => {
        logger.info(`Socket ${socket.id} disconnected`);
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async sendNotification(
    template: string,
    receiver: string,
    locals: IMessageLocals,
    namespace?: string
  ): Promise<void> {
    try {
      const target = namespace
        ? this.io.of(namespace).to(receiver)
        : this.io.to(receiver);
      target.emit(template, locals);
    } catch (error) {
      console.error(
        `Failed to send notification to ${receiver}${
          namespace ? ` in namespace ${namespace}` : ''
        }:`,
        error
      );
      throw new Error(
        `Failed to send notification: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}
     