import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, EventEmitter, Output, OnChanges, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Main } from '@app/core/_api/main.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.css']
})
export class FileModalComponent implements OnChanges {

  @Input() inputfilename: string;
  @Input() inputDoc:any
  @Input() myObj: any;
  safeUrl: any;
  modalRef: BsModalRef
  @ViewChild("template", { static: true }) template: ElementRef;

  @Output() hideModalEvent = new EventEmitter();
  newData: any;


  constructor(private mainService: Main,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService) { }

  ngOnChanges() {
    if(!this.inputfilename) {
      this.openfile(this.inputDoc);
    } else {
      this.myObj['uploadedDocuments'] = [{filename: this.inputfilename}];
      this.openModal(this.template);
    }
  
   console.log(this.inputfilename); console.log(this.myObj); 
   console.log(this.inputDoc);
  }
  openfile(id){
    console.log("inside upload screen",id);
    
    this.mainService.getCandidateById(this.myObj.Uid).subscribe(info => {
      this.newData = info.data.uploadedDocuments;
      console.log(this.newData._id);
      const arr = this.newData;
      console.log(this.newData);
      console.log(id);
      for (const i in arr) {
        if (arr[i].docId === id) {
          this.inputfilename=arr[i].filename
        }
      }
      console.log(this.inputfilename);
      this.myObj['uploadedDocuments'] = [{filename: this.inputfilename}];
      this.openModal(this.template);
    });

  }
  openModal(template: any) {
    console.log(this.myObj);

    this.mainService.postToDownloadData(this.myObj).subscribe((res: any) => {
      console.log('res ', res);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res['data'][0].uploadPath);
   
      this.modalRef = this.modalService.show(template,
		{
		backdrop: 'static',
		keyboard: false
    });
    // this.modalRef.setClass('modal-xl');
    })
   
    
	
	
  }

  hideModal() {
    this.hideModalEvent.emit();
    this.modalRef.hide();
  }

}
