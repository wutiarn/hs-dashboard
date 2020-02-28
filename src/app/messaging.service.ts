import {Injectable} from '@angular/core';
import {IdentitySerializer, JsonSerializer, MAX_STREAM_ID, RSocketClient} from "rsocket-core";
import {ReactiveSocket} from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";

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
        wsCreator: url => {
          const webSocket = new WebSocket(url);
          webSocket.addEventListener("close", (ev) => {
            this.reconnect();
          });
          return webSocket;
        },
        debug: true
      }),
    });
    this.client.connect().subscribe({
      onComplete: socket => {
        console.info('Connected');
        this.socket = socket;
      }
    });

  }

  reconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  requestStream(route: string, data: any) {
    this.waitForSocket(socket => {
      const metadata = this.encodeRoute(route);
      console.debug("Requesting stream", socket);
      socket.requestStream({
        metadata,
        data: {}
      }).subscribe({
        onComplete: () => console.info(`[${route}] Stream completed`),
        onError: (e) => console.error(`[${route}] stream error`, e),
        onNext: (msg) => {
          console.debug(`[${route}] Received`, msg);
        },
        onSubscribe: subscription => {
          subscription.request(MAX_STREAM_ID);
        }
      });
    });
  }

  waitForSocket(callback: (socket: ReactiveSocket<any, any>) => any) {
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
