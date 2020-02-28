import {Injectable, OnInit} from '@angular/core';
import {BufferEncoders, JsonSerializers, MESSAGE_RSOCKET_ROUTING, RSocketClient} from "rsocket-core";
import {ReactiveSocket} from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private client: RSocketClient<any, any>;
  private socket: ReactiveSocket<any, any>;

  constructor() {
    this.client = new RSocketClient({
      serializers: JsonSerializers,
      setup: {
        // ms btw sending keepalive to server
        keepAlive: 60000,
        // ms timeout if no keepalive response
        lifetime: 180000,
        // format of `data`
        dataMimeType: 'application/json',
        // format of `metadata`
        metadataMimeType: MESSAGE_RSOCKET_ROUTING.string,
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://192.168.10.2:8759/rsocket',
        debug: true
      }, BufferEncoders),
    });
    this.connect();
  }

  connect() {
    this.client.connect().subscribe({
      onComplete: socket => {
        console.info('Connected');
        this.socket = socket;
      },
      onError: error => {
        console.error(error);
        setTimeout(() => {
          this.connect();
        }, 5000);
      },
      onSubscribe: cancel => {/* call cancel() to abort */
        console.info('subscribe');
      }
    });
  }

  requestStream(route: string, data: any) {
    this.waitForSocket(socket => {
      socket.requestStream({
        metadata: this.encodeRoute(route),
        data
      }).subscribe(x => {
        console.info('Event', x);
      });
    });
  }

  waitForSocket(callback: (socket: ReactiveSocket<any, any>) => any) {
    console.info("Acquiring socket");
    if (this.socket != null) {
      console.info("Socket acquired");
      callback(this.socket);
      return;
    }

    setTimeout(() => {
      console.debug("Waiting for connection...");
      this.waitForSocket(callback);
    }, 1000);
  }

  private encodeRoute(route: string): Buffer {
    const length = Buffer.byteLength(route, 'utf8');
    const buffer = Buffer.alloc(1);
    buffer.writeInt8(length, 0);
    return Buffer.concat([buffer, Buffer.from(route, 'utf8')]);
  }
}
