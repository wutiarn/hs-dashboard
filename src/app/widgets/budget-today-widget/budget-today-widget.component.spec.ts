import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTodayWidgetComponent } from './budget-today-widget.component';

describe('BudgetTodayWidgetComponent', () => {
  let component: BudgetTodayWidgetComponent;
  let fixture: ComponentFixture<BudgetTodayWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTodayWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTodayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
