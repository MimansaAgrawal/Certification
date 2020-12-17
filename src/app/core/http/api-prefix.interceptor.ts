import { CredentialsService } from "@app/core/authentication/credentials.service";
import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const credentialsService = this.injector.get(CredentialsService);
    const token = credentialsService.credentials
      ? credentialsService.credentials.serverToken
      : sessionStorage.getItem("sessionToken");
    if (!/^(http|https):/i.test(request.url)) {
      console.log(request);
      const baseUrl =
        request.method === "POST"
          ? environment.postRequestOrigin
          : environment.getRequestOrigin;

      request = request.clone({
        url: baseUrl + request.url,
      });

      if (token) {
        request = request.clone({ setHeaders: { Authorization: token } });
      }
      console.log(request);
    }

    if (/\/certifications/g.test(request.url) && token) {
      request = request.clone({ setHeaders: { Authorization: token } });
    }

    return next.handle(request);
  }
}
