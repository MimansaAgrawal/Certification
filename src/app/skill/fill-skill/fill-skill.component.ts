import { Main } from './../../core/_api/main.service';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/core/services/loader.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-fill-skill',
  templateUrl: './fill-skill.component.html',
  styleUrls: ['./fill-skill.component.css']
})
export class FillSkillComponent implements OnInit {
  message: string;

  constructor(private mainService: Main,
    private loaderService: LoaderService) { }
  selectedEmpToSend: any = {
    "data": []
  };
  //isSubmitEnable = true
  dropdownList: {
    "EmployeeName": string,
    "Email": string
  };
  selectedItems = []
  dropdownSettings = {};
  ngOnInit() {
    this.mainService.getBuddyDetail().subscribe(obj => {
      this.dropdownList = obj.data;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'Email',
        textField: 'EmployeeName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    })
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log("selected", this.selectedItems)
  }
  onItemDeSelect(item: any) {
    console.log("after del", this.selectedItems)
  }
  onSelectAll(items: any) {
    this.selectedItems = items;
    console.log("all", this.selectedItems);
  }
  onDeSelectAll(items: any) {
    this.selectedItems = items;
    console.log("unselectall", this.selectedItems)
  }
  onSubmit() {
    console.log(this.selectedItems.length)

    this.selectedItems.forEach(element => {
      this.selectedEmpToSend["data"].push({
        "Email": element.Email,
        "EmployeeName": element.EmployeeName
      })
    });

    this.mainService.postToSendMail(this.selectedEmpToSend).subscribe((res) => {
      console.log("Mail Sent");
      this.selectedEmpToSend["data"] = this.selectedItems = [];
      if(res && res[0] && res[0].mailsent) {
        this.message = 'E-mail sent successfully';
        this.loaderService.setNotificationObject('success', this.message);
      }
    })

    console.log("submit", this.selectedEmpToSend)
  }
}
