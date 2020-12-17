import { MatSelectModule } from "@angular/material/select";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CertificationService } from "./certification.service";
import { CertificationRoutingModule } from "./certification-routing.module";
import { CertificationGridComponent } from "./certification-grid/certification-grid.component";
import { CertificationFormComponent } from "./certification-form/certification-form.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatStepperModule,
} from "@angular/material";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { CertificationReminderComponent } from "./certification-reminder/certification-reminder.component";

@NgModule({
  declarations: [
    CertificationGridComponent,
    CertificationFormComponent,
    CertificationReminderComponent,
  ],
  imports: [
    CommonModule,
    CertificationRoutingModule,
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
    SelectDropDownModule,
    NgMultiSelectDropDownModule,
  ],
  providers: [CertificationService],
})
export class CertificationModule {}
