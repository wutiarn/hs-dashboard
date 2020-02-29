import {Component} from '@angular/core';
import {MessagingService} from "./messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  isConnected = false;
  lastConnectionTimestamp: Date;
  lastConnectionAttemptTimestamp: Date;

  constructor(private messagingService: MessagingService) {
    messagingService.connectedStatusSubject.subscribe({
        next: value => {
          this.lastConnectionAttemptTimestamp = new Date();
          if (this.isConnected === true && value === false) {
            this.lastConnectionTimestamp = this.lastConnectionAttemptTimestamp;
          }
          this.isConnected = value;
        }
      }
    );
  }
}
