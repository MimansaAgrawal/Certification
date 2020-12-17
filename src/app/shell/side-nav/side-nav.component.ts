import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CredentialsService, UserI } from '@app/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) { }
  

  logout() {
    this.authenticationService
      .logout()
      .subscribe(() => {
        window.location.reload()
        this.router.navigate(["/login"], { replaceUrl: true })
      });
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get user(): UserI | null {
    const credential = this.credentialsService.credentials;
    
    return credential ? credential.user : null;
  }


}
