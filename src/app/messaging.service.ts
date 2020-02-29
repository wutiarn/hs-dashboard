import {Injectable} from '@angular/core';
import {IdentitySerializer, JsonSerializer, MAX_STREAM_ID, RSocketClient} from "rsocket-core";
import {ReactiveSocket} from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private client: RSocketClient<any, any>;
  private socket: ReactiveSocket<any, any>;

  private activeSubscriptions = new Map<string, ActiveSubscription>();

  connectedStatusSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.connect();
  }


  requestStream<T>(route: string, request: any = null, durable: boolean = true): Subject<T> {
    const subject = new Subject<any>();

    this.doRequestStream(route, request, subject);

    console.debug(`Adding ${route} to activeSubscriptions`);
    this.activeSubscriptions.set(route, {
      route,
      request,
      subject
    });

    return subject;
  }

  private doRequestStream(route: string, request: any, subject: Subject<any>) {
    if (this.socket != null) {
      const metadata = this.encodeRoute(route);
      console.debug(`[${route}] Subscribing stream. Request:`, request);
      this.socket.requestStream({
        metadata,
        data: {}
      }).subscribe({
        onComplete: () => console.info(`[${route}] Stream completed`),
        onError: (e) => console.error(`[${route}] Stream error`, e),
        onNext: (msg) => {
          console.debug(`[${route}] Received`, msg.data);
          subject.next(msg.data);
        },
        onSubscribe: subscription => {
          subscription.request(MAX_STREAM_ID);
          subject.subscribe({
            complete: () => {
              console.debug(`[${route}] Stream completed`);
              subscription.cancel();
              this.activeSubscriptions.delete(route);
            }
          });
        }
      });
    }
  }

  private connect() {
    this.client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer
      },
      setup: {
        // ms btw sending keepalive to server
        keepAlive: 10000,
        // ms timeout if no keepalive response
        lifetime: 30000,
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
            this.onDisconnected();
          });
          return webSocket;
        },
        debug: true
      }),
    });
    this.client.connect().subscribe({
      onComplete: socket => {
        this.socket = socket;
        this.onConnected();
      }
    });
  }

  private onConnected() {
    console.info('Connected');
    this.resubscribe();
    this.connectedStatusSubject.next(true);
  }

  private onDisconnected() {
    this.connectedStatusSubject.next(false);
    this.reconnect();
  }

  private reconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  private resubscribe() {
    for (const s of this.activeSubscriptions.values()) {
      this.doRequestStream(s.route, s.request, s.subject);
    }
  }

  private encodeRoute(route: string): string {
    return String.fromCharCode(route.length) + route;
  }
}

class ActiveSubscription {
  route: string;
  request: any;
  subject: Subject<any>;
}
