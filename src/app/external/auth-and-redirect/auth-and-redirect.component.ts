import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Main } from '@app/core/_api/main.service';
import { AuthCheck } from '../external.model';
import { ScreenIdsMapping } from "@app/constants/screen.constant";
@Component({
  selector: 'app-auth-and-redirect',
  templateUrl: './auth-and-redirect.component.html',
  styleUrls: ['./auth-and-redirect.component.css']
})
export class AuthAndRedirectComponent implements OnInit {

  isLoadingFlag = true;
  token: string;
  authObj: AuthCheck;
  screenIdMapped: String;
  errMessage: string;

  constructor(
    private route: ActivatedRoute,
    private mainService: Main,
  ) { }

  ngOnInit() {
    this.getAndSaveRouteParams().then(val => {
      console.log(val);
      this.mainService.externalTokenVerify(this.token).subscribe(res => {
        this.isLoadingFlag = false;
        if (res.statusCode !== "[200]") {
          this.errMessage = "You are not authorized";
        }
        else {
          this.authObj = new AuthCheck(res.data);
          this.screenIdMapped = ScreenIdsMapping[this.authObj.screenId];
          sessionStorage.setItem('sessionToken', this.authObj.sessionToken);
        }
      },
        err => {
          this.isLoadingFlag = false;
          this.errMessage = "Some Error Occured. Please contact HR"
        })
    })
  }

  getAndSaveRouteParams() {
    return new Promise(resolve => {
      this.route.queryParams.subscribe(params => {
        console.log("token params", params);
        this.token = params['token'];
        resolve(true);
      });
    })
  }

}
