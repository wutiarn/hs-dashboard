import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeWidgetComponent } from './time-widget/time-widget.component';
import { BudgetWidgetComponent } from './budget-widget/budget-widget.component';
import { OfflineWidgetComponent } from './offline-widget/offline-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeWidgetComponent,
    BudgetWidgetComponent,
    OfflineWidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
