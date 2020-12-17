import { TrainingModule } from './../training/training.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalRoutingModule } from './external-routing.module';
import { AuthAndRedirectComponent } from './auth-and-redirect/auth-and-redirect.component';
import { DocumentModule } from '../document/document.module';
import { PostJoiningModule } from '../post-joining/post-joining.module';
@NgModule({
  declarations: [AuthAndRedirectComponent],
  imports: [
    CommonModule,
    DocumentModule,
    ExternalRoutingModule,
    PostJoiningModule,
    TrainingModule
  ]
})
export class ExternalModule { }
