import { Component, OnInit } from '@angular/core';
import {AirMonitorEventDto} from "../../dto/event/AirMonitorEventDto";
import {AirMonitorEventsService} from "../../service/air-monitor-events.service";

@Component({
  selector: 'app-tvoc-widget',
  templateUrl: './tvoc-widget.component.html',
  styleUrls: ['./tvoc-widget.component.styl']
})
export class TvocWidgetComponent {

  airMonitorEvent: AirMonitorEventDto;

  constructor(private airMonitorEventsService: AirMonitorEventsService) {
    airMonitorEventsService.airMonitorEventsSubject.subscribe({
      next: value => this.airMonitorEvent = value
    });
  }
}
