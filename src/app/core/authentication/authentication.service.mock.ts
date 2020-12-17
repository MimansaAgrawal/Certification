import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    username: 'test',
    oAuthToken: '123',
    serverToken: '123',
    user: null,
    role : null
  };

  login(context: LoginContext): | any {
    return of({
      username: context.username,
      password: '123456',
      oAuthToken: '123456',
      user: null
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
