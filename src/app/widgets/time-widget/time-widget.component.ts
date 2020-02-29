import {Component} from '@angular/core';
import {TimestampEventDto} from "../../dto/event/TimestampEventDto";
import {MessagingService} from "../../service/messaging.service";
import {TimestampEventsService} from "../../service/timestamp-events.service";

@Component({
    selector: 'app-time-widget',
    templateUrl: './time-widget.component.html',
    styleUrls: ['./time-widget.component.styl']
})
export class TimeWidgetComponent {

    event = new TimestampEventDto();

    constructor(private timestampEventsService: TimestampEventsService) {
      timestampEventsService.timestampEventsSubject
            .subscribe({
                next: value => {
                    this.event = value;
                }
            });
    }
}
