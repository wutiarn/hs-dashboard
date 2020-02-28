import {Injectable, OnInit} from '@angular/core';
import {BufferEncoders, JsonSerializers, MESSAGE_RSOCKET_ROUTING, RSocketClient, MAX_STREAM_ID} from "rsocket-core";
import {ReactiveSocket} from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";
import {Buffer} from 'buffer/';
import {logger} from "codelyzer/util/logger";

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
        metadataMimeType: "message/x.rsocket.routing.v0",
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://192.168.10.2:8759/rsocket',
        debug: true
      }),
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
          console.info("Reconnecting...");
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
    }, 10);
  }

  private encodeRoute(route: string): string {
    return String.fromCharCode(route.length) + route;
  }
}
