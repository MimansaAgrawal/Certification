import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CapitalizeString } from './capitalize.pipe';
import { DateFormatPipe } from './dateFormat.pipe';
import { FileNamePipe } from './file-name.pipe';
import { IndianCurrency } from './indianCurrency.pipe';
import { MobileNumberHide } from './mobileNumberHide.pipe';
import { RemoveEmptyField } from './removeEmptyFields.pipe';

@NgModule({
  imports: [CommonModule],
  providers: [
  ],
  declarations: [
    CapitalizeString,
    RemoveEmptyField,
    IndianCurrency,
    MobileNumberHide,
    DateFormatPipe,
    FileNamePipe
  ],
  exports: [
    CapitalizeString,
    RemoveEmptyField,
    IndianCurrency,
    MobileNumberHide,
    DateFormatPipe,
    FileNamePipe
  ]
})
export class PipesModule {
  constructor() {
  }
}
