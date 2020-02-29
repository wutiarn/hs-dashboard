import {Component, Input, OnInit} from '@angular/core';
import {MessagingService} from "../../messaging.service";

@Component({
  selector: 'app-offline-widget',
  templateUrl: './offline-widget.component.html',
  styleUrls: ['./offline-widget.component.styl']
})
export class OfflineWidgetComponent {

  lastConnectionTimestampStr = "never";
  lastConnectionAttemptTimestampStr = "never";

  @Input()
  set lastConnectionTimestamp(timestamp: Date) {
    this.lastConnectionTimestampStr = this.formatTimestamp(timestamp);
  }

  @Input()
  set lastConnectionAttemptTimestamp(timestamp: Date) {
    this.lastConnectionAttemptTimestampStr = this.formatTimestamp(timestamp);
  }

  private formatTimestamp(timestamp: Date): string {
    return timestamp.toLocaleString('en', {
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
}
