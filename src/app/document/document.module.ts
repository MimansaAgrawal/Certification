import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { UploadComponent } from './upload/upload.component';
import { VerifyComponent } from './verify/verify.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { RMComponent } from './rm/rm.component';
import { BuddyComponent } from './buddy/buddy.component';
import { ConfirmBuddyComponent } from './confirm-buddy/confirm-buddy.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import { OtherDetailsComponent } from './other-details/other-details.component';
import { EmpAddressInfComponent } from './emp-address-inf/emp-address-inf.component';
import { EdQualifDetailsComponent } from './ed-qualif-details/ed-qualif-details.component';
import { AllEmpDetailsComponent } from './all-emp-details/all-emp-details.component';
import { ReferencesComponent } from './references/references.component';
import { IdentityInformationComponent } from './identity-information/identity-information.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatStepperModule, MatRadioModule } from '@angular/material';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { SharedModule } from '@app/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MatIconModule } from '@angular/material/icon';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UploadComponent, VerifyComponent, RMComponent, BuddyComponent,
    ConfirmBuddyComponent, PersonalDetailsComponent, FamilyDetailsComponent,
    OtherDetailsComponent, EmpAddressInfComponent, EdQualifDetailsComponent,
    AllEmpDetailsComponent, ReferencesComponent, IdentityInformationComponent, DocumentUploadComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    HttpClientModule,
    NotifierModule,
    AngularFontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgMultiSelectDropDownModule,
    SelectDropDownModule,
    MatIconModule,
    MatSnackBarModule,
    MatRadioModule,
    NgbTooltipModule
  ],
  exports: [
    UploadComponent,
    RMComponent,
    BuddyComponent,
    ConfirmBuddyComponent,
    DocumentUploadComponent,
    EdQualifDetailsComponent,
  ]
})
export class DocumentModule {
}
