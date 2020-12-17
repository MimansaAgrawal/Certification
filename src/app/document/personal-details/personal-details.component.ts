import { Component, OnInit } from "@angular/core";
import { DocumentService } from "@app/document/document.service";
import * as moment from "moment";

@Component({
  selector: "app-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.css"],
})
export class PersonalDetailsComponent implements OnInit {
  selectedProfileStakeholder = "Select";
  profileNamesArray = [""];
  profileNamesFilterArray = [""];
  maxDate: any;
  bloodGroup=["A+","A-","B+","B-","O+","O-","AB+","AB-"]
  maritalStats=["Married","Unmarried","Widowed","Divorced","Seperated"]

  constructor(public documentService: DocumentService) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
    this.maxDate = moment(this.maxDate).format("yyyy-MM-DD");
    console.log("maxDte------------->", this.maxDate);
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

  changeprofileStakeholder(val, elementName) {
    this.selectedProfileStakeholder = val;
    console.log(elementName);
    this.toggleList(elementName);
    // this.profileStakeholderEmail
    // this.profileStakeholderArray.forEach(x => {
    //   if (x.name == this.selectedProfileStakeholder) {
    //     this.profileStakeholderEmail = x.email
    //     console.log(this.profileStakeholderEmail);

    //   }
    // });
  }
 
  ngOnInit() {}
  dobChange(dob: string) {
    const dobChange = moment(dob).toDate();
    const currentDate = new Date();
    const diff = currentDate.getFullYear() - dobChange.getFullYear();
    console.log("dobChange", dobChange.getFullYear());
    console.log("diff", diff);
  }
}
