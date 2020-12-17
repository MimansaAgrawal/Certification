import { Component, OnInit } from "@angular/core";
import { showNotification } from "../../_utils/notify";
import { HttpService } from "../../core/http/http.service";
import { Logger } from "@app/core";

const log = new Logger("Login");

@Component({
  selector: "app-temp-comp",
  templateUrl: "./temp-comp.component.html",
  styleUrls: ["./temp-comp.component.css"]
})
export class TempCompComponent implements OnInit {
  constructor() {
    log.debug(HttpService);
  }

  ngOnInit() {}
}
