import { Component, OnInit } from '@angular/core';
import {BudgetEventDto} from "../../dto/event/BudgetEventDto";
import {BudgetEventsService} from "../../service/budget-events.service";

@Component({
  selector: 'app-budget-tomorrow-widget',
  templateUrl: './budget-tomorrow-widget.component.html',
  styleUrls: ['./budget-tomorrow-widget.component.styl']
})
export class BudgetTomorrowWidgetComponent {

  budgetEvent: BudgetEventDto;

  constructor(private budgetEventsService: BudgetEventsService) {
    budgetEventsService.budgetEventsSubject.subscribe({
      next: value => this.budgetEvent = value
    });
  }
}
