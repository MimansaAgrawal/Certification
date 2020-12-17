import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { environment } from "@env/environment";
import { Logger, AuthenticationService } from "@app/core";
import { CredentialsService } from "@app/core/authentication/credentials.service";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

const log = new Logger("Login");

@Component({
  selector: "app-login-main",
  templateUrl: "./login-main.component.html",
  styleUrls: ["./login-main.component.css"]
})
export class LoginMainComponent implements OnInit {
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private authService: SocialAuthService
  ) {
    if (this.credentialsService.isAuthenticated()) {
      log.debug("User is already logged in, redirecting to main page");
      this.router.navigate(["/"], {
        replaceUrl: true
      });
    }
    this.createForm();
  }
  isLoginSuccessful: boolean
  isLoginFailed: boolean
  isButtonDisabled = true
  ngOnInit() {
    this.isLoginSuccessful = false
    this.isLoginFailed = false
    this.authService.initState.subscribe(() => { }, console.error, () => {
      this.isButtonDisabled = false
      console.log('all providers are ready')
    });
  }


  ngOnDestroy() { }

  loggedIn: boolean;

  login() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user: SocialUser) => {
      this.loginForm.value.username = user.email;
      this.loginForm.value.oAuthToken = user.id;
      this.loggedIn = (user != null);
      this.isLoading = true;
      this.authenticationService.login(this.loginForm.value)
        .then(credentials => {
          this.isLoginSuccessful= true
          this.loginForm.markAsPristine();
          this.isLoading = false;
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate(
            [this.route.snapshot.queryParams.redirect || "/"],
            { replaceUrl: true }
          );
        })
        .catch(error => {
          this.isLoginFailed = true
          log.debug(`Login error: ${error}`);
          this.error = error;
        })
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      oAuthToken: ["", Validators.required],
      remember: true
    });
  }
}
