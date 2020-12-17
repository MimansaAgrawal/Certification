import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Main } from '@app/core/_api/main.service';
import { dropdownConfig } from '../../constants/dropdown.config'

@Component({
  selector: 'app-asset-information',
  templateUrl: './asset-information.component.html',
  styleUrls: ['./asset-information.component.css']
})
export class AssetInformationComponent implements OnInit {
  config = dropdownConfig
  myObj = {};
  admins: any[];
  fullData: any;
  candidateId: string;
  inputfilename: string;
  inputDoc: string;
  softwareInstalled: string;
  systemType: string;
  assetInfoForm: FormGroup;
  assetList = ['Laptop', 'Phone', 'Laptop Bag', 'Laptop Charger', 'SIM Card'];
  isExternalUser: boolean;
  @Input() userId: string;
  @Input() screenId: string;
  message: string;

  constructor(private route: ActivatedRoute,
    private mainService: Main,
    private fb: FormBuilder,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.isExternalUser = this.route.snapshot.queryParamMap.get('token') ? true : false;
    this.config.displayKey = "name";
    this.myObj['Uid'] = this.candidateId = this.userId || this.route.snapshot.queryParamMap.get('id');
    this.screenId = this.screenId || this.route.snapshot.queryParamMap.get('screenId');

    this.mainService.getCandidateById(this.candidateId).subscribe(info => {
      this.fullData = info["data"]
      this.softwareInstalled = this.fullData['laptopDetails'].softwareInstalled
      if (this.fullData['laptopDetails'].systemType) {
        this.systemType = this.fullData['laptopDetails'].systemType;
      }
      const arr = this.fullData["uploadedDocuments"]
      for (let i in arr) {
        if (arr[i].value == "Resume") {
          this.inputfilename = arr[i].filename
          this.inputDoc = arr[i].docId
        }
      }
    });

    this.mainService.getAdminDetail().subscribe(info => {
      this.admins = [];
      info["data"].forEach(obj => {
        this.admins.push({
          name: obj.EmployeeName,
          email: obj.Email
        });
      });
    })

    this.assetInfoForm = this.fb.group({
      assetInfo: this.fb.array([this.createAsset()]),
      seatNo: ['', Validators.required],
      tShirtSize: ['', Validators.required],
    })
  }

  printForm() {
    console.log(this.assetInfoForm);
  }
  get assetInfo() {
    return this.assetInfoForm.get('assetInfo') as FormArray;
  }

  createAsset(): FormGroup {
    return this.fb.group({
      asset: '',
      make: '',
      model: '',
      serialNo: '',
      allocatedFrom: '',
      assignedBy: ''
    });
  }

  addAtIndex(index) {
    this.assetInfo.insert(index+1, this.createAsset());
  }

  addAsset() {
    // this.assetInfo.splice(index, 0, this.createAsset());
    this.assetInfo.push(this.createAsset());
  }

  deleteAsset(index) {
    this.assetInfo.removeAt(index);
  }

  submit() {
    const save = {
      _id: this.candidateId,
      currentScreenId: this.screenId,
      requiredOfficialDetail: this.assetInfoForm.value
    }
    this.mainService.postToSaveData(save).subscribe(response => {
      console.log("Response", response);
      if(response.statusCode != "[200]") {
        this.loaderService.setNotificationObject('error', response.message);
      } else {
        if(this.isExternalUser) {
          const message = "Assets assigned successfully";
          this.loaderService.setNotificationObject('success', message);
        } else {
          this.router.navigateByUrl('dashboard/grid');
        }
      }
    })
  }
}
