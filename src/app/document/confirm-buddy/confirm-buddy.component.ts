import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import {LoaderService} from '@app/core/services/loader.service';

import { CredentialsService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Main } from '@app/core/_api/main.service';
import * as moment from 'moment';
import { SharedService } from '@app/core/services/shared.service';

@Component({
  selector: 'app-confirm-buddy',
  templateUrl: './confirm-buddy.component.html'
})
export class ConfirmBuddyComponent implements OnInit {

  myObj = {};
  candidateId: string
  candidateUid: string
  name: string
  date: string
  fullData: object
  displayFileName:string=''
  safeUrl: any
  flagDeg = true
  inputfilename: string
  Buddy: any = ['Yes', 'No'];
  flag = true
  // experienceType
  docName = []
  confirmBuddyObj = {
    _id: "",
    "currentScreenId":"",

    "buddy": {
      "isconfirmed": false,
    },
    // "allEmploymentDetails":{
    //   "experienceType":""
    // }

    // "currentStatus": {
    //   "documentstobeuploaded": [],
    //   "previousActionId": "5f3a36d7e454f016c0f1ff15",
    //   "candidateType": "f",
    //   "name": "Assign Reporting Manager",
    //   "value": "Reporting Manager Assigned",
    //   "actionId": "",
    //   "description": "Please Assign Reporting Manager"
    // }
  }

  buddyConfirmation: string;

  @Input() userId: string;
  @Input() screenId: string;
  isDirectUserFlag = false;
  inputDoc: any;
  message: string;
  isExternalUser: boolean;
  constructor(
    private credentialService: CredentialsService,
    private route: ActivatedRoute,
    private mainService: Main,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private sharedService: SharedService,
    private router: Router,
    private loaderService: LoaderService
  ) { }
  //       this.dataToBeSaved.currentStatus.actionId= this.fullData.currentStatus.previousActionId

  ngOnInit() {
    this.isExternalUser = this.route.snapshot.queryParamMap.get('token') ? true : false;
    if (this.userId) {
      this.isDirectUserFlag = true;
    }
    // this.candidateUid = this.credentialService.credentials ? this.credentialService.credentials["Uid"] : undefined;


    // this.myObj.Uid = this.candidateUid
    // this.candidateId = this.route.snapshot.queryParamMap.get('id');
    // console.log(this.candidateId);

    // this.confirmBuddyObj._id = this.candidateId
    this.myObj['Uid'] = this.candidateId = this.userId || this.route.snapshot.queryParamMap.get('id');
    this.screenId = this.screenId || this.route.snapshot.queryParamMap.get('screenId');

    console.log(this.candidateId);

    this.confirmBuddyObj._id = this.candidateId



    this.mainService.getCandidateById(this.candidateId).subscribe(info => {
      console.log(info);

      this.fullData = info["data"]
      console.log(this.fullData);
      this.name = this.fullData["candidateDetails"].name.fullName
      console.log(typeof this.fullData["candidateDetails"].doj);
      this.date = moment(this.fullData["candidateDetails"].doj, 'YYYY-MM-DD').toDate().toISOString().split('T')[0];
      const arr = this.fullData["uploadedDocuments"]
      console.log(arr);
      for (let i in arr) {
        this.docName.push(arr[i].value)
        if (arr[i].value == "Resume") {
          this.inputfilename = arr[i].filename
          this.inputDoc=arr[i].docId

        }
      }
      console.log(this.inputfilename)
      if (!(this.docName.indexOf("Resume") == -1)) {
        this.flag = false
      }
    })


  }

  changeBuddy(e) {
    this.flagDeg = false
    this.buddyConfirmation = e.target.value
    console.log(e.target.value);
  }
  
  onGrid() {
    this.router.navigateByUrl('dashboard/grid')
  }
  submit() {
    if (this.buddyConfirmation == "No") {
      this.sharedService.flagBuddy = true
      const screenId = "br"
      this.confirmBuddyObj.currentScreenId = screenId;
      this.mainService.postToSaveData(this.confirmBuddyObj).subscribe(response => {
        console.log("Response", response);
        this.showNotification(response, "You have successfully rejected as buddy");
      })
    }
    else {
      this.confirmBuddyObj.buddy.isconfirmed = true
      console.log('ScreenId',this.screenId)
      this.confirmBuddyObj.currentScreenId = this.screenId;

      this.mainService.postToSaveData(this.confirmBuddyObj).subscribe(response => {
        console.log("Response", response);
        this.showNotification(response, "You have successfully confirmed as buddy");
      })
    }
  }

  showNotification(response, successMessage) {
    if(response.statusCode != "[200]") {
      this.loaderService.setNotificationObject('error', response.message);
    } else {
      if(this.isExternalUser) {
        this.loaderService.setNotificationObject('success', successMessage);
      } else {
        this.router.navigate(['dashbord/grid'], { queryParams: { id: this.candidateId } });
      }
    }
  }
}
