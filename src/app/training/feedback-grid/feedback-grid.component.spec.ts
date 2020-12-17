import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackGridComponent } from './feedback-grid.component';

describe('FeedbackGridComponent', () => {
  let component: FeedbackGridComponent;
  let fixture: ComponentFixture<FeedbackGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
