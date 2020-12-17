import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAndRedirectComponent } from './auth-and-redirect.component';

describe('AuthAndRedirectComponent', () => {
  let component: AuthAndRedirectComponent;
  let fixture: ComponentFixture<AuthAndRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAndRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAndRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
