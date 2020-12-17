import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainGridComponent} from './main-grid/main-grid.component';
import {CreateComponent} from './create/create.component'

const routes: Routes = [
  {
    path: "create",
    component: CreateComponent
  },
  {
    path:"grid",
    component:MainGridComponent
  },
  {
    path:"",
    redirectTo:"grid",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
