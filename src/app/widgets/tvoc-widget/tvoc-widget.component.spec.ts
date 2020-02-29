import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvocWidgetComponent } from './tvoc-widget.component';

describe('TvocWidgetComponent', () => {
  let component: TvocWidgetComponent;
  let fixture: ComponentFixture<TvocWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvocWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvocWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
