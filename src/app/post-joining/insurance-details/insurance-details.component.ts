import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent implements OnInit {

  today = new Date();


  @Input() bankDetailsForm: FormGroup;
  @Input() fullData: Object = {};

  // @Output() nextStep: EventEmitter<boolean> = new EventEmitter();
  // @Output() prevStep: EventEmitter<boolean> = new EventEmitter();

  get f() {
    return this.bankDetailsForm.controls;
  }

  get allChildren() {
    return this.bankDetailsForm.get('children') as FormArray;
  }

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  addChildren() {
    this.allChildren.push(this.formbuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+')])],
      gender: ['',  Validators.compose([Validators.required])],
      dob: ["", Validators.compose([Validators.required])]
    }));
  }

  deleteChildren(index) {
    this.allChildren.removeAt(index);
  }

  // next() {
  //   this.nextStep.emit(true);
  // }

  // prev() {
  //   this.prevStep.emit(true);
  // }

}
