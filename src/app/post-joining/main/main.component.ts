import { ResponseConversionService } from './../../core/services/response-conversion.service';
import { Component, OnInit, ViewChild, TemplateRef, Output, Input } from '@angular/core';
import { EmpDetailsComponent } from '@app/shared/emp-details/emp-details.component';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { InsuranceDetailsComponent } from '../insurance-details/insurance-details.component';
import { VisaDetailsComponent } from '../visa-details/visa-details.component';

import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CredentialsService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/core/services/shared.service';
import { Main } from '@app/core/_api/main.service';
import { LoaderService } from '@app/core/services/loader.service';
import * as moment from 'moment';
import { ApiSchema } from '@app/shared/api-schema.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(EmpDetailsComponent, { static: false })
  empDetailsComponent: EmpDetailsComponent;
  bankDetailsForm: FormGroup;
  modalRef: BsModalRef
  candidateId: string
  candidateUid: string
  name: string
  date: string
  data: object = {};
  fullData: object = {};
  nameValidators = [
    Validators.pattern('^[a-zA-Z ]+')
  ];
  totalSteps = 4;
  currentStep = 1;
  initialStep = 1;
  finalStep = this.totalSteps;
  @Input() userId: string;
  @Input() screenId: string;
  isDirectUserFlag = false;

  constructor(
    private credentialService: CredentialsService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private mainService: Main,
    private router: Router,
    private loaderService: LoaderService,
    private formbuilder: FormBuilder,
    private modalService: BsModalService,
    public rcs: ResponseConversionService
  ) { }

  get f() {
    return this.bankDetailsForm.controls;
  }

  ngOnInit() {
    this.bankDetailsForm = this.formbuilder.group({
      beneficiaryName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
      bName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
      ifscCode: ["", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')])],
      accNo: ["", Validators.compose([Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.minLength(9),Validators.maxLength(18)])],
      aadharNo: ["", Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
      panNo: ["", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]$')])],
      name: "",
      gender: "",
      dateOfJoining: "",
      desig: "",
      phone: "",
      dob: "",
      mStatus: ["", Validators.compose([Validators.required])],
      sName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
      sGender: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
      sdob: ["", Validators.compose([Validators.required])],
      children: this.formbuilder.array([]),
      addParents: ["false", Validators.compose([Validators.required])],
      fName: "",
      fdob: ["", Validators.compose([Validators.required])],
      mName: "",
      mdob: ["", Validators.compose([Validators.required])],
      visaStatus: ["Invalid", Validators.compose([Validators.required])],
      visaType: ""
    });

    if (this.userId) {
      this.isDirectUserFlag = true;
    }
    this.candidateId = this.userId || this.route.snapshot.queryParamMap.get('id');
    this.screenId = this.screenId || this.route.snapshot.queryParamMap.get('screenId');

    this.mainService.getCandidateById(this.candidateId).subscribe(info => {
      this.fullData = info["data"];
      // this.empDetailsComponent.fullData = this.fullData;
      console.log("inside main comp:::",this.fullData);
      console.log("marital status::",this.fullData["candidateDetails"].marital_status.status);
      console.log("sname::",this.fullData["candidateDetails"].marital_status.spouseName)

      
      

      this.bankDetailsForm.patchValue({
        name: this.fullData["candidateDetails"].name.fullName,
        gender: this.fullData["candidateDetails"].gender,
        dateOfJoining: moment(this.fullData["candidateDetails"].doj, 'YYYY-MM-DD').toDate().toISOString().split('T')[0],
        desig: this.fullData["candidateDetails"].designation["name"],
        phone: this.fullData["candidateDetails"].primaryContactNumber,
        dob: moment(this.fullData["candidateDetails"].dob, 'YYYY-MM-DD').toDate().toISOString().split('T')[0],
        aadharNo: this.fullData["identityInformation"].aadharCardNumber,
        panNo: this.fullData["identityInformation"].panCardNumber,
        fName: this.fullData["familyDetails"].fathersName,
        mName: this.fullData["familyDetails"].mothersName,
        mStatus:this.fullData["candidateDetails"].marital_status.status,
       

        sName:this.fullData["candidateDetails"].marital_status.spouseName,
      });
    })
  }

    submit() {
      this.data = {
        _id: this.fullData["_id"],
        bankDetails: {
          bankName: this.bankDetailsForm.value.bName,
          ifscCode: this.bankDetailsForm.value.ifscCode,
          accountNo: this.bankDetailsForm.value.accNo,
          aadharNo: this.bankDetailsForm.value.aadharNo,
          panNo: this.bankDetailsForm.value.panNo,
          beneficiaryName: this.bankDetailsForm.value.beneficiaryName,  
        },
        insuranceDetails: {
          name: this.bankDetailsForm.value.name,
          gender: this.bankDetailsForm.value.gender,
          doj: this.fullData["candidateDetails"].doj,
          designation: this.bankDetailsForm.value.desig,
          contact: this.bankDetailsForm.value.phone,
          dob: this.fullData["candidateDetails"].dob,
          maritalStatus: this.bankDetailsForm.value.mStatus,
          spouse: {
            name: this.bankDetailsForm.value.sName,
            gender: this.bankDetailsForm.value.sGender,
            dob: this.bankDetailsForm.value.sdob,
          },
          children: this.bankDetailsForm.value.children,
          addParents: this.bankDetailsForm.value.addParents.toString(), 
          father: {
            name: this.bankDetailsForm.value.fName,
            dob: this.bankDetailsForm.value.fdob,
          },
          mother: {
            name: this.bankDetailsForm.value.mName,
            dob: this.bankDetailsForm.value.mdob
          },
        },
        visa: {
          visaStatus: this.bankDetailsForm.value.visaStatus,
          visaType: this.bankDetailsForm.value.visaType,
        },
      currentScreenId: this.screenId
      };
      
      console.log("data", this.data);
      this.mainService.saveBankDetails(this.data);
    }

  onGrid() {
    this.router.navigateByUrl('dashboard/grid')
  }

  next(bool) {
    console.log("next", this.currentStep);
    if (bool) {
      this.currentStep = this.currentStep + 1;
    }
  }
  prev(bool) {
    console.log("prev", this.currentStep);
    if (bool) {
      this.currentStep = this.currentStep - 1;
    }
  }

  bankDetailsValidation() {
    return !(this.f.beneficiaryName.invalid || this.f.bName.invalid 
      || this.f.ifscCode.invalid || this.f.accNo.invalid);
  }

  insuranceDetailsValidation() {
    let mChildren =true
    const mStatusValid = this.f.mStatus.value == 'M' ? !(this.f.sName.invalid || this.f.sGender.invalid || this.f.sdob.invalid) : true;
    // console.log("f.sname.invalid", this.f.sName.invalid);
    // console.log("sdob ",this.f.sdob);
     if(mStatusValid){
       console.log("children array value",this.f.children.value);
       console.log("children array",this.f.children.invalid);
        mChildren=!this.f.children.invalid

 
       
     }
    
    // console.log("bankDetailsForm.value.addParents ",typeof this.f.addParents.value);
    // console.log("bankDetailsForm.value.addParents ",this.f.addParents.value);

  
    // console.log("fdob  ",this.f.fdob);
  
    
    const pStatusValid = this.f.addParents.value=='true' ? !(this.f.fdob.invalid || this.f.mdob.invalid):true
    // console.log("pstatus ",pStatusValid);
    
    if(mStatusValid && pStatusValid && mChildren)
    return true
    else
    return false


  }

  touchAllBankDetails() {
    this.f.beneficiaryName.markAsTouched();
    this.f.bName.markAsTouched();
    this.f.ifscCode.markAsTouched();
    this.f.accNo.markAsTouched();
  }
  
}