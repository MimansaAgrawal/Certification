import { CERTIFICATION_ROLE } from "./../certification.constants";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Main } from "@app/core/_api/main.service";
import * as moment from "moment";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@app/core/services/loader.service";
import { Router } from "@angular/router";
import { SharedService } from "@app/core/services/shared.service";
import { type } from "os";
import { ApiSchema } from "@app/shared/api-schema.model";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { dropdownConfig } from "../../constants/dropdown.config";
import { CertificationService } from "../certification.service";

@Component({
  selector: "app-certification-form",
  templateUrl: "./certification-form.component.html",
  styleUrls: ["./certification-form.component.css"],
})
export class CertificationFormComponent implements OnInit {
  add = true;
  config = dropdownConfig;
  signupForm: FormGroup;
  today = new Date().toISOString().split("T")[0];
  firstDay = "2012-06-01";
  fillDate: string;
  fillOfferDate: string;
  data: any;
  Designation: any = [""];
  Department: string[] = [];
  Team: string[] = [];
  allHr = [];
  employeeDetails: any[];
  misMap = {};
  departments = [];
  teams = [];
  employees = [];

  //disabling flags
  employeeDropdownDisabled = true;
  teamDropdownDisabled = true;
  private teamDetails;

  constructor(
    private formbuilder: FormBuilder,
    private mainService: Main,
    private certificationService: CertificationService,
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private sharedService: SharedService
  ) {}

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    console.log("inside onInint");

    this.add = this.sharedService.flagButton;
    this.config.displayKey = "name";
    // this.signupForm = this.formbuilder.group({
    //   name: [this.sharedService.updateForm.name, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
    //   dateOfJoining: [this.sharedService.updateForm.dateOfJoining, Validators.compose([Validators.required])],
    //   dateOfOffer: [this.sharedService.updateForm.dateOfOffer, Validators.compose([Validators.required])],
    //   profileStakeHolder: [this.sharedService.updateForm.profileStakeHolder],
    //   profile: [this.sharedService.updateForm.profile, Validators.compose([Validators.required, Validators.pattern('^[0-9a-zA-Z ]+')])],

    //   experienceStatus: [this.sharedService.updateForm.experienceStatus, Validators.compose([Validators.required])],
    //   email: [this.sharedService.updateForm.email, Validators.compose([Validators.required, Validators.email])],
    //   designation: [this.sharedService.updateForm.designation,Validators.required],
    //   hrSpoc: [this.sharedService.updateForm.hrSpoc,Validators.required],
    //   phoneNumber: [this.sharedService.updateForm.phoneNumber, Validators.compose([Validators.required, Validators.pattern('^[6-9]\\d{9}$')])],

    // });
    this.signupForm = this.formbuilder.group({
      empName: [""],
      empEmail: [""],
      deptName: [""],
      team: [""],
      classification: [""],
      technology: [""],
      certName: [""],
      certProv: [""],
      compDate: [""],
      validDate: [""],
    });
    if (this.certificationService.updateFlag) {
      this.add = false;
      this.signupForm.patchValue({
        empName: {
          name: this.certificationService.updatedValue.resource.name,
          email: this.certificationService.updatedValue.resource.email,
        },
        // empEmail:
        deptName: this.certificationService.updatedValue.department.name,
        team: this.certificationService.updatedValue.team.name,
        classification: this.certificationService.updatedValue.certification
          .classification,
        technology: this.certificationService.updatedValue.certification
          .technology,
        certName: this.certificationService.updatedValue.certification.name,
        certProv: this.certificationService.updatedValue.certification.provider,
        compDate: moment(
          this.certificationService.updatedValue.certification.completionDate
        ).format("YYYY-MM-DD"),
        validDate: moment(
          this.certificationService.updatedValue.certification.validthrough
        ).format("YYYY-MM-DD"),
      });
      console.log("-----", this.signupForm.value);

      // this.certificationService.updateFlag=false
    }

    this.setupFormValues();
  }

  setupFormValues() {
    switch (this.role) {
      case CERTIFICATION_ROLE.USER:
        this.teamDetails = this.certificationService.teamDetails;
        this.signupForm.controls.empName.setValue(this.teamDetails.name);
        this.signupForm.controls.empEmail.setValue(this.teamDetails.email);
        this.signupForm.controls.team.setValue(this.teamDetails.team);
        this.signupForm.controls.deptName.setValue(this.teamDetails.department);

        break;

      case CERTIFICATION_ROLE.ADMIN:
      case CERTIFICATION_ROLE.MANAGER:
        this.certificationService.getMisDetails().subscribe((obj) => {
          this.misMap = obj.data;
          console.log(this.misMap);
          this.departments = Object.keys(this.misMap);
        });
        break;
    }
  }

  onDepartmentSelected(departmentName: string) {
    this.teams = Object.keys(this.misMap[departmentName]);

    this.signupForm.controls.team.reset();
    this.signupForm.controls.team.markAsUntouched();
    this.signupForm.controls.empName.reset();
    this.signupForm.controls.empName.markAsUntouched();

    this.teamDropdownDisabled = false;
    this.employeeDropdownDisabled = true;
  }

  onTeamSelected(departmentName: string, teamName: string) {
    this.employees = this.misMap[departmentName][teamName];

    this.signupForm.controls.empName.reset();
    this.signupForm.controls.empName.markAsUntouched();

    this.employeeDropdownDisabled = false;
  }
  dateValue() {
    console.log(
      "date string ",
      moment(this.signupForm.value.compDate).format("YYYYMMDD")
    );
  }

  onGrid() {
    this.router.navigateByUrl('certification/grid');

    this.signupForm.reset();

    this.certificationService.updateFlag = false;
  }

  submit() {
    // setTimeout(() => {
    //   this.loaderService.setLoader(true);
    // });

    this.signupForm.markAllAsTouched();
    console.log(this.signupForm.value);
    console.log(this.signupForm.value.empName.name);
    const newObj = {
      resource: {
        name:
          this.role == CERTIFICATION_ROLE.USER
            ? this.signupForm.value.empName
            : this.signupForm.value.empName.name,
        email:
          this.role == CERTIFICATION_ROLE.USER
            ? this.signupForm.value.empEmail
            : this.signupForm.value.empName.email,
      },
      department: { name: this.signupForm.value.deptName },
      team: { name: this.signupForm.value.team },
      certification: {
        name: this.signupForm.value.certName,
        classification: this.signupForm.value.classification,
        technology: this.signupForm.value.technology,
        provider: this.signupForm.value.certProv,
        completionDate: moment(this.signupForm.value.compDate).format(
          "YYYYMMDD"
        ),
        validthrough: moment(this.signupForm.value.validDate).format(
          "YYYYMMDD"
        ),
      },
    };
    console.log("createeeeeeee", newObj);

    this.data = newObj;
    var errorCount = 0;
    var errorCount1 = 0;
    for (var field in this.data.certification) {
      if (this.data.certification[field] == "") errorCount = errorCount + 1;
    }
    if (
      this.data.resource.name == "" ||
      this.data.team.name == "" ||
      this.data.department.name == ""
    )
      errorCount1 = errorCount1 + 1;
    if (errorCount > 0 || errorCount1 > 0) {
      // this.modalRef = this.modalService.show(this.messageModal);
      // this.message= "Please fill all the details.";
      // this.toggleModalWarning=true
    } else if (!this.certificationService.updateFlag) {
      this.certificationService
        .setCertificationData(this.data)
        .subscribe((info) => {
          console.log(info);
          console.log("status code ", info["statusCode"]);

          setTimeout(() => {
            this.loaderService.setLoader(false);
          });
          if (info["statusCode"] == 200) {
            console.log("message shown success", info["message"]);

            this.loaderService.setNotificationObject(
              "success",
              info["message"]
            );
            this.router.navigateByUrl('certification/grid');
          } else {
            console.log("message shown error", info["message"]);

            this.loaderService.setNotificationObject("error", info["message"]);
          }
        });
    } else if (this.certificationService.updateFlag) {
      this.data["_id"] = this.certificationService.idToUpdate;
      this.certificationService
        .updateCertificationData(this.data)
        .subscribe((info) => {
          console.log(info);
          console.log("status code ", info["statusCode"]);

          setTimeout(() => {
            this.loaderService.setLoader(false);
          });
          if (info["statusCode"] == 200) {
            console.log("message shown success", info["message"]);

            this.loaderService.setNotificationObject(
              "success",
              info["message"]
            );
            this.router.navigateByUrl('certification/grid');
          } else {
            console.log("message shown error", info["message"]);

            this.loaderService.setNotificationObject("error", info["message"]);
          }
          this.certificationService.updateFlag = false;
        });
    }
    // //console.log('submit', this.data);
    // if(this.add) {
    //   this.mainService.save(this.data);
    // }
    // else {
    //   this.data["_id"] = this.sharedService.updateForm.id;
    //   delete this.data["currentStatus"]
    //   delete this.data["currentScreenId"]
    //   this.mainService.update(this.data);
    // }
  }
  onEmployeeNameSelected(value) {
    console.log(value);
  }

  get role() {
    return this.certificationService.role;
  }

  isUser() {
    return this.role === CERTIFICATION_ROLE.USER;
  }
}
