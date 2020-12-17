import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from "@angular/router";

import { Logger } from "../logger.service";
import { CredentialsService } from "./credentials.service";

const log = new Logger("AuthenticationGuard");

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }
    log.debug("Not authenticated, redirecting and adding redirect url...");
    this.router.navigate(["./login"], {
      queryParams: { redirect: state.url }
    });
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
