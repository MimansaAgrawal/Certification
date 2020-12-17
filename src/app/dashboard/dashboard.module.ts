import { SharedModule } from './../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import {ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainGridComponent} from './main-grid/main-grid.component';
import {MatCardModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatStepperModule} from '@angular/material';
import {CreateComponent} from './create/create.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { SelectDropDownModule } from 'ngx-select-dropdown';


@NgModule({
  declarations: [MainGridComponent, CreateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSortModule,
    MatInputModule,
    MatButtonToggleModule,
    AngularFontAwesomeModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    SharedModule,
    MatCardModule,
    SelectDropDownModule
  ],

})
export class DashboardModule {

}
