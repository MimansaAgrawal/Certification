import { Component, OnInit, Input, Output, ViewChild, ElementRef,EventEmitter, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.css']
})
export class PromptModalComponent implements OnInit,OnChanges {

  constructor(
    private modalService: BsModalService
  ) { }
  @Input() modalBodyText
  @Input() modalTitleText
  @Input() acceptText
  @Input() rejectText
  @Input() rejectFlag
  @Input() gecFlag
  @Input() dateFlag
  @Input() warningFlag
  today = new Date().toISOString().split('T')[0];

  fieldValue:string=""

 

  @Output() rejectEvent=new EventEmitter()
  @Output() acceptEvent= new EventEmitter()

  @Output() hideModalEvent = new EventEmitter();


  modalRef: BsModalRef
  @ViewChild("template", { static: true }) template: ElementRef;



  
  ngOnInit() {
  }
  ngOnChanges(){
    this.openModal(this.template);
    

  }


  openModal(template: any) {
     this.modalRef = this.modalService.show(template,
		{
		backdrop: 'static',
		keyboard: false
		});
    console.log("date ::",this.fieldValue);
    
	
	
  }

  hideModal() {
    console.log("rejected reason ",this.fieldValue);

      this.hideModalEvent.emit();
      this.modalRef.hide();
      
  }


}
