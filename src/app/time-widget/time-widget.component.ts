import {Component} from '@angular/core';
import {TimestampEventDto} from "../dto/event/TimestampEventDto";
import {MessagingService} from "../messaging.service";

@Component({
    selector: 'app-time-widget',
    templateUrl: './time-widget.component.html',
    styleUrls: ['./time-widget.component.styl']
})
export class TimeWidgetComponent {

    event = new TimestampEventDto();
    isConnected = false;
    lastConnectionTimestamp = "never";

    constructor(private messagingService: MessagingService) {
        messagingService.requestStream<TimestampEventDto>('events.timestamp')
            .subscribe({
                next: value => {
                    this.event = value;
                }
            });
        messagingService.connectedStatusSubject.subscribe({
                next: value => {
                    if (this.isConnected === true && value === false) {
                        this.lastConnectionTimestamp = new Date().toLocaleString('en', {
                                day: '2-digit',
                                month: 'short',
                                weekday: 'long',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            }
                        );
                    }
                    this.isConnected = value;
                }
            }
        );
    }
}
