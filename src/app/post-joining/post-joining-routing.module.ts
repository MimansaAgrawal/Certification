import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../post-joining/main/main.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AssetInformationComponent } from './asset-information/asset-information.component';
const routes: Routes = [
  {
    path:"details",
    component: MainComponent
  },
  {
    path: "asset-config",
    component: AssetConfigurationComponent
  },
  {
    path: "asset-info",
    component: AssetInformationComponent
  },
  {
    path:"",
    redirectTo:'details',
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostJoiningRoutingModule { }
