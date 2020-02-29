import {Injectable} from '@angular/core';
import {MessagingService} from "./messaging.service";
import {Subject} from "rxjs";
import {AirMonitorEventDto} from "../dto/event/AirMonitorEventDto";
import {TimestampEventDto} from "../dto/event/TimestampEventDto";
import {BudgetEventDto} from "../dto/event/BudgetEventDto";

@Injectable({
  providedIn: 'root'
})
export class BudgetEventsService {

  budgetEventsSubject: Subject<BudgetEventDto>;

  constructor(private messagingService: MessagingService) {
    this.budgetEventsSubject = messagingService.requestStream('events.budget');
  }
}
