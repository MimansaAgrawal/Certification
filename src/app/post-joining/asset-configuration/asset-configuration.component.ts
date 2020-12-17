import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Main } from '@app/core/_api/main.service';
import { dropdownConfig } from '../../constants/dropdown.config'

@Component({
  selector: 'app-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.css']
})
export class AssetConfigurationComponent implements OnInit {
  config = dropdownConfig
  myObj = {};
  itPerson: any[];
  fullData: any;
  candidateId: string;
  inputfilename: string;
  inputDoc: string;
  softwareInstalled: string;
  systemType: string;
  assetData: any;
  assetConfigForm: FormGroup;
  isExternalUser: boolean;
  @Input() userId: string;
  @Input() screenId: string;
  message: string;
  
  constructor(private mainService: Main,
    private route: ActivatedRoute,
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
      this.assetData = this.fullData['requiredOfficialDetail'];
      const arr = this.fullData["uploadedDocuments"]
      for (let i in arr) {
        if (arr[i].value == "Resume") {
          this.inputfilename = arr[i].filename
          this.inputDoc = arr[i].docId
        }
      }
    });

    this.mainService.getItDetail().subscribe(info => {
      this.itPerson = [];
      info["data"].forEach(obj => {
        this.itPerson.push({
          name: obj.EmployeeName,
          email: obj.Email
        });
      });
    });

    this.assetConfigForm = this.fb.group({
      additionalComments: ['', Validators.required],
      configuredBy: ['', Validators.required],
    });

  }

  submit() {
    const save = {
      _id: this.candidateId,
      currentScreenId: this.screenId,
      assetsConfiguredBy: this.assetConfigForm.value.configuredBy
    }
    save.assetsConfiguredBy['comment'] = this.assetConfigForm.value.additionalComments;
    this.mainService.postToSaveData(save).subscribe(response => {
      console.log("Response", response);
      if(response.statusCode != "[200]") {
        this.loaderService.setNotificationObject('error', response.message);
      } else {
        if(this.isExternalUser) {
          const message = "Assets configured successfully";
          this.loaderService.setNotificationObject('success', message);
        } else {
          this.router.navigateByUrl('dashboard/grid');
        }
      }
    });
  }
}
