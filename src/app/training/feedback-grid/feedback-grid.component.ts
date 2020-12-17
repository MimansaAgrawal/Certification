import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormBuilder, FormControl } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatTableDataSource } from "@angular/material/table";
import "bootstrap/dist/css/bootstrap.min.css";
import * as moment from "moment";
import { Main } from "@app/core/_api/main.service";
import { Router } from "@angular/router";
import { LoaderService } from "@app/core/services/loader.service";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { ActivatedRoute } from "@angular/router";
import { TrainingService } from "@app/core/services/training.service";
import { ExcelService } from "@app/core/services/excel.service";
import { FeedBackDetails } from "@app/shared/api-schema.model";
import { JsonPipe } from "@angular/common";
import { SharedService } from "@app/core/services/shared.service";

@Component({
  selector: "app-feedback-grid",
  templateUrl: "./feedback-grid.component.html",
  styleUrls: ["./feedback-grid.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class FeedbackGridComponent implements OnInit {
  message: string;
  filterDataArray: any;
  rowDataArray: any;
  // excelData: any[];
  excelDataFresher: any[];
  excelDataLateral: any[];
  professionalExp = "l";

  toggleModal = false;
  toggleModalFeedback = false;
  toggleModalExtension = false;
  toggleModalWarning = false;

  feedbackData: any[];
  temp: any[];
  check_exclude_click = false;
  dataSource: MatTableDataSource<any>;
  profileStakeholderArray: any;
  flag = 0;
  modalRef: BsModalRef;
  //today = new Date().toISOString().split('T')[0];
  today = new Date();
  userId: any;
  currentScreenId: any;
  status: string;
  statusNew: string;
  modalTitleText: string;
  modalBodyText: string;
  rejectedReason = "";
  columnsToDisplay = [
    "name",
    "empCode",
    "rmName",
    "completionType",
    "completionDate",
    "currentStatus",
    "remarks",
    "options",
  ];
  expandedElement: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('warningTemplate', { static: true }) messageModal: TemplateRef<any>;
  constructor(
    private http: HttpClient,
    private mainService: Main,
    private router: Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,

    private modalService: BsModalService,
    private loaderService: LoaderService,
    private trainingService: TrainingService,
    private excelService: ExcelService
  ) {
    this.trainingService.updateForm = this.formbuilder.group({
      address: "",
      dateOfJoining: "",
      designation: "",
      email: "",
      experienceStatus: "",
      hrSpoc: "",
      name: "",
      phoneNumber: "",
      profile: "",
      profileStakeHolderValue: "",
      profileStakeHolderArr: "",
      resume: "",
      id: "",
      dateOfOffer: "",
    });
  }
  ngOnInit() {
    // this.mainService.getCandidateById(this.userId).subscribe(res => {
    //   this.professionalExp = res.candidateDetails.professionalExperience
    // })
    // this.fetchDetail();
    // this.status = this.sharedService.currStatus ? this.sharedService.currStatus : 'post_p';
    // this.applyActiveStatus()

    this.status = this.sharedService.currStatus
      ? this.sharedService.currStatus
      : "post_p";
    // this.applyActiveStatus()
    this.getCandidateData(this.status);
    console.log("inside on init");
  }
  preActiveLink: boolean = true;
  preCompletedLink: boolean = false;
  onActiveLink = false;
  rejectedLink: boolean = false;
  extendedDuration = "";
  startDate = "";
  fetchDetail() {
    this.status = "post_p";
    this.preActiveLink = true;
    this.preCompletedLink = false;
    this.onActiveLink = false;
    this.rejectedLink = false;
    this.mainService.getAllFeedbackData(this.status).subscribe((obj: any) => {
      this.rowDataArray = obj["data"];
      this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      console.log("data", this.dataSource);
      // this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getCandidateData(currStatus: string) {
    this.paginator.firstPage();

    this.status = currStatus;
    this.sharedService.currStatus = currStatus;

    this.mainService.getAllFeedbackData(this.status).subscribe((obj: any) => {
      this.rowDataArray = obj["data"];
      this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      console.log("data", this.dataSource);
      // this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyActiveStatus();
    });
  }
  applyActiveStatus() {
    switch (this.status) {
      case "post_p":
        this.preActiveLink = true;
        this.preCompletedLink = false;
        this.onActiveLink = false;
        this.rejectedLink = false;
        break;

      case "post_t":
        this.preActiveLink = false;
        this.preCompletedLink = true;
        this.onActiveLink = false;
        this.rejectedLink = false;
        break;

      case "post_conv":
        this.preActiveLink = false;
        this.preCompletedLink = false;
        this.onActiveLink = true;
        this.rejectedLink = false;
        break;

      case "post_ext":
        this.preActiveLink = false;
        this.preCompletedLink = false;
        this.onActiveLink = false;
        this.rejectedLink = true;
        break;
    }
  }
  getDate(input: any): any {
    return moment(input).format("L");
  }

  applyFilter(filterValue: string) {
    if (filterValue.trim().length > 0) {
      this.filterDataArray = this.rowDataArray.filter(
        (
          data // console.log('data', data);
        ) =>
          data.candidateDetails.name.fullName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          data.candidateDetails.designation.name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    } else {
      this.filterDataArray = this.rowDataArray;
    }
    this.dataSource = new MatTableDataSource<any>(this.filterDataArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openModal(template: TemplateRef<any>, row: any) {
    console.log(row);
    this.modalRef = this.modalService.show(template);
    // this.modalRef.setClass('modal-dialog-centered');

    this.userId = row;
  }
  openNewModal(template, row: any) {
    console.log(row);
    // this.modalRef = this.modalService.show(template);
    // this.modalRef.setClass('modal-dialog-centered');
    switch (template) {
      case "template1":
        this.modalTitleText = "Send Letters";
        this.modalBodyText = "Are you sure, you want to send letter?";
        this.toggleModal = true;
        console.log("toggleModal", this.toggleModal);
        break;
      case "template":
        this.modalTitleText = "Send Feedback Reminder Mail";
        this.modalBodyText = "Are you sure, you want to send reminder Mail?";
        this.toggleModalFeedback = true;
        console.log("toggleModal", this.toggleModalFeedback);
        break;

      case "extensionTemplate":
        this.modalTitleText = "Extension";
        this.modalBodyText = "Enter the extension period for candidate?";
        this.toggleModalExtension = true;
        console.log(
          "Inside extention modal toggleModalExtention",
          this.toggleModalExtension
        );
        break;
    }
    console.log(template);
    console.log(typeof template);

    this.userId = row._id;
    this.currentScreenId = row.nextAction[row.nextAction.length - 1].screenId;
  }
  extend(): void {
    var obj = {
      _id: this.userId,
      currentScreenId: this.currentScreenId,
      extensionStartDate: this.startDate,
    };
    console.log(obj);
    this.mainService.saveFeedbackData(obj).subscribe((response) => {
      console.log(response);
      if (response.statusCode != "[200]") {
        // this.modalRef = this.modalService.show(this.messageModal);
        this.message = response.message;
        this.toggleModalWarning = true;
      } else if (response.statusCode == "[200]") {
        // this.modalRef = this.modalService.show(this.messageModal);
        // this.message = response.message;
        // this.fetchDetail();
        this.status = this.sharedService.currStatus
          ? this.sharedService.currStatus
          : "post_p";
        // this.applyActiveStatus()
        this.getCandidateData(this.status);
      }
      // window.location.reload();
      // this.status = this.sharedService.currStatus ? this.sharedService.currStatus : 'post_p';
      // this.applyActiveStatus()
      // this.getCandidateData(this.status)
    });

    // this.modalRef.hide();
  }

  sendLetters(): void {
    //Call update api
    var obj = {
      _id: this.userId,
      currentScreenId: this.currentScreenId,
    };
    console.log(obj);
    this.mainService.saveFeedbackData(obj).subscribe((response) => {
      console.log(response);
      if (response.statusCode != "[200]") {
        // this.modalRef = this.modalService.show(this.messageModal);
        this.message = response.message;
        this.toggleModalWarning = true;
      } else if (response.statusCode == "[200]") {
        // this.modalRef = this.modalService.show(this.messageModal);
        // this.message = response.message;
        // this.fetchDetail();
        this.status = this.sharedService.currStatus
          ? this.sharedService.currStatus
          : "post_p";
        // this.applyActiveStatus()
        this.getCandidateData(this.status);
      }
    });
  }

  confirm(): void {
    //Call update api
    var obj = {
      _id: this.userId,
      screenId: this.currentScreenId,
    };
    console.log(obj);
    this.mainService.postToTriggerMailManually(obj).subscribe((response) => {
      console.log(response);
      if (response.statusCode != "[200]") {
        // this.modalRef = this.modalService.show(this.messageModal);
        this.message = response.message;
        this.toggleModalWarning = true;
      } else if (response.statusCode == "[200]") {
        // this.modalRef = this.modalService.show(this.messageModal);
        // this.message = response.message;
        // this.fetchDetail();
        this.status = this.sharedService.currStatus
          ? this.sharedService.currStatus
          : "post_p";
        // this.applyActiveStatus()
        this.getCandidateData(this.status);
      }
      // window.location.reload();
    });

    // this.modalRef.hide();
  }

  uploadDocument(ele) {
    this.trainingService.trainingUpload = true;
    this.router.navigate(["/document/upload"], {
      queryParams: { id: ele._id, screenId: "utd" },
    });
  }

  verifyDocument(ele) {
    this.trainingService.trainingUpload = true;

    this.router.navigate(["document/verify"], {
      queryParams: { id: ele._id, screenId: "vtd" },
    });
  }

  addFeedback() {
    this.router.navigateByUrl("training/feedback");
  }
  onUpdate(id, ele, isEdit) {
    // console.log('Feedback:::', ele.trainingFeedbackDetails[0].feedback);
    // console.log('Rating params :::', ele.trainingFeedbackDetails[0].ratingParameters);
    this.trainingService.flagEdit = isEdit;
    //this.isEditButton = isEdit
    this.trainingService.element = ele;
    console.log(ele.candidateDetails.professionalExperience);
    this.router.navigateByUrl("training/feedback");
    this.trainingService.updateForm.name = ele.candidateDetails.name.fullName;
    this.trainingService.updateForm.id = ele._id;
    this.trainingService.updateForm.purposeSpoc =
      ele.candidateDetails.professionalExperience == "l"
        ? "Probation"
        : "Training";
    console.log(this.trainingService.updateForm.purposeSpoc);
  }
  onSortChange() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log("property", property);
      console.log("item", item);

      switch (property) {
        case "name":
          return item.candidateDetails.name.fullName;
        case "profile":
          return item.candidateDetails.profile;
        case "dateOfJoining":
          return item.candidateDetails.doj;
        case "currentStatus":
          return item.currentStatus.description;
        default:
          return item[property];
      }
    };
  }

  exportAsXLSX(): void {
    this.excelDataFresher = [];
    this.excelDataLateral = [];
    console.log("export started");
    this.mainService.getFeedbackData().subscribe((obj: any) => {
      var feedbackList = obj["data"];
      var tempTrainingList = feedbackList.filter((object) => {
        return object["trainingFeedbackDetails"].length > 0;
      });
      var tempProbationList = feedbackList.filter((object) => {
        return object["probationFeedbackDetails"].length > 0;
      });
      console.log(tempTrainingList);
      console.log(tempProbationList);
      for (var key in tempTrainingList) {
        var probCount =
          tempTrainingList[key]["probationFeedbackDetails"].length;
        if (probCount == 0) {
          var count = tempTrainingList[key]["trainingFeedbackDetails"].length;
          console.log(count);
          var test =
            tempTrainingList[key]["trainingFeedbackDetails"][count - 1];
          var final = {};
          final = {
            Name: test["candidateName"],
            Purpose: test["feedbackPurpose"],
            IsFullTime: test["feedback"]["isFullTime"] == "n" ? "No" : "Yes",
            Rating: test["feedback"]["rating"],
            "Fresher Rating": test["feedback"]["ratingFresher"],
            Remarks: test["feedback"]["remark"],
            "Good in": test["feedback"]["goodIn"],
            "Area Of Improvement": test["feedback"]["areaOfImprovement"],
            Adaptability: test["ratingParameters"]["adaptability"],
            Dependability: test["ratingParameters"]["dependability"],
            Initiative: test["ratingParameters"]["Initiative"],
            Learnability: test["ratingParameters"]["learnability"],
            "Managerial Proficiency":
              test["ratingParameters"]["managerialProficiency"],
            "Problem Solving": test["ratingParameters"]["problemSolving"],
            Productivity: test["ratingParameters"]["productivity"],
            "Team Work": test["ratingParameters"]["teamWork"],
            "Technical Skills": test["ratingParameters"]["technicalSkills"],
            "Work Planing Execution":
              test["ratingParameters"]["workPlaningExecution"],
          };
          console.log(final);
          this.excelDataFresher.push(final);
        }
      }
      for (var key in tempProbationList) {
        var count = tempProbationList[key]["probationFeedbackDetails"].length;
        var test =
          tempProbationList[key]["probationFeedbackDetails"][count - 1];
        var final = {};
        final = {
          Name: test["candidateName"],
          Purpose: test["feedbackPurpose"],
          IsFullTime: test["feedback"]["isFullTime"] == "n" ? "No" : "Yes",
          Rating: test["feedback"]["rating"],
          Remarks: test["feedback"]["remark"],
          "Good in": test["feedback"]["goodIn"],
          "Area Of Improvement": test["feedback"]["areaOfImprovement"],
          Adaptability: test["ratingParameters"]["adaptability"],
          Dependability: test["ratingParameters"]["dependability"],
          Initiative: test["ratingParameters"]["Initiative"],
          Learnability: test["ratingParameters"]["learnability"],
          "Managerial Proficiency":
            test["ratingParameters"]["managerialProficiency"],
          "Problem Solving": test["ratingParameters"]["problemSolving"],
          Productivity: test["ratingParameters"]["productivity"],
          "Team Work": test["ratingParameters"]["teamWork"],
          "Technical Skills": test["ratingParameters"]["technicalSkills"],
          "Work Planing Execution":
            test["ratingParameters"]["workPlaningExecution"],
        };
        console.log(final);
        this.excelDataLateral.push(final);
      }
      this.excelService.exportAsExcelFile(this.excelDataFresher, "Fresher");
      this.excelService.exportAsExcelFile(this.excelDataLateral, "Lateral");
    });
  }

  verifyNextAction(element, nextAction: string): boolean {
    return (
      element.nextAction &&
      element.nextAction[element.nextAction.length - 1] &&
      element.nextAction[element.nextAction.length - 1].screenId == nextAction
    );
  }
}
