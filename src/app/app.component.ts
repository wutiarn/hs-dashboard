import {Component} from '@angular/core';
import {MessagingService} from "./messaging.service";
import {TimestampEventDto} from "./dto/event/TimestampEventDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  event = new TimestampEventDto();

  constructor(private messagingService: MessagingService) {
    messagingService.requestStream<TimestampEventDto>('events.timestamp')
      .subscribe({
        next: value => {
          this.event = value;
        }
      });
  }
}
