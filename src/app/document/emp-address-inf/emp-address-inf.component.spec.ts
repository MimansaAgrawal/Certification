import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddressInfComponent } from './emp-address-inf.component';

describe('EmpAddressInfComponent', () => {
  let component: EmpAddressInfComponent;
  let fixture: ComponentFixture<EmpAddressInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAddressInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAddressInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
