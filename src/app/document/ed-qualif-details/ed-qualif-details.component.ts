import {Component, OnInit} from '@angular/core';
import {DocumentService} from '@app/document/document.service';

@Component({
  selector: 'app-ed-qualif-details',
  templateUrl: './ed-qualif-details.component.html',
  styleUrls: ['./ed-qualif-details.component.css']
})
export class EdQualifDetailsComponent implements OnInit {

  constructor(public documentService: DocumentService) {
  }

  ngOnInit() {
  }

}
