import {Injectable} from '@angular/core';
import {MessagingService} from "./messaging.service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private messagingService: MessagingService) {
    this.getEvents();
  }

  getEvents() { // Observable<EventDto<any>>
    console.info("EventsService: calling requestStream()");
    const subject = this.messagingService.requestStream("events", null);
    subject
      .subscribe({
        next: value => {
          console.info("Subject next", value);
        },
        complete: () => {
          subject.complete();
        }
      });
  }
}
