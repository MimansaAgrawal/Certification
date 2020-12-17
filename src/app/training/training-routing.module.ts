import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackGridComponent } from './feedback-grid/feedback-grid.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [{
  path:"feedback",
  component:FeedbackComponent
},
{
  path:"feedbackgrid",
  component: FeedbackGridComponent
},
{
  path:"successPage",
  component: SuccessPageComponent
},
{
  path:"",
  redirectTo:"feedbackgrid",
  pathMatch:"full"
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
