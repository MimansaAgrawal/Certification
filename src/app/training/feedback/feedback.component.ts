import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Main } from "@app/core/_api/main.service";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@app/core/services/loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TrainingService } from "@app/core/services/training.service";
import { AuthCheck } from "@app/external/external.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { dropdownConfig } from "../../constants/dropdown.config";
import { AuthenticationService } from "@app/core";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  @Input()
  external = false;

  @Input()
  externalUserId: string = "";

  @Input()
  externalPurpose: string = "";

  config = dropdownConfig;
  submittedByUser: string;
  message: string;
  modalRef: BsModalRef;
  falseClicked: boolean;
  isAuthorized = false;
  feedbackForm: FormGroup;
  IsFullTime: string;
  rating: string;
  ratingFresher: string;
  purposeObj: any;
  perfObj: any;
  data: any;
  ratingValue: any;
  feedbackValue: any;
  professionalExp = "";
  showLoader = false;
  Purpose: any = ["Training", "Probation"];
  purposeFilter = [];
  selectedPurpose = "Select";
  FullTime: any = ["Yes", "No"];
  fullTimeFilter = [];
  selectedFullTime = "Select";
  toggleModalWarning = false;
  Rating: any = ["1", "2", "3", "4", "5"];
  ratingFilter = [];
  selectedRating = "3"; //set as default
  feedbackSubmitted = false;

  RatingFresher: any = [
    " Rising Star",
    "Average",
    "Dicey",
    "Above Average",
    "Below Average",
  ];
  ratingFresherFilter = [];
  selectedFresherRating = "Select";
  isEditable = true;

  Perf: any = [
    "Unsatisfactory Performance",
    "Below Expectation",
    "Meets Expectation",
    "Above Expectations",
    "Outstanding Performance",
  ];

  perfFilter = [];
  selectedPerf0 = "Select";
  selectedPerf1 = "Select";
  selectedPerf2 = "Select";
  selectedPerf3 = "Select";
  selectedPerf4 = "Select";
  selectedPerf5 = "Select";
  selectedPerf6 = "Select";
  selectedPerf7 = "Select";
  selectedPerf8 = "Select";
  selectedPerf9 = "Select";

  token: string;
  userid: string;
  authObj: AuthCheck;
  // @ViewChild('template',{ static: true }) messageModal : TemplateRef<any>;
  constructor(
    private formbuilder: FormBuilder,
    private mainService: Main,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private trainingService: TrainingService,
    private modalService: BsModalService,
    private authenticationService: AuthenticationService
  ) {
    this.feedbackForm = this.formbuilder.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z ]+"),
        ]),
      ],
      purposeSpoc: "",
      perfSpoc0: "",
      perfSpoc1: "",
      perfSpoc2: "",
      perfSpoc3: "",
      perfSpoc4: "",
      perfSpoc5: "",
      perfSpoc6: "",
      perfSpoc7: "",
      perfSpoc8: "",
      perfSpoc9: "",
      feedback1: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z ]+"),
        ]),
      ],
      feedback2: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z ]+"),
        ]),
      ],
      isFullTime: "",
      rating: "3",
      ratingFresher: "",
      finalFeedback: [
        "",
        Validators.compose([Validators.required, Validators.minLength(100)]),
      ],
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  ngOnInit(): void {
    this.purposeFilter = this.Purpose;
    this.perfFilter = this.Perf;
    this.fullTimeFilter = this.FullTime;
    this.ratingFilter = this.Rating;
    this.ratingFresherFilter = this.RatingFresher;

    if (this.external) {
      // console.log(`external purpose ${this.externalPurpose}`)
      // console.log(`external user ${this.externalUserId}`)
      this.mainService
        .getCandidateById(this.externalUserId)
        .subscribe((res) => {
          if (res.statusCode == "[200]") {
            console.log("result::", res);
            this.professionalExp =
              res.data.candidateDetails.professionalExperience;
            console.log(
              "fresher or lateral ::",
              res.data.candidateDetails.professionalExperience
            );
            this.submittedByUser = res.data.reportingManager.email;
            this.isAuthorized = true;
            this.feedbackForm.controls["name"].setValue(
              res.data.candidateDetails.name.fullName
            );
            //this.trainingService.updateForm.name = res.data.candidateDetails.name.fullName;
            this.selectedPurpose =
              res.data.candidateDetails.professionalExperience == "l"
                ? "Probation"
                : "Training";
          }
        });
        this.trainingService.flagEdit = true;
    } else {
      this.submittedByUser = JSON.parse(
        sessionStorage.getItem("credentials")
      ).username;
      this.selectedPurpose = this.trainingService.updateForm.purposeSpoc;
    }

    if (!this.trainingService.flagEdit) {
      this.isEditable = false;
      this.ratingValue = this.trainingService.element.trainingFeedbackDetails[
        this.trainingService.element.trainingFeedbackDetails.length - 1
      ].ratingParameters;
      this.feedbackValue = this.trainingService.element.trainingFeedbackDetails[
        this.trainingService.element.trainingFeedbackDetails.length - 1
      ].feedback;
      console.log("training service value1 ", this.ratingValue);
      console.log("training service value2 ", this.feedbackValue);

      //condition for prefil value will be applied here
      this.feedbackForm.patchValue({
        name: this.trainingService.updateForm.name,
        purposeSpoc: this.feedbackForm.value.purposeSpoc,
        perfSpoc0: this.ratingValue.workPlaningExecution,
        perfSpoc1: this.ratingValue.managerialProficiency,
        perfSpoc2: this.ratingValue.technicalSkills,
        perfSpoc3: this.ratingValue.dependability,
        perfSpoc4: this.ratingValue.productivity,
        perfSpoc5: this.ratingValue.problemSolving,
        perfSpoc6: this.ratingValue.initiative,
        perfSpoc7: this.ratingValue.learnability,
        perfSpoc8: this.ratingValue.adapabiltiy,
        perfSpoc9: this.ratingValue.teamWork,
        feedback1: this.feedbackValue.goodIn,
        feedback2: this.feedbackValue.areaofImprovement,
        isFullTime: this.feedbackValue.isFullTime,
        ratingFresher: this.feedbackValue.ratingFresher,
        finalFeedback: this.feedbackValue.remark,
      });
      this.selectedRating = this.feedbackValue.rating;
    } else {
      // this.token = this.route.snapshot.queryParamMap.get("token");
      // console.log("token:" + this.route.snapshot.queryParamMap.get("token"));
      // this.purposeFilter = this.Purpose;
      // this.perfFilter = this.Perf;
      // this.fullTimeFilter = this.FullTime;
      // this.ratingFilter = this.Rating;
      // this.ratingFresherFilter = this.RatingFresher;
      // if (this.token != null) {


      //   this.mainService.externalTokenVerify(this.token).subscribe((res) => {
      //     if (res.statusCode !== "[200]") {
      //       // this.modalRef = this.modalService.show(this.messageModal);
      //       this.message = res.message;
      //       this.toggleModalWarning = true;
      //     }
      //     if (res.statusCode == "[200]") {
      //       this.authObj = new AuthCheck(res.data);
      //       this.userid = this.authObj.userId;
      //       sessionStorage.setItem("sessionToken", this.authObj.sessionToken);
      //       this.mainService
      //         .getCandidateById(this.authObj.userId)
      //         .subscribe((res) => {
      //           if (res.statusCode == "[200]") {
      //             console.log("result::", res);

      //             this.professionalExp =
      //               res.candidateDetails.professionalExperience;
      //             console.log(
      //               "fresher or lateral ::",
      //               res.candidateDetails.professionalExperience
      //             );

      //             this.submittedByUser = res.data.reportingManager.email;
      //             this.isAuthorized = true;
      //             this.feedbackForm.controls["name"].setValue(
      //               res.data.candidateDetails.name.fullName
      //             );
      //             //this.trainingService.updateForm.name = res.data.candidateDetails.name.fullName;
      //             this.selectedPurpose =
      //               res.data.candidateDetails.professionalExperience == "l"
      //                 ? "Probation"
      //                 : "Training";
      //           }
      //         });
      //     }
      //   });
      // }

      //console.log(this.trainingService.updateForm.name);
      this.feedbackForm = this.formbuilder.group({
        name: [
          this.trainingService.updateForm.name,
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z ]+"),
          ]),
        ],
        isFullTime: [
          this.feedbackForm.value.isFullTime,
          Validators.compose([Validators.required]),
        ],
        purposeSpoc: [this.feedbackForm.value.purposeSpoc],
        perfSpoc0: [this.feedbackForm.value.perfSpoc0],
        perfSpoc1: [this.feedbackForm.value.perfSpoc1],
        perfSpoc2: [this.feedbackForm.value.perfSpoc2],
        perfSpoc3: [this.feedbackForm.value.perfSpoc3],
        perfSpoc4: [this.feedbackForm.value.perfSpoc4],
        perfSpoc5: [this.feedbackForm.value.perfSpoc5],
        perfSpoc6: [this.feedbackForm.value.perfSpoc6],
        perfSpoc7: [this.feedbackForm.value.perfSpoc7],
        perfSpoc8: [this.feedbackForm.value.perfSpoc8],
        perfSpoc9: [this.feedbackForm.value.perfSpoc9],
        feedback1: [
          this.feedbackForm.value.feedback1,
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z ]+"),
          ]),
        ],
        feedback2: [
          this.feedbackForm.value.feedback2,
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z ]+"),
          ]),
        ],
        rating: [this.feedbackForm.value.rating],
        ratingFresher: [this.feedbackForm.value.ratingFresher],
        finalFeedback: [
          this.feedbackForm.value.finalFeedback,
          Validators.compose([Validators.required, Validators.minLength(100)]),
        ],
      });
    }
  }
  onSubmissionGrid() {
    if (this.external) {
      this.feedbackSubmitted = true;
    } else {
      this.router.navigateByUrl("training/feedbackgrid");
    }
  }

  onGrid() {
    this.router.navigateByUrl("training/feedbackgrid");
  }

  feedbackSubmittedModalClosed() {
    this.router.navigateByUrl("training/feedbackgrid");
  }

  submit() {
    this.feedbackForm.markAllAsTouched();

    console.log("submit started");
    console.log(this.feedbackForm);
    if (this.external || this.trainingService.updateForm.id !== "") {
      const newObj = {
        _id: this.external
          ? this.externalUserId
          : this.trainingService.updateForm.id,
        currentScreenId: this.selectedPurpose == "Probation" ? "pef" : "tef",
        feedbackDetails: {
          candidateName: this.feedbackForm.value.name,
          feedbackPurpose: this.selectedPurpose,
          submittedBy: this.submittedByUser,
          ratingParameters: {
            workPlaningExecution: this.feedbackForm.value.perfSpoc0,
            managerialProficiency: this.feedbackForm.value.perfSpoc1,
            technicalSkills: this.feedbackForm.value.perfSpoc2,
            dependability: this.feedbackForm.value.perfSpoc3,
            productivity: this.feedbackForm.value.perfSpoc4,
            problemSolving: this.feedbackForm.value.perfSpoc5,
            initiative: this.feedbackForm.value.perfSpoc6,
            learnability: this.feedbackForm.value.perfSpoc7,
            adapabiltiy: this.feedbackForm.value.perfSpoc8,
            teamWork: this.feedbackForm.value.perfSpoc9,
          },

          feedback: {
            goodIn: this.feedbackForm.value.feedback1,
            areaofImprovement: this.feedbackForm.value.feedback2,
            rating: this.selectedRating,
            ratingFresher:
              this.feedbackForm.value.ratingFresher == "Select"
                ? "N.A"
                : this.feedbackForm.value.ratingFresher,
            isFullTime:
              this.feedbackForm.value.isFullTime == "Yes" ? true : false,
            remark: this.feedbackForm.value.finalFeedback,
          },
        },
      };
      console.log("createeeeeeee", newObj);
      console.log(newObj.feedbackDetails.candidateName);
      this.data = newObj;
      console.log(this.data);
      var errorCount = 0;
      var errorCount1 = 0;
      var errorCount2 = 0;
      for (var field in this.data.feedbackDetails.ratingParameters) {
        console.log(this.data.feedbackDetails.ratingParameters[field]);
        if (
          this.data.feedbackDetails.ratingParameters[field] == "" ||
          this.data.feedbackDetails.ratingParameters[field] == "Select"
        )
          errorCount = errorCount + 1;
      }
      for (var field in this.data.feedbackDetails.feedback) {
        console.log(this.data.feedbackDetails.feedback[field]);
        if (
          this.data.feedbackDetails.feedback[field] == "" ||
          this.data.feedbackDetails.feedback[field] == "Select"
        )
          errorCount1 = errorCount1 + 1;
      }
      if (
        this.data.feedbackDetails.name == "" ||
        this.data.feedbackDetails.feedbackPurpose == "" ||
        this.data.feedbackDetails.feedbackPurpose == "Select"
      )
        errorCount2 = errorCount2 + 1;
      if (errorCount > 0 || errorCount > 0 || errorCount2 > 0) {
        // this.modalRef = this.modalService.show(this.messageModal);
        this.message = "Please fill all the details.";
        this.toggleModalWarning = true;
      }
      // if (false){
      //   // this.modalRef = this.modalService.show(this.messageModal);
      //         this.message= "Please fill all the details.";
      //         this.toggleModalWarning=true

      // }
      else {
        setTimeout(() => {
          console.log("inside loader", this.showLoader);
          this.loaderService.setLoader(true);
        });
        this.mainService.saveFeedbackData(this.data).subscribe((info) => {
          console.log(info);
          setTimeout(() => {
            this.loaderService.setLoader(false);
          });
          if (info["statusCode"] == "[200]") {
            this.message = info["message"];
            console.log("message shown", this.message);

            // this.modalRef = this.modalService.show(this.messageModal);
            this.loaderService.setNotificationObject("success", this.message);
            this.onSubmissionGrid();
            // this.toggleModalWarning=true
          } else {
            // this.modalRef = this.modalService.show(this.messageModal);
            this.message = info["message"];
            // this.toggleModalWarning=true
            console.log("message shown", this.message);

            this.loaderService.setNotificationObject("error", this.message);
            this.onSubmissionGrid();
          }
        });
      }
    } else {
      // this.modalRef = this.modalService.show(this.messageModal);
      this.message = "You are not authorized.";
      this.toggleModalWarning = true;
    }
  }

  viewAndApprove(): void {
    var screenId = this.trainingService.element.nextAction[
      this.trainingService.element.nextAction.length - 1
    ].screenId;
    var obj = {
      _id: this.trainingService.updateForm.id,
      currentScreenId: screenId,
    };
    console.log(obj);
    this.mainService.saveFeedbackData(obj).subscribe((response) => {
      console.log(response);
      if (response.statusCode != "[200]") {
        this.message = response.message;
        this.toggleModalWarning = true;
      } else if (response.statusCode == "[200]") {
        this.onGrid();
      }
    });
  }

  changePurpose(val, elementName) {
    this.toggleList(elementName);
    this.selectedPurpose = val;
    if (this.selectedPurpose == "Probation") {
      this.professionalExp = "l";
    } else {
      this.professionalExp = "f";
    }
  }

  changePerf(val, elementName) {
    console.log("val ", val);
    console.log("element ", elementName);

    // this.toggleList(elementName);
    if (elementName == "perf0Dropdown") this.selectedPerf0 = val.value;
    console.log("perf0", this.selectedPerf0);

    if (elementName == "perf1Dropdown") this.selectedPerf1 = val;
    if (elementName == "perf2Dropdown") this.selectedPerf2 = val;
    if (elementName == "perf3Dropdown") this.selectedPerf3 = val;
    if (elementName == "perf4Dropdown") this.selectedPerf4 = val;
    if (elementName == "perf5Dropdown") this.selectedPerf5 = val;
    if (elementName == "perf6Dropdown") this.selectedPerf6 = val;
    if (elementName == "perf7Dropdown") this.selectedPerf7 = val;
    if (elementName == "perf8Dropdown") this.selectedPerf8 = val;
    if (elementName == "perf9Dropdown") this.selectedPerf9 = val;
  }

  changeIsFullTime(val) {
    // this.toggleList(elementName);
    this.selectedFullTime = val.value;
  }

  changeRating(val, elementName) {
    // this.toggleList(elementName);
    this.selectedRating = val;
  }
  changeFresherRating(val) {
    // this.toggleList(elementName);
    this.selectedFresherRating = val;
  }
  onRate(e) {
    console.log("no. of rating ", e.newValue);
    this.selectedRating = e.newValue;

    this.feedbackForm.controls.rating.setValue(this.selectedRating);
  }
  public toggleList(elementName) {
    document.getElementById(elementName).classList.toggle("show");
  }

  public filterFunction(filterOptions, fullOptions, searchElementName) {
    filterOptions = [];
    var filter = document
      .getElementById(searchElementName)
      ["value"].toUpperCase();
    for (let i = 0; i < fullOptions.length; i++) {
      if (fullOptions[i].toUpperCase().indexOf(filter) > -1) {
        filterOptions.push(fullOptions[i]);
      }
    }
    return filterOptions;
  }
}
