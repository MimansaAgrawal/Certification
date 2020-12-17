import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TempRoutingModule } from './temp-routing.module';
import { TempCompComponent } from './temp-comp/temp-comp.component';

@NgModule({
  declarations: [TempCompComponent],
  imports: [
    CommonModule,
    TempRoutingModule
  ]
})
export class TempModule { }
