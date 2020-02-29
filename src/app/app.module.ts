import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeWidgetComponent } from './widgets/time-widget/time-widget.component';
import { BudgetWidgetComponent } from './widgets/budget-widget/budget-widget.component';
import { OfflineWidgetComponent } from './widgets/offline-widget/offline-widget.component';
import {AbstractTextWidgetComponent} from "./widgets/abstract/text-widget/abstract-text-widget.component";

@NgModule({
  declarations: [
    AppComponent,
    TimeWidgetComponent,
    BudgetWidgetComponent,
    OfflineWidgetComponent,
    AbstractTextWidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
