import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginMainComponent } from "./login-main/login-main.component";
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [LoginMainComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, AlertModule.forRoot()]
})
export class LoginModule {}
