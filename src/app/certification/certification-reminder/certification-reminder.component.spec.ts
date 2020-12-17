import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationReminderComponent } from './certification-reminder.component';

describe('CertificationReminderComponent', () => {
  let component: CertificationReminderComponent;
  let fixture: ComponentFixture<CertificationReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
