import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBuddyComponent } from './confirm-buddy.component';

describe('ConfirmBuddyComponent', () => {
  let component: ConfirmBuddyComponent;
  let fixture: ComponentFixture<ConfirmBuddyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBuddyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
