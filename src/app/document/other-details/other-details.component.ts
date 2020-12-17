import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { Main } from '@app/core/_api/main.service';
// import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {DocumentService} from '@app/document/document.service';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css']
})
export class OtherDetailsComponent implements OnInit {
  disabled = false;
  skills: Array<any> = [];
  dropdownSettings = {};
  ShowFilter = false;
  limitSelection = false;
  selectedItems: Array<any> = [];
  items=['Pizza','Afaza'];
  selectOptions: any;
  selectedOptions: any;
  skillsResponse:any

  @Input() isFresher: boolean;
  constructor(public documentService: DocumentService,
    private mainService:Main,
    ) {
  }

  ngOnInit(){

    console.log(this.isFresher);
    //setting the skills array from api
    this.mainService.getAllSkills().subscribe(res=>{
      this.skillsResponse = res["data"];

      this.skills = this.skillsResponse.map(a=>a.name);
      console.log('skills array Inside getallSkills', this.skills);
    })


   this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      limitSelection: 5
    };
  }

  //code in mainservice.ts (To fetch skills data from api)
//  getAllSkills(){
//     const apiRequest = this.http.get('https://fuqv9yb882.execute-api.ap-south-1.amazonaws.com/dev/users/getskills');
//     return this.map.mapAndCatch(apiRequest);
//   }
}
