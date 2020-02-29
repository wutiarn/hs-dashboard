import { Component, OnInit } from '@angular/core';
import {AirMonitorEventDto} from "../../dto/event/AirMonitorEventDto";
import {AirMonitorEventsService} from "../../service/air-monitor-events.service";

@Component({
  selector: 'app-temp-widget',
  templateUrl: './temp-widget.component.html',
  styleUrls: ['./temp-widget.component.styl']
})
export class TempWidgetComponent {
  airMonitorEvent: AirMonitorEventDto;

  constructor(private airMonitorEventsService: AirMonitorEventsService) {
    airMonitorEventsService.airMonitorEventsSubject.subscribe({
      next: value => this.airMonitorEvent = value
    });
  }
}
