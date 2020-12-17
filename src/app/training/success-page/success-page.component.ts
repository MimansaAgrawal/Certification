import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }
 close(){
   console.log('closing');
   //window.close();
   //open('', '_self').close();
 }
 redirect(){
  this.authenticationService
      .logout()
      .subscribe(() => {
        window.location.reload()
        this.router.navigate(["/login"], { replaceUrl: true })
      });
 }
}
