import { CERTIFICATION_ROLE } from "./../certification.constants";
import { CertificationService } from "./../certification.service";
import { LoaderService } from "./../../core/services/loader.service";
import { Main } from "@app/core/_api/main.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-certification-reminder",
  templateUrl: "./certification-reminder.component.html",
  styleUrls: ["./certification-reminder.component.css"],
})
export class CertificationReminderComponent implements OnInit {
  message: string;

  constructor(
    private certificationService: CertificationService,
    private mainService: Main,
    private loaderService: LoaderService
  ) {}
  selectedEmpToSend: any = {
    data: [],
  };
  //isSubmitEnable = true
  dropdownList: {};
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.certificationService.getMisDetails().subscribe((obj) => {
      if (this.certificationService.isAdmin()) {
        this.updateEmployeeDropdownData(obj.data, null, true);
      } else {
        this.certificationService
          .getCertificationManagmentDetails()
          .subscribe((data) => {
            this.updateEmployeeDropdownData(obj.data, data.data);
          });
      }
    });
  }

  updateEmployeeDropdownData(misdata, employeedata, forAdmin = false) {
    const finalEmployeeList = [];

    if (forAdmin) {
      Object.keys(misdata).forEach((department) => {
        const teamEmployees = misdata[department];

        Object.keys(teamEmployees).forEach((team) => {
          finalEmployeeList.push(...teamEmployees[team]);
        });
      });
    } else {
      employeedata.departments.forEach((department) => {
        const teamEmployees = misdata[department.name];
        department.teams.forEach((team) => {
          finalEmployeeList.push(...teamEmployees[team.name]);
        });
      });
    }

    finalEmployeeList.sort((emp1, emp2) => emp1.name.localeCompare(emp2.name));

    this.dropdownList = finalEmployeeList;
    this.dropdownSettings = {
      singleSelection: false,
      idField: "email",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    // console.log(item);
    // console.log("selected", this.selectedItems);
  }
  onItemDeSelect(item: any) {
    // console.log("after del", this.selectedItems);
  }
  onSelectAll(items: any) {
    // this.selectedItems = items;
    // console.log("all", this.selectedItems);
  }
  onDeSelectAll(items: any) {
    // this.selectedItems = items;
    // console.log("unselectall", this.selectedItems);
  }
  onSubmit() {
    // console.log(this.selectedItems.length);

    this.selectedItems.forEach((element) => {
      this.selectedEmpToSend["data"].push({
        Email: element.email,
        EmployeeName: element.name,
      });
    });

    this.certificationService
      .sendReminder(this.selectedEmpToSend)
      .subscribe((res: any) => {
        console.log("mail response", res);
        this.selectedEmpToSend["data"] = this.selectedItems = [];
        if (res.statusCode === 200) {
          this.message = "E-mail sent successfully";
          this.loaderService.setNotificationObject("success", this.message);
        }
      });
    // .subscribe((res) => {
    //   console.log("Mail Sent");
    //   this.selectedEmpToSend["data"] = this.selectedItems = [];
    //   if (res && res[0] && res[0].mailsent) {
    //     this.message = "E-mail sent successfully";
    //     this.loaderService.setNotificationObject("success", this.message);
    //   }
    // });

    // console.log("submit", this.selectedEmpToSend);
  }

  filterMisData(data) {
    // CERTIFICATION_ROLE.MANAGER
    //   if (this.certificationService.role === CERTIFICATION_ROLE.ADMIN) {
    //     const details = this.certificationService.getCertificationManagmentDetails();

    //     return data.filter({

    //     })

    //   }

    return data;
  }
}
