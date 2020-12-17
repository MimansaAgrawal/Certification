import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempCompComponent } from './temp-comp/temp-comp.component'
const routes: Routes = [
  {
    path: "",
    component: TempCompComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TempRoutingModule { }
