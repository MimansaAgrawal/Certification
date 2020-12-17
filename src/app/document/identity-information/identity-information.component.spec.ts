import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityInformationComponent } from './identity-information.component';

describe('IdentityInformationComponent', () => {
  let component: IdentityInformationComponent;
  let fixture: ComponentFixture<IdentityInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
