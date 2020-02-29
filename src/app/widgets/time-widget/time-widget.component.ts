import {Component} from '@angular/core';
import {TimestampEventDto} from "../../dto/event/TimestampEventDto";
import {MessagingService} from "../../service/messaging.service";

@Component({
    selector: 'app-time-widget',
    templateUrl: './time-widget.component.html',
    styleUrls: ['./time-widget.component.styl']
})
export class TimeWidgetComponent {

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
