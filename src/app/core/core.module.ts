import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapAndCatchHandler} from './_api/mapCatch';
import {CapitalizeString} from './pipes/capitalize.pipe';
import {RemoveEmptyField} from './pipes/removeEmptyFields.pipe';
import {MobileNumberHide} from './pipes/mobileNumberHide.pipe';
import {IndianCurrency} from './pipes/indianCurrency.pipe';
import {DateFormatPipe} from './pipes/dateFormat.pipe';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {RouteReusableStrategy} from './route-reusable-strategy';
import {AuthenticationService} from './authentication/authentication.service';
import {CredentialsService} from './authentication/credentials.service';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {HttpService, HTTP_DYNAMIC_INTERCEPTORS} from './http/http.service';
import {HttpCacheService} from './http/http-cache.service';
import {ApiPrefixInterceptor} from './http/api-prefix.interceptor';
import {ErrorHandlerInterceptor} from './http/error-handler.interceptor';
import {CacheInterceptor} from './http/cache.interceptor';
import {HttpResponseInterceptor} from '@app/core/http/http-response.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [
    MapAndCatchHandler,
    AuthenticationService,
    CredentialsService,
    AuthenticationGuard,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HTTP_DYNAMIC_INTERCEPTORS,
      useValue: []
    },
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    }
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
