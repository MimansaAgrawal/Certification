import { Component, OnInit,TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { CredentialsService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { Main } from '@app/core/_api/main.service';
import {SharedService} from '@app/core/services/shared.service';
import { Router } from '@angular/router';
import { children } from '../../shared/children';
import * as moment from 'moment';
import { LoaderService } from '@app/core/services/loader.service';
import { EmpDetailsComponent } from '@app/shared/emp-details/emp-details.component';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  @Input() bankDetailsForm: FormGroup;

  @Input() fullData: Object = {};


  // @Output() nextStep: EventEmitter<boolean> = new EventEmitter();
  // @Output() prevStep: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private credentialService:CredentialsService,
    private route:ActivatedRoute,
    private sharedService:SharedService,
    private mainService:Main,
    private router: Router,
    private loaderService: LoaderService,
    private formbuilder: FormBuilder,
    private modalService:BsModalService
  ) { }

  get f() {
    return this.bankDetailsForm.controls;
  }

  ngOnInit() {

  }

  // next() {
  //   this.nextStep.emit(true);
  // }

  // prev() {
  //   this.prevStep.emit(true);
  // }

}
