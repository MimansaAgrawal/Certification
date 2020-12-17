import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoader: BehaviorSubject<boolean>;
  showNotification: BehaviorSubject<any>;
  constructor() {
    this.showLoader = new BehaviorSubject<boolean>(false);
    this.showNotification = new BehaviorSubject<any>({
      showSuccessMessage: false,
      showErrorMessage: false,
      message: 'test'
    });
  }

  setLoader(value: boolean) {
    this.showLoader.next(value);
    console.log(value);
  }

  getLoader() {
    return this.showLoader.asObservable();
  }

  setNotificationObject(type: string, message: string) {
    var showSuccessMessage, showErrorMessage;
    if(type == 'error') {
      showSuccessMessage = false;
      showErrorMessage = true;
    } else if(type == 'success') {
      showSuccessMessage = true;
      showErrorMessage = false;
    }
    this.showNotification.next({
      showSuccessMessage: showSuccessMessage,
      showErrorMessage: showErrorMessage,
      message: message
    });
  }

  getNotificationObject() {
    return this.showNotification.asObservable();
  }
}
