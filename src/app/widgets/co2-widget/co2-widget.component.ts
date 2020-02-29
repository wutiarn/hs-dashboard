import { Component, OnInit } from '@angular/core';
import {AirMonitorEventsService} from "../../service/air-monitor-events.service";
import {AirMonitorEventDto} from "../../dto/event/AirMonitorEventDto";

@Component({
  selector: 'app-co2-widget',
  templateUrl: './co2-widget.component.html',
  styleUrls: ['./co2-widget.component.styl']
})
export class Co2WidgetComponent {

  airMonitorEvent: AirMonitorEventDto;

  constructor(private airMonitorEventsService: AirMonitorEventsService) {
    airMonitorEventsService.airMonitorEventsSubject.subscribe({
      next: value => this.airMonitorEvent = value
    });
  }
}
