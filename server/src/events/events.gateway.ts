import {
  ConnectedSocket,
  // ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ReceiveClickDto } from './dto/receive-click.dto';
import { EventsService } from './events.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  runTime = 5000;

  constructor(private readonly eventsService: EventsService) {}

  @SubscribeMessage('receive-click')
  async receiveClick(
    @MessageBody() receiveClickDto: ReceiveClickDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.eventsService.flag) {
      setTimeout(async () => {
        const data = await this.eventsService.handleChart();
        if (data) {
          client.broadcast.emit('get-data-chart', data);
        }
        console.log(data);
      }, this.runTime);
    }
    const dataClick = await this.eventsService.receiveClick(receiveClickDto);
    client.broadcast.emit('get-data-click', dataClick);
  }
}
