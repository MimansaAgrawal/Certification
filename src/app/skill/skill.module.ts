import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkillRoutingModule } from './skill-routing.module';
import { FillSkillComponent } from './fill-skill/fill-skill.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [FillSkillComponent],
  imports: [
    //CommonModule,
    SkillRoutingModule, 
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    SharedModule
  ]
})
export class SkillModule { }
