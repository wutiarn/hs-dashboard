import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeWidgetComponent } from './widgets/time-widget/time-widget.component';
import { BudgetBalanceWidgetComponent } from './widgets/budget-balance-widget/budget-balance-widget.component';
import { OfflineWidgetComponent } from './widgets/offline-widget/offline-widget.component';
import {AbstractTextWidgetComponent} from "./widgets/abstract/text-widget/abstract-text-widget.component";
import { Co2WidgetComponent } from './widgets/co2-widget/co2-widget.component';
import { TempWidgetComponent } from './widgets/temp-widget/temp-widget.component';
import { RhWidgetComponent } from './widgets/rh-widget/rh-widget.component';
import { Pm25WidgetComponent } from './widgets/pm25-widget/pm25-widget.component';
import { TvocWidgetComponent } from './widgets/tvoc-widget/tvoc-widget.component';
import { BudgetTomorrowWidgetComponent } from './widgets/budget-tomorrow-widget/budget-tomorrow-widget.component';
import { BudgetTodayWidgetComponent } from './widgets/budget-today-widget/budget-today-widget.component';
import { BudgetMonthWidgetComponent } from './widgets/budget-month-widget/budget-month-widget.component';
import { BudgetCardBalanceWidgetComponent } from './widgets/budget-card-balance-widget/budget-card-balance-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeWidgetComponent,
    BudgetBalanceWidgetComponent,
    OfflineWidgetComponent,
    AbstractTextWidgetComponent,
    Co2WidgetComponent,
    TempWidgetComponent,
    RhWidgetComponent,
    Pm25WidgetComponent,
    TvocWidgetComponent,
    BudgetTomorrowWidgetComponent,
    BudgetTodayWidgetComponent,
    BudgetMonthWidgetComponent,
    BudgetCardBalanceWidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
