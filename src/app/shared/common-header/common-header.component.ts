import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Main } from '@app/core/_api/main.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {
  modalRef: BsModalRef;

  @Input() heading: string;
  @Input() screenId?: string;
  @Input() candidateId?: string;
  message: string;
  isExternalUser: boolean = false;
  constructor(private router: Router,
    private modalService: BsModalService,
    private mainService: Main,
    private route: ActivatedRoute,
    private loaderService: LoaderService) { }

	onGrid(){
		this.router.navigateByUrl('dashboard/grid')
  }
  
  ngOnInit() {
    this.isExternalUser = this.route.snapshot.queryParamMap.get('token') ? true : false;
  }

  manuallyTriggerEmail() {
    console.log('Need to write here the logic to trigger email');
    const saveObj = {
      "_id":this.candidateId,
      "screenId":this.screenId
    };
    this.mainService.postToTriggerMailManually(saveObj).subscribe(response => {
      console.log("Response", response);
      if(response.statusCode == "[200]") {
        this.message = 'E-mail sent successfully';
        this.loaderService.setNotificationObject('success', this.message);
      }

      if(response.statusCode != "[200]") {
        this.loaderService.setNotificationObject('error', response.message);
      } 
    })
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>, row: any) {
    this.modalRef = this.modalService.show(template);
  }
}
