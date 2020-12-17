import { Component } from "@angular/core";
import {LoaderService} from '@app/core/services/loader.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  showLoader = false;
  showErrorMessage = false;
  showSuccessMessage = true;
  message: string = "";
  constructor(private loaderService: LoaderService) {
    setTimeout(() => {
      loaderService.getLoader().subscribe(res => {
        console.log('loader in app cmp', res);
        this.showLoader = res;
      });
      loaderService.getNotificationObject().subscribe(obj => {
        this.message = obj.message;
        this.showErrorMessage = obj.showErrorMessage;
        this.showSuccessMessage = obj.showSuccessMessage;
        setTimeout(() => {
          this.showErrorMessage = this.showSuccessMessage = false;
        }, 2000);
      });
    });

  }
}
