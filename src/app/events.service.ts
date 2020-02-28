import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MessagingService} from "./messaging.service";
import {EventDto} from "./model/event.dto";
import {BufferEncoders, JsonSerializers, MESSAGE_RSOCKET_ROUTING, RSocketClient} from "rsocket-core";
import {ReactiveSocket} from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private messagingService: MessagingService) {
  }

  getEvents() { // Observable<EventDto<any>>
    this.messagingService.requestStream("events", null);
  }
}
