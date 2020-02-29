import { Component, OnInit } from '@angular/core';
import {AirMonitorEventDto} from "../../dto/event/AirMonitorEventDto";
import {AirMonitorEventsService} from "../../service/air-monitor-events.service";

@Component({
  selector: 'app-pm25-widget',
  templateUrl: './pm25-widget.component.html',
  styleUrls: ['./pm25-widget.component.styl']
})
export class Pm25WidgetComponent {

  airMonitorEvent: AirMonitorEventDto;

  constructor(private airMonitorEventsService: AirMonitorEventsService) {
    airMonitorEventsService.airMonitorEventsSubject.subscribe({
      next: value => this.airMonitorEvent = value
    });
  }
}
