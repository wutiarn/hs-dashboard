import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTomorrowWidgetComponent } from './budget-tomorrow-widget.component';

describe('BudgetTomorrowWidgetComponent', () => {
  let component: BudgetTomorrowWidgetComponent;
  let fixture: ComponentFixture<BudgetTomorrowWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTomorrowWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTomorrowWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
