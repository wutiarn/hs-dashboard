import {Injectable} from '@angular/core';
import {MessagingService} from "./messaging.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private messagingService: MessagingService) {
    this.getEvents();
  }

  getEvents() { // Observable<EventDto<any>>
    console.info("EventsService: calling requestStream()");
    this.messagingService.requestStream("events", null);
  }
}
