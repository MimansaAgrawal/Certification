import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { _throw } from "rxjs/observable/throw";

@Injectable()
export class MapAndCatchHandler {
  constructor() { }
  mapAndCatch(req) {
    return req
      .map((res: Response) => {
        return res;
        // return res.json();
      })
      .catch(error => {
        console.log(error)
        let errMsg;
        try {
          errMsg = error.json().error || "Server Error";
        } catch {
          errMsg = error._body;
        }
        return _throw(errMsg);
      });
  }
}
