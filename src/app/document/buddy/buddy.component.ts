import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

import { CredentialsService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Main } from '@app/core/_api/main.service';
import * as moment from 'moment';
import { SharedService } from '@app/core/services/shared.service';
import {dropdownConfig} from '../../constants/dropdown.config'
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.component.html'
})
export class BuddyComponent implements OnInit {

  myObj = {};
  form: FormGroup;
  systemType: ""

  softwareInstalled = [];
  candidateId: string
  candidateUid: string
  name: string
  date: string
  fullData: object
  safeUrl: any
  flagDeg = true
  displayFileName:string=''
  inputfilename: string
  Buddy: any = [''];
  buddyFilterOptions: any = [''];
  OS: any = ['Linux', 'Windows', 'Mac OS', 'PC']
  flag = true
  buddyFlag: boolean = false
  buddyName: any
  docName = []
  saveBuddy = {
    _id: "",
    "currentScreenId":"",
    buddy: {
      "name": "Select",
      "email": "test@test.com"
    },
    "teamName": "DPAM",
    laptopDetails: {
      "systemType": this.OS[0],
      "softwareInstalled": ["VS code", "Postman"]
    }
  }
  nextActionObj: any
  falseClicked: boolean;
  inputDoc: any;
  message: string;
  config = dropdownConfig;
  isExternalUser: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private credentialService: CredentialsService,
    private route: ActivatedRoute,
    private mainService: Main,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private sharedService: SharedService,
    private router: Router,
    private loaderService: LoaderService) { }

  @Input() userId: string;
  @Input() screenId: string;
  isDirectUserFlag = false;


  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.isExternalUser = this.route.snapshot.queryParamMap.get('token') ? true : false;
    this.systemType = this.OS[0];
    this.form = this.formbuilder.group({
      softwareInstalled: [[], Validators.compose([Validators.required])]
    });
    if (this.userId) {
      this.isDirectUserFlag = true;
    }
    this.mainService.getBuddyDetail().subscribe(info => {
      console.log(info);
      this.Buddy = info["data"]
      this.buddyFilterOptions = [];
      this.Buddy.forEach(obj=> {
        this.buddyFilterOptions.push(obj.EmployeeName);
      })
      // this.buddyFilterOptions = this.Buddy;
      if(this.Buddy.length && this.saveBuddy.buddy.name == "Select") {
        this.saveBuddy.buddy.name = this.Buddy[0].EmployeeName;
        this.saveBuddy.buddy.email = this.Buddy[0].Email;
      }
      console.log("buddyDta", this.Buddy);

    })



    // this.candidateUid = this.credentialService.credentials ? this.credentialService.credentials["Uid"] : undefined;
    // this.myObj.Uid = this.candidateUid
    this.myObj['Uid'] = this.candidateId = this.userId || this.route.snapshot.queryParamMap.get('id');

    this.screenId = this.screenId || this.route.snapshot.queryParamMap.get('screenId');
    console.log(this.candidateId);
    this.saveBuddy._id = this.candidateId

    this.mainService.getCandidateById(this.candidateId).subscribe(info => {
      this.fullData = info["data"]
      if(this.fullData['laptopDetails']) {
        this.buddyFlag = true;
      }
      // this.softwareInstalled= this.fullData["laptopDetails"].softwareInstalled[0]


      this.name = this.fullData["candidateDetails"].name.fullName
      this.date = moment(this.fullData["candidateDetails"].doj, 'YYYY-MM-DD').toDate().toISOString().split('T')[0];
      const arr = this.fullData["uploadedDocuments"]
      for (let i in arr) {
        this.docName.push(arr[i].value)
        if (arr[i].value == "Resume") {
          this.inputfilename = arr[i].filename
          this.inputDoc=arr[i].docId

        }
      }

      if (!(this.docName.indexOf("Resume") == -1)) {
        this.flag = false
      }
      if (this.buddyFlag) {
        // this.softwareInstalled = this.form.value.softwareInstalled;
        this.systemType = this.fullData["laptopDetails"].systemType
        this.softwareInstalled = this.fullData['laptopDetails'].softwareInstalled;
        console.log("systm type", this.fullData["laptopDetails"].systemType);

        console.log(this.softwareInstalled);
        console.log("buddyName", this.fullData["buddy"].name);
        this.buddyName = this.fullData["buddy"].name

        this.saveBuddy.buddy.name = this.buddyName
        this.saveBuddy.laptopDetails.systemType = this.systemType


      }

    })


  }

  onGrid() {
    this.router.navigateByUrl('dashboard/grid')
  }
  changeBuddy(name) {
    this.flagDeg = false
    console.log(name);
    this.saveBuddy.buddy.name = name;
    this.Buddy.forEach(obj => {
      if(obj.EmployeeName == name) {
        this.saveBuddy.buddy.email = obj.Email;
      }
    });
  }
  changeOS(e) {
    console.log(e.target.value);
    // this.fullData["laptopDetails"].systemType=e.target.value
    this.saveBuddy["laptopDetails"].systemType = e.target.value


  }
  submit(elem) {
    const element = document.getElementById(elem);
    if(this.buddyFlag || this.softwareInstalled.length != 0) {
      this.saveBuddy.currentScreenId = this.screenId
      console.log("software installed", this.softwareInstalled);
      this.saveBuddy.laptopDetails.softwareInstalled = this.softwareInstalled;

      this.mainService.postToSaveData(this.saveBuddy).subscribe(response => {
        console.log("Response", response);
        if(response.statusCode != "[200]") {
          this.loaderService.setNotificationObject('error', response.message);
        } else {
          if(this.isExternalUser) {
            this.message = "Laptop details and buddy assigned successfully";
            this.loaderService.setNotificationObject('success', this.message);
          } else {
            this.router.navigateByUrl("dashboard/grid")
          }
        }
      })
    } else {
      this.falseClicked = true;
    }
  }

public onItemAdded(val) {
  this.falseClicked = false;
}

}
