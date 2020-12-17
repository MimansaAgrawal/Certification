import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { FileModalComponent } from './file-modal/file-modal.component';
import { MatCardModule } from '@angular/material/card';
import { ShowErrorComponent } from './show-error/show-error.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '@app/core/pipes/pipes.module';


@NgModule({
  declarations: [HeaderComponent, EmpDetailsComponent, CommonHeaderComponent, CandidateDetailsComponent, FileModalComponent, ShowErrorComponent, PromptModalComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    AlertModule.forRoot(),
    FormsModule,
    PipesModule
  ],
  exports: [HeaderComponent,
     EmpDetailsComponent,
      CommonHeaderComponent,
       CandidateDetailsComponent, 
       FileModalComponent, 
       ShowErrorComponent,
       PromptModalComponent
      ],
  entryComponents: []

})
export class SharedModule { }
