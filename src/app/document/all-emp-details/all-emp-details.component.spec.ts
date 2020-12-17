import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmpDetailsComponent } from './all-emp-details.component';

describe('AllEmpDetailsComponent', () => {
  let component: AllEmpDetailsComponent;
  let fixture: ComponentFixture<AllEmpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmpDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
