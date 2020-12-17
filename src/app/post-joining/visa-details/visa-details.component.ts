import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.css']
})
export class VisaDetailsComponent implements OnInit {

  @Input() bankDetailsForm: FormGroup;

  // @Output() nextStep: EventEmitter<boolean> = new EventEmitter();
  // @Output() prevStep: EventEmitter<boolean> = new EventEmitter();

  visaType=["B1/B2","H1b/H4","F1","L1/L2"]
  get f() {
    return this.bankDetailsForm.controls;
  }

  constructor() { }

  ngOnInit() {
  }

  // next() {
  //   this.nextStep.emit(true);
  // }

  // prev() {
  //   this.prevStep.emit(true);
  // }

}
