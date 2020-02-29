import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCardBalanceWidgetComponent } from './budget-card-balance-widget.component';

describe('BudgetCardBalanceWidgetComponent', () => {
  let component: BudgetCardBalanceWidgetComponent;
  let fixture: ComponentFixture<BudgetCardBalanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetCardBalanceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCardBalanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
