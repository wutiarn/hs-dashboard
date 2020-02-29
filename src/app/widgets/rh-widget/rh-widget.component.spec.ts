import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhWidgetComponent } from './rh-widget.component';

describe('RhWidgetComponent', () => {
  let component: RhWidgetComponent;
  let fixture: ComponentFixture<RhWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
