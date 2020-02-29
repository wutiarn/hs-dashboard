import { Component, OnInit } from '@angular/core';
import {AirMonitorEventDto} from "../../dto/event/AirMonitorEventDto";
import {AirMonitorEventsService} from "../../service/air-monitor-events.service";

@Component({
  selector: 'app-rh-widget',
  templateUrl: './rh-widget.component.html',
  styleUrls: ['./rh-widget.component.styl']
})
export class RhWidgetComponent {
  airMonitorEvent: AirMonitorEventDto;

  constructor(private airMonitorEventsService: AirMonitorEventsService) {
    airMonitorEventsService.airMonitorEventsSubject.subscribe({
      next: value => this.airMonitorEvent = value
    });
  }
}
