import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationGridComponent } from './certification-grid.component';

describe('CertificationGridComponent', () => {
  let component: CertificationGridComponent;
  let fixture: ComponentFixture<CertificationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
