import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  flagUpdate = true;
  flagButton = true;
  currStatus;
  flagBuddy=false;
  updateForm: any;
  updateId: any;
  updateFormNew: any;
  defaultHr = 'Ashna Khurana';

  constructor(private formbuilder: FormBuilder) { }

  createUpdateForm() {
    this.updateForm = this.formbuilder.group({
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
      dateOfOffer:'',
      profileStakeHolder: '',
    });
  }

  onFormUpdate(param) {
    this.updateForm.patchValue({
      name: param.candidateDetails.name.fullName,
      dateOfJoining: param.candidateDetails.doj,
      designation: param.candidateDetails.designation.name,
      email: param.candidateDetails.email,
      phoneNumber: param.candidateDetails.primaryContactNumber,
      profile: param.candidateDetails.profile,
      profileStakeHolder: param.candidateDetails.profileStakeholder.name,
      experienceStatus: param.candidateDetails.professionalExperience,
      dateOfOffer: param.candidateDetails.offerDate,
      hrSpoc: this.defaultHr,
      id: param._id,
    })
  }

  get name() {
    return this.updateForm.get('name').value;
  }

  get dateOfJoining() {
    return this.updateForm.get('dateOfJoining').value;
  }

  get designation() {
    return this.updateForm.get('designation').value;
  }

  get email() {
    return this.updateForm.get('email').value;
  }

  get phoneNumber() {
    return this.updateForm.get('phoneNumber').value;
  }

  get profile() {
    return this.updateForm.get('profile').value;
  }

  get profileStakeHolder() {
    return this.updateForm.get('profileStakeHolder').value;
  }

  get dateOfOffer() {
    return this.updateForm.get('dateOfOffer').value;
  }

  get hrSpoc() {
    return this.updateForm.get('hrSpoc').value;
  }

  get id() {
    return this.updateForm.get('id').value;
  }

  get experienceStatus() {
    return this.updateForm.get('experienceStatus').value;
  }

  get proifileStakeHolder() {
    return this.updateForm.get('proifileStakeHolder').value;
  }
}
