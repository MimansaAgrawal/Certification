import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdQualifDetailsComponent } from './ed-qualif-details.component';

describe('EdQualifDetailsComponent', () => {
  let component: EdQualifDetailsComponent;
  let fixture: ComponentFixture<EdQualifDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdQualifDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdQualifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
