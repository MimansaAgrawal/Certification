import { CommonHeaderComponent } from '@app/shared/common-header/common-header.component';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { ApiSchema } from '@app/shared/api-schema.model';
import {FileNamePipe} from 'app/core/pipes/file-name.pipe';
@Component({
  selector: 'show-candidate-details',
  templateUrl: './candidate-details.component.html'
})
export class CandidateDetailsComponent implements OnInit, OnChanges{
  @ViewChild(CommonHeaderComponent, { static: false })
  commonHeaderComponent: CommonHeaderComponent;

  @Input() fullData: ApiSchema;
  @Input() inputfilename: string;
  @Input() inputDoc:any
  @Input() myObj;

  @Output() submitEvent = new EventEmitter();

  toggleModal = false;
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    console.log("inputfilename", this.inputfilename);
  }
  submitEventHandler() {
    this.submitEvent.emit();
  }
}
