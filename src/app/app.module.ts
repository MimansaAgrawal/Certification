import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {DashboardModule} from './dashboard/dashboard.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {SharedModule} from './shared/shared.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {ShellModule} from './shell/shell.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';


import {DocumentModule} from './document/document.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SpinnerComponent} from './spinner/spinner.component';
import {LoaderService} from '@app/core/services/loader.service';
import {SharedService} from '@app/core/services/shared.service';


@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ModalModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    ShellModule,
    BrowserAnimationsModule,
    MatTableModule,
    DocumentModule,
    DashboardModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.authKey
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    LoaderService,
    SharedService
  ],


  bootstrap: [AppComponent],
  // exports: [
  //   SpinnerComponent
  // ],
  //
  // exports: [
  //   SpinnerComponent
  // ]
})
export class AppModule {
}
