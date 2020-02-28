import {Component} from '@angular/core';
import {timer} from 'rxjs';
import DateTimeFormat = Intl.DateTimeFormat;
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import {
  RSocketClient,
  JsonSerializers,
  encodeAndAddWellKnownMetadata,
  MESSAGE_RSOCKET_ROUTING
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  now = null;

  constructor() {
    const client = new RSocketClient({
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
      transport: new RSocketWebSocketClient({url: 'ws://192.168.10.2:8759'}),
    });

    client.connect().subscribe({
      onComplete: socket => {
        console.info('Connected');
        socket.requestStream({
          metadata: 'events'
        });
      },
      onError: error => console.error(error),
      onSubscribe: cancel => {/* call cancel() to abort */
        console.info('subscribe');
      }
    });

    timer(0, 1000)
      .subscribe(x => {
        const now = new Date();
        const options = <DateTimeFormatOptions>{
          day: '2-digit',
          month: 'short',
          // year: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        this.now = now.toLocaleString('en', options);
      });
  }
}
