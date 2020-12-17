import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillSkillComponent } from './fill-skill.component';

describe('FillSkillComponent', () => {
  let component: FillSkillComponent;
  let fixture: ComponentFixture<FillSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
