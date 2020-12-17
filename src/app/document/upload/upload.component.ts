import { CurrentStatus } from "./../../model/CurrentStatus";
import { AppConstants } from "./../../constants/app.constants";
import { Main } from "./../../core/_api/main.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { BsModalService } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "@app/core/services/loader.service";
import { TrainingService } from "@app/core/services/training.service";

// import {IDropdownSettings} from 'ng-multiselect-dropdown';
import { DocumentService } from "@app/document/document.service";
import { CandidateData } from "@app/model/CandidateData";
import { CandidateDetails } from "@app/model/CandidateDetails";
import { Nationality } from "@app/model/Nationality";
import { FamilyDetails } from "@app/model/FamilyDetails";
import { Address } from "@app/model/Address";
import { Education } from "@app/model/Education";
import { References } from "@app/model/References";
import { AllEmploymentDetails } from "@app/model/AllEmploymentDetails";
import { Name } from "@app/model/Name";
import { MaritalStatus } from "@app/model/MaritalStatus";
import { Designation } from "@app/model/Designation";
import { element } from "protractor";
import { MatSnackBar, MatStepper } from "@angular/material";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  // @ViewChild('stepper',{static:true}) private stepper: MatStepper;
  candidateId: string;
  candidateStatus: string;
  status: any;
  @Input() userId: string;
  @Input() screenId: string;
  isDirectUserFlag = false;

  // searchable multi-select for technical skills
  disabled = false;
  skills: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings = {};
  isLoadingFlag = false;
  candidateData: CandidateData;
  currentCandidateData: any;
  reUpload = false;
  submitBtn = true;
  isRequiredDocUploaded: boolean;
  message: string;
  isExternalUser: boolean;
  isFresher: boolean;
  documentUploaded=false
  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private router: Router,
    private mainService: Main,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    public ds: DocumentService,
    private _snackBar: MatSnackBar,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.ds.resetAll();
    this.isExternalUser = this.route.snapshot.queryParamMap.get("token")
      ? true
      : false;

    // for searchable multi-select

    this.selectedItems = [];

    if (this.userId) {
      this.isDirectUserFlag = true;
    }

    this.candidateId =
      this.userId || this.route.snapshot.queryParamMap.get("id");
    this.screenId =
      this.screenId || this.route.snapshot.queryParamMap.get("screenId");
    console.log("candidate ID:::", this.candidateId);
    console.log("Screen ID on uploadComponent:::", this.screenId);

    this.mainService.getCandidateById(this.candidateId).subscribe(
      (info) => {
        this.currentCandidateData = info.data;
        this.isFresher =
          info.data.candidateDetails.professionalExperience ===
          AppConstants.CANDIDATE.EXPERIENCE.FRESHER;
        if (this.isFresher) {
          this.ds.otherDetailsForm
            .get("overallWorkExperienceInYears")
            .setValue("0");
          this.ds.otherDetailsForm
            .get("lastOrganisationWorkedAt")
            .setValue("NA");
        }
        this.ds.candidateData = this.currentCandidateData;
        console.log(
          "document service data==>",
          this.ds.candidateData.uploadedDocuments
        );
        this.currentCandidateData.status.forEach((el) => {
          if (el.screenId === "ud") {
            this.reUpload = true;
            return;
          }
        });
        this.setPersonalDetails();
        if (this.reUpload) {
          this.setFamilyData();
          this.setEducatioQualif();
          this.setOtherDetails();
          this.setCollegeReference();
          this.setEmployeeRefrences();
          this.sethrReferencep();
          this.setprofessionalReference();
          this.setSiblings();
          this.setEmployAddressData();
          this.setIdentityData();
        }
        this.status = info.statusCode;
        console.log(
          "old data===>",
          this.currentCandidateData.candidateDetails.professionalExperience
        );
        // console.log('data===>', this.currentCandidateData.nextAction[this.index].previousScreenId);
        console.log(
          "designation",
          this.currentCandidateData.candidateDetails.designation.name
        );
        console.log(
          "nationality",
          this.ds.personalDetailForm.get("nationality").value
        );
        // console.log('candidate status------->', info.data.candidateDetails.professionalExperience);
        this.candidateStatus =
          info.data.candidateDetails.professionalExperience;
        if (this.status === "[200]") {
          this.mainService
            .getDocumentsToBeUploadedByStatus(this.candidateStatus)
            .subscribe((obj) => {});
        } else {
          this.router.navigateByUrl("dashboard/grid");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onGrid() {
    // this.router.navigateByUrl("dashboard/grid");

    if (!this.trainingService.trainingUpload) {
      this.router.navigateByUrl("dashboard/grid");
    } else if (this.trainingService.trainingUpload) {
      this.router.navigateByUrl("/training/feedbackgrid");
      this.trainingService.trainingUpload = false;
    }
  }

  next() {
    console.log("personaldetails", this.ds.allEmploymentDetailForm);
  }
  refer() {
    console.log(this.ds.referenceForm);
  }
  otherDetails() {
    console.log(this.ds.otherDetailsForm);
  }
  refer1() {
    console.log("event", this.ds.checkUploadedDoc);
  }
  onSubmit() {
    if (this.checkUploaded(false)) {
      const candidateDetails = {
        candidateDetails: this.mapCandidateDetails(),
        _id: this.candidateId,
      };
      const familyDetails: FamilyDetails = new FamilyDetails(
        this.ds.familyDetailForm.get("fatherName").value,
        this.ds.familyDetailForm.get("fatherOccupation").value,
        this.ds.familyDetailForm.get("fatherAge").value,
        this.ds.familyDetailForm.get("fatherWorkStatus").value,
        this.ds.familyDetailForm.get("motherName").value,
        this.ds.familyDetailForm.get("mothersOccupation").value,
        this.ds.familyDetailForm.get("motherAge").value,
        this.ds.familyDetailForm.get("motherWorkStatus").value,
        this.ds.familyDetailForm.get("siblings").value
      );
      const currentAddress: Address = new Address(
        this.ds.employeeAddressForm.get("currAddress1").value,
        // this.ds.employeeAddressForm.get('currAddress2').value,
        // this.ds.employeeAddressForm.get('currAddress3').value,
        this.ds.employeeAddressForm.get("street").value,
        this.ds.employeeAddressForm.get("locality").value,
        this.ds.employeeAddressForm.get("currCity").value,
        this.ds.employeeAddressForm.get("currState").value,
        this.ds.employeeAddressForm.get("currPinCode").value
      );
      const permanentAddress: Address = new Address(
        this.ds.employeeAddressForm.get("permanentAddress1").value,
        // this.ds.employeeAddressForm.get('permanentAddress2').value,
        // this.ds.employeeAddressForm.get('permanentAddress3').value,
        this.ds.employeeAddressForm.get("perstreet").value,
        this.ds.employeeAddressForm.get("perlocality").value,
        this.ds.employeeAddressForm.get("permCity").value,
        this.ds.employeeAddressForm.get("permState").value,
        this.ds.employeeAddressForm.get("permPinCode").value
      );

      const education1 = new Education(
        "X marks",
        "",
        this.ds.educationalQualificationDetailsForm.get("grade10marks").value,
        "",
        false,
        ""
      );

      const education2 = new Education(
        "XII marks",
        "",
        this.ds.educationalQualificationDetailsForm.get("grade12marks").value,
        "",
        false,
        ""
      );
      const educationalDetails = [education1, education2];
      let references: References;
      if (this.candidateStatus === "f") {
        references = new References(
          [],
          [],
          this.ds.referenceForm.get("collegeReferences").value
        );
      } else {
        references = new References(
          this.ds.referenceForm.get("professionalReferences").value,
          this.ds.referenceForm.get("hrReferences").value,
          []
        );
      }
      // const emp = this.ds.allEmploymentDetailForm.value;
      // delete emp.experienceType;
      console.log("length", this.ds.candidateData.uploadedDocuments.length);
      if (this.ds.candidateData.uploadedDocuments.length === 0) {
        this.ds.candidateData.uploadedDocuments = this.ds.uploadedDocuments;
      }

      const allEmployementDetails = new AllEmploymentDetails(
        this.ds.allEmploymentDetailForm.get("experienceType").value,
        this.ds.allEmploymentDetailForm.get("employmentDetail")
          ? this.ds.allEmploymentDetailForm.get("employmentDetail").value
          : []
      );
      this.candidateData = new CandidateData(
        this.currentCandidateData._id,
        "",
        familyDetails,
        this.ds.otherDetailsForm.value,
        currentAddress,
        permanentAddress,
        references,
        null,
        null,
        "",
        this.screenId,
        this.ds.candidateData.uploadedDocuments,
        educationalDetails,
        allEmployementDetails,
        this.ds.identityInfoForm.value,
        null
      );
      console.log("Candidate data from form ======>", this.candidateData);

      console.log("this.candidateData", this.candidateData);
      console.log("candidateDetails", candidateDetails);

      const saveApiCall = this.mainService.postToSaveData(this.candidateData);
      const updateApiCall = this.mainService.postToUpdateCandidateData(
        candidateDetails
      );

      saveApiCall.subscribe((response) => {
        if (response.statusCode == "[200]") {
          if (this.currentCandidateData.currentStatus.screenId == "tfr" || this.currentCandidateData.currentStatus.screenId == "vtd") {
            if (this.isExternalUser) {
              this.documentUploaded=true
              this.message = "Data saved successfully";
              this.loaderService.setNotificationObject("success", this.message);
            } else {
              if (!this.trainingService.trainingUpload) {
                this.router.navigateByUrl("dashboard/grid");
              } else if (this.trainingService.trainingUpload) {
                // this.documentUploaded=true

                this.router.navigateByUrl("/training/feedbackgrid");
                this.trainingService.trainingUpload = false;
              }
            }
          } else {
            updateApiCall.subscribe((updateResponse) => {
              if (updateResponse.statusCode == "[200]") {
                if (this.isExternalUser) {
                  this.documentUploaded=true

                  this.message = "Data saved successfully";
                  this.loaderService.setNotificationObject(
                    "success",
                    this.message
                  );
                } else {
                  if (!this.trainingService.trainingUpload) {
                    this.router.navigateByUrl("dashboard/grid");
                  } else if (this.trainingService.trainingUpload) {
                    // this.documentUploaded=true
                    this.router.navigateByUrl("/training/feedbackgrid");
                    this.trainingService.trainingUpload = false;
                  }
                }
              } else {
                this.loaderService.setNotificationObject(
                  "error",
                  updateResponse.message
                );
              }
            });
          }
        } else {
          this.loaderService.setNotificationObject("error", response.message);
        }
      });
    }
  }
  documentUploadedModalClosed() {
    this.router.navigateByUrl("training/feedbackgrid");
  }
  setPersonalDetails() {
    this.ds.personalDetailForm
      .get("fName")
      .setValue(this.currentCandidateData.candidateDetails.name.fullName);
    this.ds.personalDetailForm
      .get("contact")
      .setValue(
        this.currentCandidateData.candidateDetails.primaryContactNumber
      );
    this.ds.personalDetailForm
      .get("email")
      .setValue(this.currentCandidateData.candidateDetails.email);
    this.ds.personalDetailForm
      .get("Gender")
      .setValue(this.currentCandidateData.candidateDetails.gender);
    if (this.reUpload) {
      this.ds.personalDetailForm
        .get("otherCountry")
        .setValue(
          this.currentCandidateData.candidateDetails.nationality.otherCountry
        );
      this.ds.personalDetailForm
        .get("workPermit")
        .setValue(
          this.currentCandidateData.candidateDetails.nationality
            .workPermitForIndia
        );

      this.ds.personalDetailForm
        .get("nationality")
        .setValue(
          this.currentCandidateData.candidateDetails.nationality.country
        );
      this.ds.personalDetailForm
        .get("languageProficiency")
        .setValue(
          this.currentCandidateData.candidateDetails.languageProficiency
        );
      this.ds.personalDetailForm
        .get("maritalStatus")
        .setValue(
          this.currentCandidateData.candidateDetails.marital_status.status
        );
      this.ds.personalDetailForm
        .get("eContact")
        .setValue(
          this.currentCandidateData.candidateDetails.emergencyContactNumber
        );
      this.ds.personalDetailForm
        .get("dob")
        .setValue(this.currentCandidateData.candidateDetails.dob);
      this.ds.personalDetailForm
        .get("bloodGroup")
        .setValue(this.currentCandidateData.candidateDetails.bloodGroup);
    }
  }

  setFamilyData() {
    this.ds.familyDetailForm
      .get("fatherAge")
      .setValue(this.currentCandidateData.familyDetails.fathersAge);
    this.ds.familyDetailForm
      .get("fatherName")
      .setValue(this.currentCandidateData.familyDetails.fathersName);
    this.ds.familyDetailForm
      .get("fatherOccupation")
      .setValue(this.currentCandidateData.familyDetails.fathersOccupation);
    this.ds.familyDetailForm
      .get("fatherWorkStatus")
      .setValue(
        this.currentCandidateData.familyDetails.fathersCurrentWorkStatus
      );
    this.ds.familyDetailForm
      .get("motherName")
      .setValue(this.currentCandidateData.familyDetails.mothersName);
    this.ds.familyDetailForm
      .get("mothersOccupation")
      .setValue(this.currentCandidateData.familyDetails.mothersOccupation);
    this.ds.familyDetailForm
      .get("motherAge")
      .setValue(this.currentCandidateData.familyDetails.mothersAge);
    this.ds.familyDetailForm
      .get("motherWorkStatus")
      .setValue(
        this.currentCandidateData.familyDetails.mothersCurrentWorkStatus
      );
    // this.ds.familyDetailForm.get('siblings').setValue(this.currentCandidateData.familyDetails.siblings);
  }

  setOtherDetails() {
    this.ds.otherDetailsForm
      .get("technicalSkillSets")
      .setValue(this.currentCandidateData.others.technicalSkillSets);
    this.ds.otherDetailsForm
      .get("hobbies")
      .setValue(this.currentCandidateData.others.hobbies.split(","));
    this.ds.otherDetailsForm
      .get("lastCollegeAttended")
      .setValue(this.currentCandidateData.others.lastCollegeAttended);
    this.ds.otherDetailsForm
      .get("linkedInUrl")
      .setValue(this.currentCandidateData.others.linkedInUrl);
    this.ds.otherDetailsForm
      .get("overallWorkExperienceInYears")
      .setValue(this.currentCandidateData.others.overallWorkExperienceInYears);
    this.ds.otherDetailsForm
      .get("lastOrganisationWorkedAt")
      .setValue(this.currentCandidateData.others.lastOrganisationWorkedAt);
  }

  setEducatioQualif() {
    this.ds.educationalQualificationDetailsForm
      .get("grade10marks")
      .setValue(this.currentCandidateData.education[0].marks);
    this.ds.educationalQualificationDetailsForm
      .get("grade12marks")
      .setValue(this.currentCandidateData.education[1].marks);
  }

  setCollegeReference() {
    this.currentCandidateData.references.collegeReference.forEach((element) => {
      const refrence = this.ds.addCollegeReference();
      refrence.get("name").setValue(element.name);
      refrence.get("emailId").setValue(element.emailId);
      refrence.get("contactNumber").setValue(element.contactNumber);
      refrence.get("designation").setValue(element.designation);

      this.ds.collegeReferenceFormArray().push(refrence);
    });
  }
  setEmployeeRefrences() {
    this.currentCandidateData.allEmploymentDetails.employmentDetail.forEach(
      (element) => {
        const emprefrence = this.ds.addEmployeeReferences();
        emprefrence.get("nameOfCompany").setValue(element.nameOfCompany);
        emprefrence.get("duration").setValue(element.duration);
        emprefrence.get("designation").setValue(element.designation);
        emprefrence
          .get("mostRecentExperience")
          .setValue(element.mostRecentExperience);
        this.ds.EmpReferenceFormArray().push(emprefrence);
      }
    );
    this.ds.allEmploymentDetailForm.patchValue({
      experienceType: this.currentCandidateData.allEmploymentDetails
        .experienceType,
    });
  }
  sethrReferencep() {
    this.currentCandidateData.references.hrReference.forEach((element) => {
      const refrence = this.ds.addHrReference();
      refrence.get("name").setValue(element.name);
      refrence.get("emailId").setValue(element.emailId);
      refrence.get("contactNumber").setValue(element.contactNumber);
      refrence.get("designation").setValue(element.designation);
      refrence.get("department").setValue(element.department);

      this.ds.hrReferenceFormArray().push(refrence);
    });
  }

  setprofessionalReference() {
    this.currentCandidateData.references.professionalReference.forEach(
      (element) => {
        const refrence = this.ds.addProfessionalReference();
        refrence.get("name").setValue(element.name);
        refrence.get("emailId").setValue(element.emailId);
        refrence.get("contactNumber").setValue(element.contactNumber);
        refrence.get("designation").setValue(element.designation);
        refrence.get("department").setValue(element.department);

        this.ds.professionalReferenceFormArray().push(refrence);
      }
    );
  }

  setSiblings() {
    this.currentCandidateData.familyDetails.siblings.forEach((element) => {
      const refrence = this.ds.addSibling();
      console.log("refrence", element);
      refrence.get("name").setValue(element.name);
      refrence.get("age").setValue(element.age);
      refrence.get("educationalStatus").setValue(element.educationalStatus);
      this.ds.siblingFormArray().push(refrence);
    });
  }

  setEmployAddressData() {
    this.ds.employeeAddressForm
      .get("currAddress1")
      .setValue(this.currentCandidateData.currentAddressDetails.address1);
    // this.ds.employeeAddressForm.get('currAddress2').setValue(this.currentCandidateData.currentAddressDetails.address2);
    // this.ds.employeeAddressForm.get('currAddress3').setValue(this.currentCandidateData.currentAddressDetails.address3);
    this.ds.employeeAddressForm
      .get("street")
      .setValue(this.currentCandidateData.currentAddressDetails.street);
    this.ds.employeeAddressForm
      .get("locality")
      .setValue(this.currentCandidateData.currentAddressDetails.locality);
    this.ds.employeeAddressForm
      .get("currCity")
      .setValue(this.currentCandidateData.currentAddressDetails.city);
    this.ds.employeeAddressForm
      .get("currState")
      .setValue(this.currentCandidateData.currentAddressDetails.state);
    this.ds.employeeAddressForm
      .get("currPinCode")
      .setValue(this.currentCandidateData.currentAddressDetails.pinCode);
    this.ds.employeeAddressForm
      .get("permanentAddress1")
      .setValue(this.currentCandidateData.permanentAddressDetails.address1);
    // this.ds.employeeAddressForm.get('permanentAddress2').setValue(this.currentCandidateData.permanentAddressDetails.address2);
    // this.ds.employeeAddressForm.get('permanentAddress3').setValue(this.currentCandidateData.permanentAddressDetails.address3);
    this.ds.employeeAddressForm
      .get("perstreet")
      .setValue(this.currentCandidateData.permanentAddressDetails.street);
    this.ds.employeeAddressForm
      .get("perlocality")
      .setValue(this.currentCandidateData.permanentAddressDetails.locality);
    this.ds.employeeAddressForm
      .get("permCity")
      .setValue(this.currentCandidateData.permanentAddressDetails.city);
    this.ds.employeeAddressForm
      .get("permState")
      .setValue(this.currentCandidateData.permanentAddressDetails.state);
    this.ds.employeeAddressForm
      .get("permPinCode")
      .setValue(this.currentCandidateData.permanentAddressDetails.pinCode);
  }

  setIdentityData() {
    this.ds.identityInfoForm
      .get("aadharCardNumber")
      .setValue(this.currentCandidateData.identityInformation.aadharCardNumber);
    this.ds.identityInfoForm
      .get("panCardNumber")
      .setValue(this.currentCandidateData.identityInformation.panCardNumber);
  }

  mapCandidateDetails(): CandidateDetails {
    const name: Name = new Name(this.ds.personalDetailForm.get("fName").value);
    const nationality: Nationality = new Nationality(
      // this.ds.personalDetailForm.get('nationality').value === 'indian' ? 'indian' :
      //   this.ds.personalDetailForm.get('otherCountry').value,
      // this.ds.personalDetailForm.get('nationality').value === 'indian' ? true :
      //   this.ds.personalDetailForm.get('workPermit').value === 'Yes');

      this.ds.personalDetailForm.get("nationality").value === "indian"
        ? "indian"
        : this.ds.personalDetailForm.get("otherCountry").value,
      this.ds.personalDetailForm.get("nationality").value !== "indian"
        ? this.ds.personalDetailForm.get("workPermit").value
        : true
    );

    const marital_status: MaritalStatus = new MaritalStatus(
      this.ds.personalDetailForm.get("maritalStatus").value,
      this.ds.personalDetailForm.get("spouseName").value
    );
    const designation: Designation = new Designation(
      this.currentCandidateData.candidateDetails.designation.name
    );
    return new CandidateDetails(
      name,
      marital_status,
      this.ds.personalDetailForm.get("dob").value,
      this.ds.personalDetailForm.get("Gender").value,
      this.ds.personalDetailForm.get("contact").value,
      this.ds.personalDetailForm.get("eContact").value,
      this.ds.personalDetailForm.get("email").value,
      this.ds.personalDetailForm.get("bloodGroup").value,
      nationality,
      this.ds.personalDetailForm.get("languageProficiency").value,
      this.currentCandidateData.candidateDetails.profile,
      this.currentCandidateData.candidateDetails.profileStakeholder,
      this.currentCandidateData.candidateDetails.offerDate,
      this.currentCandidateData.candidateDetails.doj,
      "",
      this.currentCandidateData.candidateDetails.professionalExperience,
      this.currentCandidateData.candidateDetails.resume,
      this.currentCandidateData.candidateDetails.hiringLocation,
      this.currentCandidateData.candidateDetails.candidateLocation,
      this.currentCandidateData.createdAt,
      this.currentCandidateData.candidateDetails.ctc,
      designation
    );
  }
  checkEvent(isChecked: boolean) {
    console.log("afaza", isChecked);
    if (isChecked === true) {
      this.submitBtn = false;
    } else {
      this.submitBtn = true;
    }
  }

  checkUploaded(flag: boolean, stepper?: MatStepper) {
    this.isRequiredDocUploaded = this.ds.isRequiredDocUploaded;
    console.log("D", this.ds.docObj);
    console.log("isRequired", this.ds.checkUploadedDoc);

    for (const i in this.ds.docObj) {
      if (this.ds.docObj[i] === true) {
        this._snackBar.open("Please Upload All Mandatory Documents", "", {
          duration: 2000,
          verticalPosition: "top",
        });
        return false;
        // this.ds.checkUploadedDoc = true;
      }
    }
    if (this.isRequiredDocUploaded) {
      this.ds.checkUploadedDoc.setValue("uploaded");
      console.log("event", this.ds.checkUploadedDoc);
      if (flag) {
        stepper.next();
      }
      return true;
    } else {
      this._snackBar.open("Please Tick the Checkbox", "", {
        duration: 2000,
        verticalPosition: "top",
      });

      return false;
    }
    // return false;
  }
  eventAddress() {
    console.log("employeeAdressForm", this.ds.employeeAddressForm);
  }
  valueStore() {
    console.log("Value store", this.ds.allEmploymentDetailForm);
    // console.log('Value store',this.ds.EmpReferenceFormArray);
  }
}
