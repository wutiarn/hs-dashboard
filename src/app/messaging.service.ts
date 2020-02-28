import {Injectable, OnInit} from '@angular/core';
import {
  BufferEncoders,
  JsonSerializers,
  JsonSerializer,
  IdentitySerializer,
  MESSAGE_RSOCKET_ROUTING,
  RSocketClient,
  MAX_STREAM_ID
} from "rsocket-core";
import {ReactiveSocket} from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";
import {Buffer} from 'buffer/';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private client: RSocketClient<any, any>;
  private socket: ReactiveSocket<any, any>;

  constructor() {
    this.connect()
  }

  connect() {
    this.client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer
      },
      setup: {
        // ms btw sending keepalive to server
        keepAlive: 1000,
        // ms timeout if no keepalive response
        lifetime: 5000,
        // format of `data`
        dataMimeType: 'application/json',
        // format of `metadata`
        metadataMimeType: "message/x.rsocket.routing.v0",
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://192.168.10.2:8759/rsocket',
        debug: true
      }),
    });
    this.client.connect().subscribe({
      onComplete: socket => {
        console.info('Connected');
        this.socket = socket;
      },
      onError: error => {
        console.error("Disconnected", error);
        this.reconnect();
      },
      onSubscribe: cancel => {/* call cancel() to abort */
        console.info('subscribe');
      }
    });
  }

  reconnect() {
    setTimeout(() => {
      console.info("Reconnecting...");
      this.connect();
    }, 5000);
  }

  requestStream(route: string, data: any) {
    this.waitForSocket(socket => {
      const metadata = this.encodeRoute(route);
      console.info("Metadata", metadata);
      console.info("Requesting stream", socket);
      socket.requestStream({
        metadata,
        data: {}
      }).subscribe({
        onComplete: () => console.info("stream complete"),
        onError: (e) => console.error("stream error", e),
        onNext: (msg) => {
          console.info("Received", msg);
        },
        onSubscribe: subscription => {
          console.info("stream subscribe");
          subscription.request(MAX_STREAM_ID);
        }
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
      this.waitForSocket(callback);
    }, 5000);
  }

  private encodeRoute(route: string): string {
    return String.fromCharCode(route.length) + route;
  }
}
