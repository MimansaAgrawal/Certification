import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {DocumentService} from '@app/document/document.service';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {

  constructor(public documentService: DocumentService) {
  }

  ngOnInit() {
  }
}
