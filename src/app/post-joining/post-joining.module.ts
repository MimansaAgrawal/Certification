import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatPaginatorModule, MatSortModule,MatStepperModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule} from '@angular/material/card';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {  MatIconModule} from '@angular/material/icon'
import { MatButtonModule} from '@angular/material/button'

import { PostJoiningRoutingModule } from './post-joining-routing.module';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { SharedModule } from '../shared/shared.module';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { VisaDetailsComponent } from './visa-details/visa-details.component';
import { MainComponent } from './main/main.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AssetInformationComponent } from './asset-information/asset-information.component';
import { TagInputModule } from 'ngx-chips';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  declarations: [BankDetailsComponent, InsuranceDetailsComponent, VisaDetailsComponent, MainComponent, AssetConfigurationComponent, AssetInformationComponent],
  imports: [
    CommonModule,
    PostJoiningRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSortModule,
    MatInputModule,
    MatButtonToggleModule,
    AngularFontAwesomeModule,
    SharedModule,
    MatStepperModule,
    TagInputModule,
    SelectDropDownModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MainComponent,
    AssetConfigurationComponent,
    AssetInformationComponent
  ]
})
export class PostJoiningModule { }
