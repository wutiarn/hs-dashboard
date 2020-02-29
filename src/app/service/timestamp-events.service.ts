import {Injectable} from '@angular/core';
import {MessagingService} from "./messaging.service";
import {Subject} from "rxjs";
import {AirMonitorEventDto} from "../dto/event/AirMonitorEventDto";
import {TimestampEventDto} from "../dto/event/TimestampEventDto";

@Injectable({
  providedIn: 'root'
})
export class TimestampEventsService {

  timestampEventsSubject: Subject<TimestampEventDto>;

  constructor(private messagingService: MessagingService) {
    this.timestampEventsSubject = messagingService.requestStream('events.timestamp');
  }
}
