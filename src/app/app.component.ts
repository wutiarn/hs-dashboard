import {Component} from '@angular/core';
import {timer} from 'rxjs';
import DateTimeFormat = Intl.DateTimeFormat;
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  now = null;

  constructor() {
    timer(0, 1000)
      .subscribe(x => {
        const now = new Date();
        const options = <DateTimeFormatOptions> {
          day: '2-digit',
          month: 'short',
          // year: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        this.now = now.toLocaleString('en', options);
      });
  }
}
