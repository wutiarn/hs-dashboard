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
    // timer(0, 1000)
    //   .subscribe(x => {
    //     const now = new Date();
    //     const options = {
    //       day: '2-digit',
    //       month: 'short',
    //       // year: 'numeric',
    //       weekday: 'long',
    //       hour: '2-digit',
    //       minute: '2-digit',
    //       second: '2-digit',
    //       hour12: false
    //     } as DateTimeFormatOptions;
    // this.now = now.toLocaleString('en', options);
    // });
  }
}
