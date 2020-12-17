import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrainingRoutingModule } from "./training-routing.module";
import { FeedbackComponent } from "./feedback/feedback.component";
import { MatRadioModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "./../shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { ReactiveFormsModule } from "@angular/forms";
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
import { FeedbackGridComponent } from "./feedback-grid/feedback-grid.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { RatingModule } from "ng-starrating";
import { SuccessPageComponent } from './success-page/success-page.component';

@NgModule({
  declarations: [FeedbackComponent, FeedbackGridComponent, SuccessPageComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
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
    NgbTooltipModule,
    MatCardModule,
    SelectDropDownModule,
    RatingModule,
  ],
  exports: [FeedbackComponent],
})
export class TrainingModule {}
