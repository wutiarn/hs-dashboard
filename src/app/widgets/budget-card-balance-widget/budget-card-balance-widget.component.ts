import { Component, OnInit } from '@angular/core';
import {BudgetEventDto} from "../../dto/event/BudgetEventDto";
import {BudgetEventsService} from "../../service/budget-events.service";

@Component({
  selector: 'app-budget-card-balance-widget',
  templateUrl: './budget-card-balance-widget.component.html',
  styleUrls: ['./budget-card-balance-widget.component.styl']
})
export class BudgetCardBalanceWidgetComponent {

  budgetEvent: BudgetEventDto;

  constructor(private budgetEventsService: BudgetEventsService) {
    budgetEventsService.budgetEventsSubject.subscribe({
      next: value => this.budgetEvent = value
    });
  }
}
