import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Main } from '@app/core/_api/main.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '@app/core/services/loader.service';
import { Router } from '@angular/router';
import { SharedService } from '@app/core/services/shared.service'
import { type } from 'os';
import { ApiSchema } from '@app/shared/api-schema.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { dropdownConfig } from '../../constants/dropdown.config'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  add = true;
  config = dropdownConfig;
  signupForm: FormGroup;
  today = new Date().toISOString().split('T')[0];
  firstDay = '2012-06-01';
  fillDate: string;
  fillOfferDate: string
  data: any;
  Designation: any = [''];
  allHr = [];
  profileStakeholderArray: any;

  constructor(private formbuilder: FormBuilder,
    private mainService: Main,
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private sharedService: SharedService,

  ) {
    if (this.sharedService.flagUpdate) {
      this.sharedService.updateForm = this.formbuilder.group({
        dateOfJoining: '',
        dateOfOffer: '',
        designation: '',
        email: '',
        experienceStatus: '',
        hrSpoc: '',
        name: '',
        phoneNumber: '',
        profile: '',
        profileStakeHolder: '',
        id: ''
      });
      this.sharedService.flagUpdate = true;
    }
  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.add = this.sharedService.flagButton;
    this.config.displayKey = "name";
    this.signupForm = this.formbuilder.group({
      name: [this.sharedService.updateForm.name, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
      dateOfJoining: [this.sharedService.updateForm.dateOfJoining, Validators.compose([Validators.required])],
      dateOfOffer: [this.sharedService.updateForm.dateOfOffer, Validators.compose([Validators.required])],
      profileStakeHolder: [this.sharedService.updateForm.profileStakeHolder],
      profile: [this.sharedService.updateForm.profile, Validators.compose([Validators.required, Validators.pattern('^[0-9a-zA-Z ]+')])],

      experienceStatus: [this.sharedService.updateForm.experienceStatus, Validators.compose([Validators.required])],
      email: [this.sharedService.updateForm.email, Validators.compose([Validators.required, Validators.email])],
      designation: [this.sharedService.updateForm.designation,Validators.required],
      hrSpoc: [this.sharedService.updateForm.hrSpoc,Validators.required],
      phoneNumber: [this.sharedService.updateForm.phoneNumber, Validators.compose([Validators.required, Validators.pattern('^[6-9]\\d{9}$')])],

    });

    if(!this.add) {
      this.fillDate = new Date(this.sharedService.updateForm.dateOfJoining).toISOString().split('T')[0];
      this.fillOfferDate = new Date(this.sharedService.updateForm.dateOfOffer).toISOString().split('T')[0];
      this.changeRadio(this.sharedService.updateForm.experienceStatus);
    }
    this.mainService.addNewUser().subscribe(obj => {
      obj.data.Hr.forEach(element => {
        this.allHr.push({
          name: element.EmployeeName,
          email: element.Email
        })
      });
      this.allHr = this.allHr.slice();
      this.profileStakeholderArray = obj['data']['profileStakeholder'];
    });

  }

  onGrid() {
    this.router.navigateByUrl('dashboard/grid')
  }

  submit() {
    setTimeout(() => {
      this.loaderService.setLoader(true);
    });
    const newObj = {
      //_id: this.sharedService.updateForm.id,
      candidateDetails: {
        designation: {
          designationName: this.signupForm.value.designation
        },
        doj: this.signupForm.value.dateOfJoining,
        email: this.signupForm.value.email,
        name: {
          fullName: this.signupForm.value.name,
        },
        offerDate: this.signupForm.value.dateOfOffer,
        primaryContactNumber: this.signupForm.value.phoneNumber,
        professionalExperience: this.signupForm.value.experienceStatus,
        profile: this.signupForm.value.profile,
        profileStakeholder: this.signupForm.value.profileStakeHolder
      },
      hrSpokes: this.signupForm.value.hrSpoc,
      currentScreenId: 'sol'
    }
    console.log("createeeeeeee", newObj);

    this.data = newObj;
    //console.log('submit', this.data);
    if(this.add) {
      this.mainService.save(this.data);
    }
    else {
      this.data["_id"] = this.sharedService.updateForm.id;
      delete this.data["currentStatus"]
      delete this.data["currentScreenId"]
      this.mainService.update(this.data);
    }
  }

  changeRadio(e) {
    this.Designation = [];
    this.mainService.getDesignation(e).subscribe(obj => {
      const DesignationArray = obj["data"]
      DesignationArray.forEach(element => {
        this.Designation.push(element.designationName)
      });
      this.Designation = this.Designation.slice();
    });
  }

  resetDesignation() {
    this.f.designation.setValue('');
  }
}