import { CommonHeaderComponent } from '@app/shared/common-header/common-header.component';
import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { CredentialsService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Main } from '@app/core/_api/main.service';
import * as moment from 'moment';
import { dropdownConfig } from '../../constants/dropdown.config'
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-rm',
  templateUrl: './rm.component.html'
})
export class RMComponent implements OnInit {
  myObj = {};
  modalRef: BsModalRef
  candidateId: string
  candidateUid: string
  name: string
  date: string
  fullData: object
  Id1: any
  safeUrl: any
  flagDeg = true
  displayFileName: string = ''
  inputfilename: string
  inputDoc: any
  RM: any = [''];
  filterOptions: any = [''];
  flag = true
  docName = []
  @Input() userId: string;
  @Input() screenId: string;
  isDirectUserFlag = false;
  saveRm: any;
  message: string;
  config = dropdownConfig
  isExternalUser: boolean;

  constructor(
    private credentialService: CredentialsService,
    private route: ActivatedRoute,
    private mainService: Main,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.isExternalUser = this.route.snapshot.queryParamMap.get('token') ? true : false;
    this.saveRm = {
      "_id": "",
      "currentScreenId": "",
      "reportingManager": {
        "name": "Select",
        "email": "Test"
      },
      "teamName": "DPAM",

    };
    if (this.userId) {
      this.isDirectUserFlag = true;
    }

    this.mainService.getRmDetail().subscribe(info => {
      this.RM = info["data"]
      this.filterOptions = [];
      this.RM.forEach(obj => {
        this.filterOptions.push(obj.EmployeeName);
      })
      // this.filterOptions = this.RM;
      if (this.RM.length && this.saveRm.reportingManager.name == "Select") {
        this.saveRm.reportingManager.name = this.RM[0].EmployeeName;
        this.saveRm.reportingManager.email = this.RM[0].Email;
      }
    })
    this.candidateUid = this.credentialService.credentials ? this.credentialService.credentials["Uid"] : undefined;


    // this.myObj.Uid = this.candidateUid
    this.myObj['Uid'] = this.candidateId = this.userId || this.route.snapshot.queryParamMap.get('id');
    this.screenId = this.screenId || this.route.snapshot.queryParamMap.get('screenId');
    console.log(this.candidateId);
    this.saveRm._id = this.candidateId

    this.mainService.getCandidateById(this.candidateId).subscribe(info => {
      console.log(info);
      this.fullData = info["data"]
      if (this.fullData['reportingManager']) {
        this.saveRm.reportingManager.name = this.fullData['reportingManager'].name;
        this.saveRm.reportingManager.email = this.fullData['reportingManager'].email;
      }
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
          this.inputDoc = arr[i].docId

        }
      }

      if (!(this.docName.indexOf("Resume") == -1)) {
        this.flag = false
      }
    })

  }

  onGrid() {
    this.router.navigateByUrl('dashboard/grid')
  }
  changeRM(name) {
    this.saveRm.reportingManager.name = name;
    this.RM.forEach(rm => {
      if (rm.EmployeeName == name) {
        this.saveRm.reportingManager.email = rm.Email;
      }
    })
  }
  submit() {
    this.saveRm.currentScreenId = this.screenId
    console.log('WaveRm', this.saveRm.currentScreenId)

    this.mainService.postToSaveData(this.saveRm).subscribe(response => {
      console.log("Response", response);
      if (response.statusCode != "[200]") {
        this.loaderService.setNotificationObject('error', response.message);
      } else {
        if(this.isExternalUser) {
          this.message = "Reporting Manager assigned successfully";
          this.loaderService.setNotificationObject('success', this.message);
        } else {
          this.router.navigateByUrl("dashboard/grid")
        }
      }
    })
  }

}
