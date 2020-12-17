import { FillSkillComponent } from './fill-skill/fill-skill.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"fillskills",
    component:FillSkillComponent
  },
  {
    path:"",
    redirectTo:"fillskills",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
