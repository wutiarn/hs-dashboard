import { Component, OnInit } from '@angular/core';
import {BudgetEventDto} from "../../dto/event/BudgetEventDto";
import {BudgetEventsService} from "../../service/budget-events.service";

@Component({
  selector: 'app-budget-today-widget',
  templateUrl: './budget-today-widget.component.html',
  styleUrls: ['./budget-today-widget.component.styl']
})
export class BudgetTodayWidgetComponent {

  budgetEvent: BudgetEventDto;

  constructor(private budgetEventsService: BudgetEventsService) {
    budgetEventsService.budgetEventsSubject.subscribe({
      next: value => this.budgetEvent = value
    });
  }
}
