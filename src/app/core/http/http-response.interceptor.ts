import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, finalize, map} from 'rxjs/operators';
import {LoaderService} from '@app/core/services/loader.service';


/*
* To start spinner before every api request and stop after getting response*/
@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.loaderService.setLoader(true);
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      delay(500),
      finalize(() => this.loaderService.setLoader(false)));
  }

}
