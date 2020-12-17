import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAndRedirectComponent } from "./auth-and-redirect/auth-and-redirect.component";
const routes: Routes = [{
  path: "",
  component: AuthAndRedirectComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalRoutingModule { }
