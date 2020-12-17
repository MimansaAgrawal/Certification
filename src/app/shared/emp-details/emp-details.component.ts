import { Component, OnInit,TemplateRef, EventEmitter, Input, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { CredentialsService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { Main } from '@app/core/_api/main.service';
import * as moment from 'moment';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  myObj = {};
  modalRef:BsModalRef
  candidateId: string
  candidateUid: string
  name:string = "";
  date:string = "";
  safeUrl:any;
  toggleModal = false;
  inputfilename: string;
  @Input() fullData:object = {};
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter();
  @Output() prevStep: EventEmitter<boolean> = new EventEmitter();
  inputDoc: any;

  constructor(
    private route: ActivatedRoute,
    private modalService:BsModalService,
    private mainService:Main,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {	
	  
  }

  ngOnChanges() {
    console.log("full data received", this.fullData);
    if (!this.fullData || Object.keys(this.fullData).length != 0){
      this.name=this.fullData["candidateDetails"].name.fullName;
      this.date = moment(this.fullData["candidateDetails"].doj, 'YYYY-MM-DD').toDate().toISOString().split('T')[0];
      this.myObj['Uid']  = this.route.snapshot.queryParamMap.get('id');
	  this.mainService.getCandidateById(this.candidateId).subscribe(info => {
		  const arr = this.fullData["uploadedDocuments"]
		  console.log(arr);
		  for (let i in arr) {
        if (arr[i].value == "Resume") {
          this.inputfilename = arr[i].filename;
          this.inputDoc=arr[i].docId

        }
		  }
		  console.log(this.inputfilename);
		})
    }
  }

  // openModal(template: TemplateRef<any>, inputFileName: string) {


  //   this.modalRef = this.modalService.show(template);

  //   // this.myObj.uploadedDocuments[0].filename = inputFileName

  //   // console.log(this.myObj);

  //   // this.mainService.postToDownloadData(this.myObj).subscribe((res: any) => {

  //   //   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res['data'][0].uploadPath);
  //   //   this.modalRef = this.modalService.show(template);
  //   // })
  // }

  next() {
    this.nextStep.emit(true);
  }

  prev() {
    this.prevStep.emit(true);
  }

}