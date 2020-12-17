import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UploadComponent} from '../document/upload/upload.component';
import {VerifyComponent} from '../document/verify/verify.component';
import {RMComponent} from './rm/rm.component';
import {BuddyComponent} from './buddy/buddy.component';
import {ConfirmBuddyComponent} from './confirm-buddy/confirm-buddy.component';

const routes: Routes = [
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'rm',
    component: RMComponent
  },
  {
    path: 'buddy',
    component: BuddyComponent
  },
  {
    path: 'buddyConfirm',
    component: ConfirmBuddyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {
}
