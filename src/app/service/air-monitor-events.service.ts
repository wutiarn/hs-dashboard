import {Injectable} from '@angular/core';
import {MessagingService} from "./messaging.service";
import {Subject} from "rxjs";
import {AirMonitorEventDto} from "../dto/event/AirMonitorEventDto";

@Injectable({
  providedIn: 'root'
})
export class AirMonitorEventsService {

  airMonitorEventsSubject: Subject<AirMonitorEventDto>;

  constructor(private messagingService: MessagingService) {
    this.airMonitorEventsSubject = messagingService.requestStream('events.airMonitor');
  }
}
