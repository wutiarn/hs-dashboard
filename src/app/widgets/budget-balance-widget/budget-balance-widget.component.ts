import {Component} from '@angular/core';
import {BudgetEventDto} from "../../dto/event/BudgetEventDto";
import {BudgetEventsService} from "../../service/budget-events.service";

@Component({
  selector: 'app-budget-balance-widget',
  templateUrl: './budget-balance-widget.component.html',
  styleUrls: ['./budget-balance-widget.component.styl']
})
export class BudgetBalanceWidgetComponent {

  budgetEvent: BudgetEventDto;

  constructor(private budgetEventsService: BudgetEventsService) {
    budgetEventsService.budgetEventsSubject.subscribe({
      next: value => this.budgetEvent = value
    });
  }
}
