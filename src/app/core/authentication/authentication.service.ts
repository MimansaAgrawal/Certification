import { Router } from '@angular/router';
import { Main } from './../_api/main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  oAuthToken: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private main: Main,
  ) { }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  loggedIn: boolean;

  login(context: LoginContext): Promise<Credentials> {
    let root = this;
    return new Promise(function (resolve, reject) {
      const body = {
        "email": context.username,
        "_id": context.oAuthToken
      }
      root.main.authEmail(body).subscribe((res, err) => {
        if (res.statusCode == "[200]") {
          const token = res.data.token
          const hrId = res.data.HrDetails._id
          const hrDetails = res.data.HrDetails
          const data = {
            username: context.username,
            oAuthToken: context.oAuthToken,
            serverToken: token,
            Uid: hrId,
            user: hrDetails,
            role : res.data.role
          };
          console.log("data", res);
          root.credentialsService.setCredentials(data, false);
          resolve(data);
        }
        else if (res.statusCode == "[404]") {
          reject(err)
        }
      },
        err => {
          reject(err);

        }
      )
    });
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
