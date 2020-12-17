import {Component, OnInit} from '@angular/core';
import {DocumentService} from '@app/document/document.service';

@Component({
  selector: 'app-identity-information',
  templateUrl: './identity-information.component.html',
  styleUrls: ['./identity-information.component.css']
})
export class IdentityInformationComponent implements OnInit {

  constructor(public documentService: DocumentService) {
  }

  ngOnInit() {
  }

}
