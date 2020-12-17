import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@app/core';
import { ShellComponent } from './shell/shell.component';
const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],

    children: [
      {
        path: '',
        redirectTo: 'certification',
        pathMatch: 'full'
      },
      {
        path: 'document',
        loadChildren: () =>
          import('./document/document.module').then(m => m.DocumentModule)
      },
      {
        path: 'post-joining',
        loadChildren: () =>
          import('./post-joining/post-joining.module').then(
            m => m.PostJoiningModule
          )
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'training',
        loadChildren: () =>
          import('./training/training.module').then(m => m.TrainingModule)
      },
      {
        path: 'certification',
        loadChildren: () =>
          import('./certification/certification.module').then(
            m => m.CertificationModule
          )
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'temp',
        loadChildren: () => import('./temp/temp.module').then(m => m.TempModule)
      },
      {
        path: 'skill',
        loadChildren: () =>
          import('./skill/skill.module').then(m => m.SkillModule)
      }
    ],
    // Reuse ShellComponent instance when navigating between child views
    data: { reuse: true }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    // Reuse ShellComponent instance when navigating between child views
  },
  {
    path: 'external',
    loadChildren: () =>
      import('./external/external.module').then(m => m.ExternalModule)
    // Reuse ShellComponent instance when navigating between child views
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
