import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { CredentialsService, Credentials } from './credentials.service';
import { MockCredentialsService } from './credentials.service.mock';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let credentialsService: MockCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CredentialsService, useClass: MockCredentialsService }, AuthenticationService]
    });

    authenticationService = TestBed.get(AuthenticationService);
    credentialsService = TestBed.get(CredentialsService);
    credentialsService.credentials = null;
    spyOn(credentialsService, 'setCredentials').and.callThrough();
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
        oAuthToken:'123'
      });
      tick();

      // Assert
      request.then(credentials => {
        expect(credentials).toBeDefined();
        expect(credentials.oAuthToken).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(() => {
      expect(credentialsService.isAuthenticated()).toBe(false);

      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
        oAuthToken: '123'
      });
      tick();

      // Assert
      request.then(() => {
        expect(credentialsService.isAuthenticated()).toBe(true);
        expect(credentialsService.credentials).not.toBeNull();
        expect((<Credentials>credentialsService.credentials).oAuthToken).toBeDefined();
        expect((<Credentials>credentialsService.credentials).oAuthToken).not.toBeNull();
      });
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
        oAuthToken: '123'
      });
      tick();

      // Assert
      request.then(() => {
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        expect((<jasmine.Spy>credentialsService.setCredentials).calls.mostRecent().args[1]).toBe(undefined);
      });
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
        oAuthToken: '123',
        remember: true
      });
      tick();

      // Assert
      request.then(() => {
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        expect((<jasmine.Spy>credentialsService.setCredentials).calls.mostRecent().args[1]).toBe(true);
      });
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'toto',
        password: '123',
        oAuthToken: '123456'
      });
      tick();

      // Assert
      loginRequest.then(() => {
        expect(credentialsService.isAuthenticated()).toBe(true);

        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {
          expect(credentialsService.isAuthenticated()).toBe(false);
          expect(credentialsService.credentials).toBeNull();
        });
      });
    }));
  });
});
