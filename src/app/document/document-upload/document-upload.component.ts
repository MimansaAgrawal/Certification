import { Main } from './../../core/_api/main.service';
import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { DocumentService } from '@app/document/document.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @Input() fullData: any;
  @Input() userId: string;
  @Input() screenId: string;
  formGroup: FormGroup;
  modalRef: BsModalRef;
  myForm: any;
  file: any;
  safeUrl: any;
  safeUrlNew: any;
  url: any;
  flag = false;
  // uploadedData: any = []
  arr = [];
  uploadedDocument = [];
  rowArray: any;
  newData;
  records: any;
  docId: any = [];
  docIdNew: any = [];
  rec: any = [];
  candidateId: string;
  candidateStatus: string;
  candidateUid: string;
  displayFileName: string = ''
  status: any;
  uploadArray: any = [];
  flagCheck = false;
  acceptedDoc = [];
  // documentService.docObj = {};
  nextActionObj: any;
  responseFileNames: string[];
  dataToBeSaved = {
    _id: '',
    uploadedDocuments: [],
    currentStatus: {
      // previousActionId: '',
      // documentstobeuploaded: [],
      // candidateType: 'l',
      // name: 'Send Offer Letter',
      // value: 'Offer Letter Sent',
      // actionId: '5f3263f02266f82344d8123f',
      // description: 'Please Fill candidate details'

    }
  };
  //requiredDoc : any = {};
  myObj = {};
  filename: string = ''
  isDirectUserFlag = false;


  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private router: Router,
    private mainService: Main,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private credentialService: CredentialsService,
    private documentService: DocumentService
  ) {
  }

  ngOnInit() {
    const MAX_FILES = 35;
    this.responseFileNames = [];
    for(let i=0; i<MAX_FILES; i++) {
      this.responseFileNames.push('');
    } 

    if (this.userId) {
      this.isDirectUserFlag = true;
    }
    // this.candidateUid = this.credentialService.credentials ? this.credentialService.credentials['Uid'] : undefined;
    // this.myObj['Uid'] = this.candidateUid;
    this.myObj['Uid'] = this.candidateId = this.userId || this.route.snapshot.queryParamMap.get('id');
    console.log('candidate ID:::', this.candidateId);


    // this.dataToBeSaved.currentStatus.actionId="5f3a33a7e454f016c0f1ff13"
    this.dataToBeSaved._id = this.candidateId;
    console.log('dataId', this.dataToBeSaved._id);

    console.log('fullData',this.fullData);
    console.log('candidate ID:::', this.candidateId);
    this.nextActionObj = this.fullData.nextAction[0];
    this.candidateStatus = this.fullData.candidateDetails.professionalExperience;
    this.mainService.getDocumentsToBeUploadedByStatus(this.candidateStatus).subscribe(obj => {
      this.rowArray = obj.data;
      console.log('this.rowArray', this.rowArray);
      for (let i = 0; i < this.rowArray.length; i++) {
        this.rowArray[i]['toggleModal'] = false;
      }
      // tslint:disable-next-line:forin
      for (const i in this.rowArray) {
        this.documentService.docObj[this.rowArray[i]._id] = this.rowArray[i].isRequired;
      }
      //console.log('nikkk',this.documentService.requiredDoc)
      console.log('Initial', this.documentService.docObj);
      this.records = this.fullData.uploadedDocuments;
      this.isAccepted();
      // tslint:disable-next-line:forin
      for (const i in this.records) {
        this.docIdNew.push(this.records[i].docId);
        if (this.records[i].reject === false) {
          this.documentService.docObj[this.records[i].docId] = false;
          //this.documentService.requiredDoc[this.records[i].docId] = false; //added by nikhil
        }
      }
      console.log('latest', this.documentService.docObj);
      console.log('doc in new===>', this.docIdNew);
      console.log('doc in records===>', this.records);
      // for (let i in this.records) {
      //   this.docIdNew.push(this.records[i].docId)
      //   this.documentService.docObj[this.records[i].docId]=false
      //   console.log("bool Values", this.documentService.docObj[this.records[i].docId]);

      // }
      // console.log("latest",this.documentService.docObj);
    });

    this.documentService.isRequiredDocUploaded = false; //setting initial value

  }


  check() {
    for (const i in this.documentService.docObj) { //chnage by nikhil
      if (this.documentService.docObj[i] === true) {
        return true;

      }
    }
    return false;
  }

  isAccepted() {

    this.fullData.uploadedDocuments.forEach(element => {
      if (element.reject === false) {
        this.acceptedDoc.push(element.docId);

      }
    });
  }

  fileChanged(fileEvent: any, docId1, name1, i) {
    this.documentService.docObj[docId1] = false;
    this.flagCheck = false;
    const uploadedData = {
      docId: docId1,
      value: name1,
      filename: 'resignation.pdf',
      verified: false,
      reject: false,
      reason: '',
    };
    console.log(uploadedData);

    this.file = fileEvent.target.files;
    console.log(this.file);
    console.log(this.file[0].name);
    this.myObj['uploadedDocuments'] = [{ filename:  this.file[0].name}];

    if (this.docIdNew.indexOf(docId1) === -1) {
      uploadedData.docId = docId1;
      uploadedData.value = name1;
      uploadedData.filename = this.file[0].name;
    } else {
      const arr = this.fullData.uploadedDocuments;
      for (const i in arr) {
        // console.log(i,arr[i]);

        if (arr[i].docId === docId1) {
          // console.log("Inside array",arr[i].docId);

          this.fullData.uploadedDocuments[i].value = name1;
          this.fullData.uploadedDocuments[i].filename = this.file[0].name;

          this.documentService.candidateData.uploadedDocuments[i].value = name1;
          this.documentService.candidateData.uploadedDocuments[i].filename = this.file[0].name;
        }
      }
    }


    this.mainService.uploadCandidateDocument(this.myObj).subscribe(info => {
      console.log('data to be put inside put method', info);
      this.url = info.data[0].uploadPath;

      console.log("file ::,,,",this.file[0]);

      this.responseFileNames[i] = info.data[0].fileName;
      this.myObj['uploadedDocuments'] = [{ filename:  info.data[0].fileName}];
      uploadedData.filename = info.data[0].fileName;
      this.documentService.uploadedDocuments = this.deletePreviousDataWithDocId(this.documentService.uploadedDocuments, docId1);
      this.documentService.candidateData.uploadedDocuments = this.deletePreviousDataWithDocId(this.documentService.candidateData.uploadedDocuments, docId1);
      this.documentService.uploadedDocuments.push(uploadedData);
      this.documentService.candidateData.uploadedDocuments.push(uploadedData);
      console.log(this.myObj);
      console.log(this.responseFileNames);
      this.mainService.putData(this.url, this.file[0]).subscribe(info1 => {
        console.log('put method id working');

      });

    });
    this.check();

  }

  deletePreviousDataWithDocId(arr, docId) {
    console.log(docId);
    console.log(arr);
    let newArr = [];
    arr.forEach(obj=>{
      if(obj.docId!== docId) {
        newArr.push(obj);
      }
    });
    return newArr;
  }
  onSubmit() {
    console.log('rec::', this.documentService.uploadedDocuments);

  }



  flagForDoc() {
    this.documentService.isRequiredDocUploaded = !this.documentService.isRequiredDocUploaded;
  }
}
