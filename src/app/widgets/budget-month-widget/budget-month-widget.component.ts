import { Component, OnInit } from '@angular/core';
import {BudgetEventDto} from "../../dto/event/BudgetEventDto";
import {BudgetEventsService} from "../../service/budget-events.service";

@Component({
  selector: 'app-budget-month-widget',
  templateUrl: './budget-month-widget.component.html',
  styleUrls: ['./budget-month-widget.component.styl']
})
export class BudgetMonthWidgetComponent {

  budgetEvent: BudgetEventDto;

  constructor(private budgetEventsService: BudgetEventsService) {
    budgetEventsService.budgetEventsSubject.subscribe({
      next: value => this.budgetEvent = value
    });
  }
}
