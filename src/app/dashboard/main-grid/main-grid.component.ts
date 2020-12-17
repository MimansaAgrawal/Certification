import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as moment from 'moment';
import {Main} from '@app/core/_api/main.service';
import {Router} from '@angular/router';
import {LoaderService} from '@app/core/services/loader.service';
import {SharedService} from '@app/core/services/shared.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}

  }]
})

export class MainGridComponent implements OnInit {
  filterDataArray: any;
  rowDataArray: any;
  check_exclude_click = false;
  dataSource: MatTableDataSource<any>;
  profileStakeholderArray: any;
  flag = 0;
  modalRef: BsModalRef;
  deleteId: any;
  status: string;
  flagRejected=false
  modalTitleText: string;
  modalBodyText: string;

  updateActionObject = {
    _id: '',
    // currentStatus: {
    //   previousActionId: '',
    //   documentstobeuploaded: [],
    //   candidateType: 'l',
    //   name: 'Send Offer Letter',
    //   value: 'Offer Letter Sent',
    //   actionId: '5f3263f02266f82344d8123f',
    //   description: 'Please Fill candidate details'

    // }
    // currentStatus:{
    //   previousActionId:null,
    //   documentstobeuploaded:[],
    //   candidateType:'f',
    //   name:"",
    //   value:'Offer Letter Sent',
    //   actionId:'5f3263f02266f82344d8123f',
    //   description: 'Please Send Offer Letter',
    // compulsory: '',
    // screenId: '',
    // previousScreenId:'',
    currentScreenId: '',
    //  },
  };

  // gecObject={
  //   _id:'',
  //   currentScreenId: '',
  //   officialInfo:{
  //     officialMail:''
  //   }

  // }

  gecObject={
    _id:"",
    currentScreenId: "",
   
    officialEmail:""
    
  }

  rejectObj = {
    _id: '',
    // currentScreenId: "ro",
    rejectReason: '',
    iswithdrawal:true

    // "nextAction": [],
    // 'currentStatus': {
    //   'iswithdrawal':"",
    //   'documentstobeuploaded': [],
    //   'previousActionId': '',
    //   'candidateType': 'l',
    //   'name': 'Reject Offer',
    //   'value': 'Offer Letter Rejected',
    //   'actionId': 'ro',
    //   'description': 'Please Reject Offer',
    //   'reason': ''
    // },
    
  };
  preActiveCount:any
  preCompleteCount:any
  onActiveCount:any
  rejectedCount:any
  rejectedReason=""
  toggleModal=false
  toggleModalRej=false
  toggleModalDel=false
  toggleModalGec=false
  mail=''
  gecFlag=false

  columnsToDisplay = ['name', 'profile', 'dateOfJoining', 'currentStatus', 'nextStatus', 'options'];
  fresherStatus = [
    {name: 'Offer Letter Sent', screenId: 'sol'}, 
    {name: 'Offer Letter Accepted', screenId: 'ao'}, 
    {name: 'Send Welcome Mail', screenId: 'swm'},  
    {name: 'Documents Upload', screenId: 'ud'},
    {name: 'Document Verified', screenId: 'vd'}, 
    {name: 'Assign RM', screenId: 'arm'}, 
    {name: 'Assign Buddy and Laptop', screenId: 'abl'}, 
    {name: 'Buddy Confirmed', screenId: 'bc'},
    {name: 'Joined', screenId: 'j'},
    {name: 'Add Bank Details', screenId: 'bd'},
  ];
  
  // previouslyDoneStatus = ['Offer Letter Sent', 'Offer Letter Accepted', 'Documents Upload',
  //   'Document Verified', 'Send Welcome Mail', 'Intro E-mail Sent', 'Joined'];
  expandedElement: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient, private mainService: Main, private router: Router,
              private formbuilder: FormBuilder, private modalService: BsModalService, private loaderService: LoaderService, private sharedService: SharedService) {
    this.sharedService.updateForm = this.formbuilder.group({
      address: '',
      dateOfJoining: '',
      designation: '',
      email: '',
      experienceStatus: '',
      hrSpoc: '',
      name: '',
      phoneNumber: '',
      profile: '',
      profileStakeHolderValue: '',
      profileStakeHolderArr: '',
      resume: '',
      id: '',
      dateOfOffer: '',

    });
  }


  ngOnInit() {
    this.updateCounter();
    this.status = this.sharedService.currStatus ? this.sharedService.currStatus : 'pre_a';
    this.fetchDetail()
    this.applyActiveStatus();
  }


  getDate(input: any): any {
    return moment(input).format('L');
  }


  preActiveLink:boolean = true;
  preCompletedLink:boolean = false;
  onActiveLink = false;
  rejectedLink:boolean =false;
  getCandidateData(currStatus: string) {
    this.status = currStatus;
    this.sharedService.currStatus = currStatus;
    if(this.status=='r')
    {
      this.flagRejected=true
    }
    else{
      this.flagRejected=false
    }

    this.updateCounter();

    this.mainService.getDashboardDataWithStatus(this.status).subscribe((obj: any) => {
      this.rowDataArray = obj['data'];
      this.addPreviouslyDoneStatus();
      this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      console.log('data', this.dataSource);
      this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyActiveStatus();
    });
  }


  applyFilter(filterValue: string) {
    if (filterValue.trim().length > 0) {
      this.filterDataArray = this.rowDataArray.filter(data => // console.log('data', data);
        data.candidateDetails.name.fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
        data.candidateDetails.designation.name.toLowerCase().includes(filterValue.toLowerCase())
      );

    } else {
      this.filterDataArray = this.rowDataArray;
    }
    this.dataSource = new MatTableDataSource<any>(this.filterDataArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  openModal(row: any) {
    this.modalTitleText="Delete Candidate"
    this.modalBodyText="Are you sure, you want to delete this candidate?"
    this.toggleModalDel=true
    console.log(row);
    // this.modalRef = this.modalService.show(template);
    // this.modalRef.setClass('modal-dialog-centered');

    this.deleteId = row;

  }

  openModal2(row: any) {
    this.modalTitleText="Reject Candidate"
    this.modalBodyText="Are you sure, you want to reject this candidate?"
    this.toggleModalRej=true
    console.log("toggle modal rejected ",this.toggleModalRej);
    
    console.log(row);
    // this.modalRef = this.modalService.show(template);
    // this.modalRef.setClass('modal-dialog-centered');

    this.deleteId = row;

  }

  fetchDetail(){
    this.mainService.getDashboardDataWithStatus(this.status).subscribe((obj: any) => {
      this.rowDataArray = obj['data'];
      this.addPreviouslyDoneStatus();
      this.dataSource = new MatTableDataSource<any>(this.rowDataArray);

      console.log('data', this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
    this.updateCounter();
  }

  reject() {
    this.rejectObj._id = this.deleteId;
    this.rejectObj.rejectReason = this.rejectedReason;
    console.log("rejected reason ",this.rejectedReason);
    
    console.log("reject object ",this.rejectObj);
    
    this.mainService.postToSaveData(this.rejectObj).subscribe(response => {
      console.log('response', response);
      this.updateCounter();
      this.fetchDetail()
    });
  }

  delete() {
    this.mainService.DeleteRow(this.deleteId).subscribe(data => {
      this.updateCounter();
      this.fetchDetail();
    });
  }

  getActionPage(screenId: string, userId: string, template: TemplateRef<any>,
                 professionalExperienceElement: string, nextActionElementObject: any, index: any) {
    // upload documents -> 5f3a33a7e454f016c0f1ff13 done
    //  upload resignation-> 5f3263f12266f82344d81240 done
    // accept offer-> 5f3263f12266f82344d81241 done
    // reject offer-> 5f3263f12266f82344d81242 done
    // send offer -> 5f3263f02266f82344d8123f done
    // assign buddy -> 5f3a376ee454f016c0f1ff16 done
    // assign rm -> 5f3fb4a28c41832bc8ec72e0 done
    // verify docs -> 5f3a36d7e454f016c0f1ff15 done
    // send welcome mail -> 5f3a3e3be454f016c0f1ff1c done

    // confirm as buddy -> 5f3fb8308c41832bc8ec72e1
    // resume -> 5f3f8e6a8c41832bc8ec72de

    console.log('checker', nextActionElementObject);
    this.gecObject._id=userId
    this.updateActionObject._id = userId;
    // this.updateActionObject.currentStatus.documentstobeuploaded = nextActionElementObject.documentstobeuploaded;
    // this.updateActionObject.currentStatus.candidateType = professionalExperienceElement;
    // this.updateActionObject.currentStatus.name = nextActionElementObject.name;
    // this.updateActionObject.currentStatus.actionId = actionId;
    // this.updateActionObject.currentStatus.value = nextActionElementObject.value;
    // this.updateActionObject.currentStatus.description = nextActionElementObject.description;
    // this.updateActionObject.currentStatus.previousActionId = nextActionElementObject.previousActionId;
    this.updateActionObject.currentScreenId = nextActionElementObject.screenId;
    this.gecObject.currentScreenId = nextActionElementObject.screenId;

    console.log(" this.updateActionObject.currentScreenId ", this.updateActionObject);
    
    switch (nextActionElementObject.screenId) {

      case 'ao':

        this.modalTitleText = 'Accept Offer';
        this.modalBodyText = 'Are you sure, you want to accept offer?';
        this.toggleModal=true
        console.log("toggleModal",this.toggleModal);
        
        // this.modalRef = this.modalService.show(template);
        // this.modalRef.setClass('modal-sm');
        break;

      case 'br':

          this.modalTitleText = 'Reject As Buddy';
          this.modalBodyText = 'Are you sure, you want to reject as buddy?';
          this.toggleModal=true

          // this.modalRef = this.modalService.show(template);
          // this.modalRef.setClass('modal-sm');
          break;

      case 'ro':
        this.modalTitleText = 'Reject Offer';
        this.modalBodyText = 'Are you sure, you want to reject offer?';
        this.toggleModal=true

        // this.modalRef = this.modalService.show(template);
        // this.modalRef.setClass('modal-sm');
        break;

      case 'gec':
        this.modalTitleText = 'Generate Employee Code';
        this.modalBodyText = 'Are you sure, you want to generate Employee Code?';
        this.toggleModalGec=true
        this.gecFlag=true
        
        break

      case 'ud':
        this.router.navigate(['/document/upload'], {queryParams: {id: userId, screenId: nextActionElementObject.screenId}});
        break;

      case 'vd':
        console.log('indexof-->', index);
        this.router.navigate(['document/verify'], {queryParams: {id: userId, screenId: nextActionElementObject.screenId}});
        break;

      case 'urgl':
        this.modalTitleText = 'Upload Resignation';
        this.modalBodyText = 'Are you sure, you want to upload resignation?';
        this.toggleModal=true

        // this.modalRef = this.modalService.show(template);
        // this.modalRef.setClass('modal-sm');
        break;

      case 'sol':
        this.modalTitleText = 'Send Offer';
        this.modalBodyText = 'Are you sure, you want to send offer letter?';
        this.toggleModal=true

        // this.modalRef = this.modalService.show(template);
        // this.modalRef.setClass('modal-sm');
        break;

      case 'arm':
        this.router.navigate(['document/rm'], {queryParams: {id: userId, screenId: nextActionElementObject.screenId}});
        break;

      case 'abl':
        this.router.navigate(['document/buddy'], {queryParams: {id: userId, screenId: nextActionElementObject.screenId}});
        break;
      case 'bc':
        this.router.navigate(['document/buddyConfirm'], {queryParams: {id: userId, screenId: nextActionElementObject.screenId}});
        break;
      case 'anb':
        this.router.navigate(['document/buddy'], {queryParams: {id: userId, screenId: nextActionElementObject.screenId}});
        break;
      case 'swm':
        this.modalTitleText = 'Send Welcome Mail';
        this.modalBodyText = 'Are you sure, you want to send welcome mail?';
        this.toggleModal=true

        // this.modalRef = this.modalService.show(template);
        // this.modalRef.setClass('modal-sm');
        break;

      case 'snrb':
        this.modalTitleText="Send Notifcation";
        this.modalBodyText="Are you sure, you want to send notification to RM and Buddy"
        this.toggleModal=true
        break

        case 'snrpb':
          this.modalTitleText="Send Notifcation";
          this.modalBodyText="Are you sure, you want to send notification to RM, Profile Stakeholder and Buddy"
          this.toggleModal=true
          break

        

      case 'wm':
        this.modalTitleText = 'Send Welcome Mail';
        this.modalBodyText = 'Are you sure, you want to send welcome mail?';
        this.toggleModal=true
        break
      
      case 'oni':
        this.modalTitleText = 'Onboarding Induction Training';
        this.modalBodyText = 'Has candidate completed Onboarding and Induction process?';
        this.toggleModal=true
        break

      case 'j':
        this.modalTitleText = 'Confirm Joining Status';
        this.modalBodyText = 'Has the candidate Joined?';
        this.toggleModal=true

        // this.modalRef = this.modalService.show(template);
        // this.modalRef.setClass('modal-sm');
        break;

      case 'bd':
        this.router.navigate(['post-joining'], { queryParams: { id: userId, screenId: nextActionElementObject.screenId} });
        break;

      case 'aa':
        this.router.navigate(['post-joining/asset-info'], { queryParams: { id: userId, screenId: nextActionElementObject.screenId} });
        break;

      case 'ha':
        this.router.navigate(['post-joining/asset-config'], { queryParams: { id: userId, screenId: nextActionElementObject.screenId} });
        break;
        
      default:
        break;
    }
  }


  confirm(): void {

    //Call update api
    console.log("togglemodalGEC ",this.gecFlag);
    
    if(this.gecFlag){
      console.log("inside toggal modal GEC");
      this.gecObject.officialEmail=this.mail
        console.log(" this.gecObject.officialMail ",this.mail);
        console.log("gec object  ",this.gecObject);
        
      
      this.mainService.postToUpdateData(this.gecObject).subscribe(response => {
        console.log(response);
        if(response.statusCode != "[200]") {
          this.loaderService.setNotificationObject('error', response.message);
        } else {
            this.mainService.getDashboardDataWithStatus(this.status).subscribe((obj: any) => {
            this.rowDataArray = obj['data'];
            this.addPreviouslyDoneStatus();
            this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
            console.log('data', this.dataSource);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            const message = "details verified successfully";
            this.loaderService.setNotificationObject('success', message);
          });
        }
      });

    }
    else{

      this.mainService.postToUpdateData(this.updateActionObject).subscribe(response => {
        console.log(response);
        if(response.statusCode != "[200]") {
          this.loaderService.setNotificationObject('error', response.message);
        } else {
            this.updateCounter();
            this.mainService.getDashboardDataWithStatus(this.status).subscribe((obj: any) => {
            this.rowDataArray = obj['data'];
            this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
            console.log('data', this.dataSource);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        }
      });
    }

  

  }

  addForm() {
    this.sharedService.flagUpdate = true;
    this.sharedService.flagButton = true;
    this.router.navigateByUrl('dashboard/create');
  }

  onUpdate(id, ele) {
    this.sharedService.flagUpdate = false;
    this.sharedService.flagButton = false;
    console.log('iddd:::', ele);
    this.router.navigateByUrl('dashboard/create');
    this.sharedService.updateId = id;
    this.sharedService.updateForm.name = ele.candidateDetails.name.fullName;
    this.sharedService.updateForm.dateOfJoining = ele.candidateDetails.doj;

    this.sharedService.updateForm.designation = ele.candidateDetails.designation.name;
    this.sharedService.updateForm.email = ele.candidateDetails.email;
    this.sharedService.updateForm.phoneNumber = ele.candidateDetails.primaryContactNumber;
    this.sharedService.updateForm.profile = ele.candidateDetails.profile;
    this.sharedService.updateForm.profileStakeHolder = ele.candidateDetails.profileStakeholder;
    this.sharedService.updateForm.experienceStatus = ele.candidateDetails.professionalExperience;
    this.sharedService.updateForm.dateOfOffer = ele.candidateDetails.offerDate;
    this.sharedService.updateForm.hrSpoc = ele.hrSpokes;
    this.sharedService.updateForm.id = ele._id;
    //console.log(this.sharedService.updateForm.id);


    console.log('let me check', this.sharedService.updateForm);

  }

  onSortChange() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log('property', property);
      console.log('item', item);

      switch (property) {
        case 'name':
          return item.candidateDetails.name.fullName;
        case 'profile':
          return item.candidateDetails.profile;
        case 'dateOfJoining':
          return item.candidateDetails.doj;
        case 'currentStatus':
          return item.currentStatus.description;
        case 'nextStatus':
          return item.nextAction.description;
        default:
          return item[property];
      }
    };

  }

  addPreviouslyDoneStatus() {
    this.rowDataArray.forEach(data=> {
      data['previouslyDoneStatus'] = [];
      data.status.forEach(status=>{
        if(data['previouslyDoneStatus'].indexOf(status.screenId) == -1) {
          data['previouslyDoneStatus'].push(status.screenId);
        };
      })

      data.nextAction.forEach(action=>{
        if(action.screenId == 'vd') {
          data['previouslyDoneStatus'] = data['previouslyDoneStatus'].filter(e => e !== 'vd');
        }
        if(action.screenId == 'ud') {
          data['previouslyDoneStatus'] = data['previouslyDoneStatus'].filter(e => e !== 'vd');
          data['previouslyDoneStatus'] = data['previouslyDoneStatus'].filter(e => e !== 'ud');
        }
        if(action.screenId == 'anb') {
          data['previouslyDoneStatus'] = data['previouslyDoneStatus'].filter(e => e !== 'abl');
        }
      });
    });
  }

  applyActiveStatus() {
    switch (this.status) {
      case 'pre_a':
        this.preActiveLink= true;
        this.preCompletedLink= false;
        this.onActiveLink = false;
        this.rejectedLink= false;
        break;

      case 'pre_c':
        this.preActiveLink= false;
        this.preCompletedLink= true;
        this.onActiveLink = false;
        this.rejectedLink= false;
        break;
      
      case 'on_c': 
        this.preActiveLink= false;
        this.preCompletedLink= false;
        this.onActiveLink = true;
        this.rejectedLink= false;
        break;

      case 'r':
        this.preActiveLink= false;
        this.preCompletedLink= false;
        this.onActiveLink = false;
        this.rejectedLink= true;
        break;
    }
  }
  updateCounter() {
    this.mainService.getCount().subscribe((obj:any)=>{
      this.preActiveCount = obj.data.PreOnBoarding_Active;
      this.preCompleteCount = obj.data.PreOnBoarding_Completed;
      this.onActiveCount = obj.data.OnBoarding_Active;
      this.rejectedCount = obj.data.Rejected
    });
  }
}

