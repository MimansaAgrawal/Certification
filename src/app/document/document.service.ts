import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentDetail } from '@app/model/DocumentDetail';
import { CustomValidators } from '@app/_utils/customValidators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  personalDetailForm: FormGroup;
  familyDetailForm: FormGroup;
  otherDetailsForm: FormGroup;
  employeeAddressForm: FormGroup;
  educationalQualificationDetailsForm: FormGroup;
  allEmploymentDetailForm: FormGroup;
  referenceForm: FormGroup;
  identityInfoForm: FormGroup;
  uploadedDocuments: DocumentDetail[] = [];
  candidateData: any;
  docObj = {};
  checkUploadedDoc: FormControl;
  isRequiredDocUploaded: boolean;


  constructor(private formBuilder: FormBuilder) {
    this.resetAll();
  }

  resetAll() {
    this.checkUploadedDoc = new FormControl('', Validators.required);
    /* Personal Detail Form*/
    this.personalDetailForm = this.formBuilder.group({
      fName: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      // mName: [''],
      // lName: [''],
      dob: ['', Validators.required],
      Gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      spouseName: [''],
      contact: ['', [Validators.required,
      Validators.pattern(/^\d{10}$/)]],
      eContact: ['', [Validators.required,
      Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)],
      ],
      bloodGroup: ['', Validators.required],
      nationality: ['', Validators.required],
      languageProficiency: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      otherCountry: [''],
      workPermit: ['']
    });
    /* Family Detail Form*/
    this.familyDetailForm = this.formBuilder.group({

      fatherName: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      fatherOccupation: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      fatherAge: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      fatherWorkStatus: ['', [Validators.required]],
      motherName: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      mothersOccupation: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      motherAge: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      motherWorkStatus: ['', [Validators.required]],

      siblings: this.formBuilder.array([]),

    });
    /* Others Detail Form*/
    // a-zA-Z
    this.otherDetailsForm = this.formBuilder.group({

      technicalSkillSets: [[], Validators.required],
      hobbies: [[], [Validators.required,
     ]],
      overallWorkExperienceInYears: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      linkedInUrl: ['', [
        Validators.pattern('(|https?:\\/\\/(www.)?linkedin.com\\/(mwlite\\/|m\\/)?in\\/[a-zA-Z0-9_.-]+\\/?)')]],
      lastCollegeAttended: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      lastOrganisationWorkedAt: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      // photograph: ['', [Validators.required, Validators.pattern(/\.(jpe?g|png|)$/)]],

    });
    /* Employee Address Form*/
    this.employeeAddressForm = this.formBuilder.group({
      //current address
      currAddress1: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      street: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      locality: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      currState: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      currPinCode: ['', [Validators.required,
      Validators.pattern(/^\d{6}$/)]],
      currCity: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
        Validators.pattern(/^[ a-zA-Z]+$/)]],
      //permanent address
      permanentAddress1: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)
      ]],
      permState: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)
      ]],
      permPinCode: ['', [Validators.required,
      Validators.pattern(/^\d{6}$/)]],
      perstreet: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      perlocality: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      permCity: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
        Validators.pattern(/^[ a-zA-Z]+$/)]],
    });
    /* Education Qualification Form*/
    this.educationalQualificationDetailsForm = this.formBuilder.group({
      grade10marks: ['', [Validators.required, Validators.pattern('^(([0-9]|[1-9][0-9]|100)|(([0-9]|[1-9][0-9])\\.\\d{1,2})|100.0|100.00)$')]],
      grade12marks: ['', [Validators.required, Validators.pattern('^(([0-9]|[1-9][0-9]|100)|(([0-9]|[1-9][0-9])\\.\\d{1,2})|100.0|100.00)$')]],
    });
    /* All Employee Details Form*/
    this.allEmploymentDetailForm = this.formBuilder.group({
      experienceType: [''],
      employmentDetail: this.formBuilder.array([])
    });
    /* Reference Form*/
    this.referenceForm = this.formBuilder.group({

      professionalReferences: this.formBuilder.array([]),
      hrReferences: this.formBuilder.array([]),
      collegeReferences: this.formBuilder.array([])
    });
    /* Identity Info Form*/
    this.identityInfoForm = this.formBuilder.group({

      // passport: [''],
      // aadharCard: ['', Validators.required],
      aadharCardNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      // panCard: ['', Validators.required],
      panCardNumber: ['', [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]]

    });
  }
  siblingFormArray(): FormArray {
    return this.familyDetailForm.get('siblings') as FormArray;
  }

  addSiblingEntries(input?) {
    const group = this.addSibling(input);
    this.siblingFormArray().push(group);
  }

  removeSiblingEntries(index: number) {
    this.siblingFormArray().removeAt(index);
  }

  addSiblingFromInput(siblingsArray) {
    siblingsArray.forEach(element => {
      this.addSiblingEntries(element);
    });
  }

  addSibling(input?) {
    return this.formBuilder.group({
      name: [''],
      age: [''],
      educationalStatus: [''],
    });
  }


  hrReferenceFormArray(): FormArray {
    return this.referenceForm.get('hrReferences') as FormArray;
  }

  addHrEntries(input?) {
    const group = this.addHrReference();
    this.hrReferenceFormArray().push(group);
  }

  removeHrEntries(index: number) {
    this.hrReferenceFormArray().removeAt(index);
  }
  addEmployeeReferences() {
    return this.formBuilder.group({
      nameOfCompany: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mostRecentExperience: ['', [Validators.required]],
    })
  }
  addCollegeReference() {
    return this.formBuilder.group({
      name: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      emailId: ['', [Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],

      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      designation: ['', [Validators.required, CustomValidators.noWhitespaceValidator,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]]
    });
  }

  // addHrReference() {
  //   return this.formBuilder.group({
  //     name: ['', []],
  //     emailId: ['', []],
  //     contactNumber: [ '', []],
  //     designation: [ '', []],
  //     department: [ '', []],
  //   });
  // }
  addHrReference() {
    return this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      emailId: ['', [Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      designation: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      department: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
    });
  }
  addClgEntries(input?) {
    const group = this.addCollegeReference();
    this.collegeReferenceFormArray().push(group);
  }
  addEmpEntries() {
    const group = this.addEmployeeReferences();
    this.EmpReferenceFormArray().push(group);
  }
  /**new code changed */
  removeEmpReferenceFormArray() {
    this.allEmploymentDetailForm.removeControl('employmentDetail');
  }
  removeHrPrFReferenceFormArray() {
    this.referenceForm.removeControl('professionalReferences');
    this.referenceForm.removeControl('hrReferences');
  }
  removeCldgReferenceFormArray() {
    this.referenceForm.removeControl('collegeReferences');
  }
  /** up to this */
  EmpReferenceFormArray(): FormArray {
    return this.allEmploymentDetailForm.get('employmentDetail') as FormArray;
  }
  collegeReferenceFormArray(): FormArray {
    return this.referenceForm.get('collegeReferences') as FormArray;
  }

  removeClgEntries(index: number) {
    this.collegeReferenceFormArray().removeAt(index);
  }
  removeEmpEntries(index: number) {
    this.EmpReferenceFormArray().removeAt(index);
  }
  addPfEntries(input?) {
    const group = this.addProfessionalReference(input);
    this.professionalReferenceFormArray().push(group);
  }

  professionalReferenceFormArray(): FormArray {
    return this.referenceForm.get('professionalReferences') as FormArray;
  }

  removePfEntries(index: number) {
    this.professionalReferenceFormArray().removeAt(index);
  }

  // addProfessionalReference(input?) {
  //   return this.formBuilder.group({
  //     name: ['', []],
  //     emailId: ['', []],
  //     contactNumber: [ '', []],
  //     designation: [ '', []],
  //     department: ['', []]
  //   });
  // }
  addProfessionalReference(input?) {
    return this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.pattern(/^[ a-zA-Z]+$/)]],
      emailId: ['', [Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      designation: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      department: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]]
    });
  }
}
