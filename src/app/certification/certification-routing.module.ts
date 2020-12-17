import { CertificationReminderComponent } from './certification-reminder/certification-reminder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificationGridComponent } from './certification-grid/certification-grid.component';
import { CertificationFormComponent } from './certification-form/certification-form.component';

const routes: Routes = [
  {
    path: 'certificationform',
    component: CertificationFormComponent,
  },
  {
    path: 'grid',
    component: CertificationGridComponent,
  },
  {
    path: 'certificationreminder',
    component: CertificationReminderComponent,
  },
  {
    path: '',
    redirectTo: 'grid',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificationRoutingModule {}
