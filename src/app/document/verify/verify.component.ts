import { Main } from './../../core/_api/main.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';
import { CredentialsService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { TrainingService } from '@app/core/services/training.service';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  // @Input() userId: string;

  rowArray: any
  modalRef: BsModalRef
  safeUrl: any
  newData: any
  flagAllAccepted = true
  displayFileName: string = ''
  dataToBeSaved = {
    _id: "",
    uploadedDocuments: [],
    currentScreenId: ""
  }


  myObj = {};





  fullData: any
  candidateUid: any;
  candidateId: any;
  screenId: string;



  constructor(private modalService: BsModalService, private http: HttpClient, private sanitizer: DomSanitizer,
    private mainService: Main,
    private credentialService: CredentialsService,
    private router: Router
    , private route: ActivatedRoute,
    private loaderService: LoaderService,
    private trainingService:TrainingService
  ) {

  }

  textBoxFlag: string
  status: any;
  documentNotUploaded: any = [];
  uploadedDocList: any = [];
  ngOnInit() {

    // this.candidateUid= this.credentialService.credentials["Uid"];
    // this.myObj['Uid'] =this.candidateUid
    this.myObj['Uid'] = this.candidateId = this.route.snapshot.queryParamMap.get('id');
    this.screenId = this.route.snapshot.queryParamMap.get('screenId');
    console.log('screenId', this.screenId);
    this.dataToBeSaved._id = this.candidateId
    console.log("current url", window.location.href);

    this.mainService.getCandidateById(this.candidateId).subscribe(obj => {

      this.fullData = obj['data']
      this.status = this.fullData.candidateDetails.professionalExperience;
      this.rowArray = obj['data']['uploadedDocuments']
      for (let i = 0; i < this.rowArray.length; i++) {
        this.rowArray[i]['toggleModal'] = false;
        this.uploadedDocList.push(this.rowArray[i].value);
        //console.log("nnnn",this.uploadedDocList)

      }
      console.log("uploadeddd", this.uploadedDocList)

      console.log("RoArray", this.rowArray);
      this.mainService.getDocumentsToBeUploadedByStatus(this.status).subscribe((obj: any) => {
        obj["data"].forEach(element => { //new
          if(this.uploadedDocList.indexOf(element.name)==-1 )
          this.documentNotUploaded.push(element.name);
        });


        // for (let i = 0; i < obj["data"].length; i++) { //new
        //   if (this.uploadedDocList.indexOf(obj["data"][i].name) == -1) {
        //     console.log('a',i)
        //     // if (this.rowArray[i].reject == undefined) {
        //       this.documentNotUploaded.push(obj["data"][i].name)
        //     // }
        //   }
        //   if (this.uploadedDocList.indexOf(obj["data"][i].name) != -1 && this.rowArray[i].reject == true) {
        //     // if (this.rowArray[i].reject == undefined) {
        //       console.log('b',i);
              
        //       this.documentNotUploaded.push(obj["data"][i].name)
        //     // }
        //   }
        // }
        console.log("docnotupload", this.documentNotUploaded)
      })

    })
  }

  // openModal(template: TemplateRef<any>,inputFileName) {

  //   // const header = {
  //   //   "content-type": "application/json"
  //   // }

  //   this.myObj['uploadedDocuments'] = [{filename: inputFileName}];
  //   this.displayFileName=inputFileName


  //   console.log(this.myObj);

  //   this.mainService.postToDownloadData(this.myObj).subscribe((res: any) => {
  //     this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res['data'][0].uploadPath);
  //     this.modalRef = this.modalService.show(template);
  //   })
  // }

  // openModal(template: TemplateRef<any>, id1) {
  //   setTimeout(() => {
  //     this.loaderService.setLoader(true);
  //   });

  //   this.mainService.getCandidateById(this.candidateId).subscribe(info => {
  //     this.newData = info.data.uploadedDocuments;
  //     console.log(this.newData._id);
  //     const arr = this.newData;
  //     for (const i in arr) {
  //       if (arr[i].docId === id1) {
  //         this.myObj.uploadedDocuments[0].filename = arr[i].filename;
  //         this.displayFileName=arr[i].filename
  //         this.mainService.postToDownloadData(this.myObj).subscribe(obj => {
  //           console.log('object responded', obj);
  //           console.log('data responded', this.myObj);


  //           this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(obj.data[0].uploadPath);
  //           this.modalRef = this.modalService.show(template);

  //           setTimeout(() => {

  //             this.loaderService.setLoader(false);
  //           });
  //         });

  //       }
  //     }

  //   });
  // }

  saveVerifyStatus() {
    console.log('jvjkvjkv')
    for (let i in this.rowArray) {
      if (this.rowArray[i].reject == true) {
        this.flagAllAccepted = false
        break
      }
    }
    console.log('fliag', this.flagAllAccepted)
    if (this.flagAllAccepted == true) {
      // this.dataToBeSaved.currentStatus.actionId=this.nextActionObj.actionId
      this.dataToBeSaved.currentScreenId = this.screenId
      this.dataToBeSaved.uploadedDocuments = this.rowArray;
      this.mainService.postToSaveData(this.dataToBeSaved).subscribe(response => {
        console.log("response", response);
        if(!this.trainingService.trainingUpload){
          this.router.navigateByUrl("dashboard/grid")
        }
          else if(this.trainingService){
            this.router.navigateByUrl('/training/feedbackgrid')
            this.trainingService.trainingUpload=false
          }
      })
      console.log(this.dataToBeSaved);
    }
    else {
      // this.dataToBeSaved.currentStatus.actionId= this.fullData.currentStatus.previousActionId
      this.dataToBeSaved.uploadedDocuments = this.rowArray;
      // this.dataToBeSaved.uploadedDocuments.forEach(element => { //to asssign verify as true//*ngIf="!doc.verified"
      //   if(element.reject == false){
      //     this.dataToBeSaved.uploadedDocuments[this.dataToBeSaved.uploadedDocuments.indexOf(element)].verified = true;
      //     console.log("---------",this.dataToBeSaved.uploadedDocuments.indexOf(element))
      //   }
      // });
      // this.dataToBeSaved.currentStatus.candidateType=this.fullData.currentStatus.candidateType
      this.dataToBeSaved.currentScreenId = this.screenId;
      this.mainService.postToSaveData(this.dataToBeSaved).subscribe(response => {
        console.log("response", response);
        if(!this.trainingService.trainingUpload){
        this.router.navigateByUrl("dashboard/grid")
      }
        else if(this.trainingService){
          this.router.navigateByUrl('/training/feedbackgrid')
          this.trainingService.trainingUpload=false
        }
      })
      console.log(this.dataToBeSaved);
    }
  }
  onGrid() {
    this.router.navigateByUrl('dashboard/grid')
  }
  openTextBox(index: any) {
    this.rowArray[index].reject = true;
  }
  hideTextBox(index: any) {
    this.rowArray[index].reject = false;
    this.rowArray[index].reason = "";
  }

}
