import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  updateForm: any;
  element:any;
  flagEdit:true;//isEdit
  trainingUpload=false
  constructor(private formbuilder: FormBuilder) { }

  createUpdateForm() {
    this.updateForm = this.formbuilder.group({
      id : '',
      name: '',
        purposeSpoc : '',
        perfSpoc0 : '',
        perfSpoc1 : '',
        perfSpoc2 : '',
        perfSpoc3 : '',
        perfSpoc4 : '',
        perfSpoc5 : '',
        perfSpoc6 : '',
        perfSpoc7 : '',
        perfSpoc8 : '',
        perfSpoc9 : '',
        feedback1: '',
        feedback2:'',
        isFullTime:'',
        rating:'',
        finalFeedback:''
    });
  }
  // onFormUpdate(param) {
  //   this.updateForm.patchValue({
  //     name: param.candidateDetails.name.fullName,
  //     purposeSpoc: param.candidateDetails.professionalExperience,
  //     id: param._id,
  //   })
  // }
  // onFormUpdate(param) {
  //   console.log('param:' + param);
  //   this.updateForm.patchValue({
  //     name: param.candidateDetails.name.fullName,
  //     feedback1: param.candidateDetails.feedback1
  //   })
  // }
  get id() {
    return this.updateForm.get('id').value;
  }
  get name() {
    return this.updateForm.get('name').value;
  }
  get purposeSpoc() {
    return this.updateForm.get('purposeSpoc').value;
  }
  get perfSpoc0() {
    return this.updateForm.get('perfSpoc0').value;
  }
  get perfSpoc1() {
    return this.updateForm.get('perfSpoc1').value;
  }
  get perfSpoc2() {
    return this.updateForm.get('perfSpoc2').value;
  }
  get perfSpoc3() {
    return this.updateForm.get('perfSpoc3').value;
  }
  get perfSpoc4() {
    return this.updateForm.get('perfSpoc4').value;
  }
  get perfSpoc5() {
    return this.updateForm.get('perfSpoc5').value;
  }
  get perfSpoc6() {
    return this.updateForm.get('perfSpoc6').value;
  }
  get perfSpoc7() {
    return this.updateForm.get('perfSpoc7').value;
  }
  get perfSpoc8() {
    return this.updateForm.get('perfSpoc8').value;
  }
  get perfSpoc9() {
    return this.updateForm.get('perfSpoc9').value;
  }
  get feedback1() {
    return this.updateForm.get('feedback1').value;
  }
  get feedback2() {
    return this.updateForm.get('feedback2').value;
  }
  get isFullTime() {
    return this.updateForm.get('isFullTime').value;
  }
  get rating() {
    return this.updateForm.get('rating').value;
  }
  get finalFeedback() {
    return this.updateForm.get('finalFeedback').value;
  }
}
