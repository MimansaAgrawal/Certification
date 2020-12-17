import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from '@app/document/document.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {
  candidateExp: string;
  constructor(public documentService: DocumentService) {


    this.candidateExp = this.documentService.candidateData.candidateDetails.professionalExperience;
    if(this.candidateExp === 'f'){
      // this.documentService.allEmploymentDetailForm.get('experienceType')
      this.documentService.removeHrPrFReferenceFormArray();
      this.documentService.addClgEntries();
      this.documentService.addClgEntries();
    }else{
      this.documentService.removeCldgReferenceFormArray();
      this.documentService.addPfEntries();
    this.documentService.addPfEntries();
    this.documentService.addHrEntries();

    }
    // console.log('expdsdf=======>', this.candidateExp);

  }

  ngOnInit() {
  }



}
