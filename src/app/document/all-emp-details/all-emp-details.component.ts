import {Component, OnInit} from '@angular/core';
import {DocumentService} from '@app/document/document.service';

@Component({
  selector: 'app-all-emp-details',
  templateUrl: './all-emp-details.component.html',
  styleUrls: ['./all-emp-details.component.css']
})
export class AllEmpDetailsComponent implements OnInit {
  candidateExp: string;
  isFresher:boolean;
  constructor(public documentService: DocumentService) {
    // console.log('professionalExp',this.documentService.candidateData.candidateDetails.professionalExperience)
    this.candidateExp = this.documentService.candidateData.candidateDetails.professionalExperience;
    this.documentService.allEmploymentDetailForm.get('experienceType').setValue(this.candidateExp === 'l' ? 'Lateral' : 'Fresher');
    if(this.candidateExp === 'f'){
      this.documentService.allEmploymentDetailForm.get('experienceType')
      this.documentService.removeEmpReferenceFormArray();
      this.isFresher = true;
    }else{
      this.documentService.addEmpEntries();
      this.isFresher = false;

    }
    console.log('isFresher',this.isFresher);
  }

  ngOnInit() {

  }

}
