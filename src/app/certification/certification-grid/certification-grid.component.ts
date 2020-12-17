import { CERTIFICATION_ROLE } from './../certification.constants';
import { CertificationService } from './../certification.service';
import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as moment from 'moment';
import { Main } from '@app/core/_api/main.service';
import { Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { SharedService } from '@app/core/services/shared.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { dropdownConfig } from "../../constants/dropdown.config";


@Component({
  selector: 'app-certification-grid',
  templateUrl: './certification-grid.component.html',
  styleUrls: ['./certification-grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }

  }]
})

export class CertificationGridComponent implements OnInit {
  filterDataArray: any;
  rowDataArray: any;
  check_exclude_click = false;
  dataSource: MatTableDataSource<any>;
  profileStakeholderArray: any;
  flag = 0;
  modalRef: BsModalRef;
  deleteId: any;
  status: string;
  flagRejected = false
  modalTitleText: string;
  toggleModal=false
  deleteIdNew:string
  // config = dropdownConfig;

  modalBodyText: string;
  columnsToDisplay = this.role === CERTIFICATION_ROLE.USER ? [ 'classification', 'technology',
  'certName', 'certProvider', 'completion', 'validity', 'options'] : ['name', 'department', 'team', 'classification', 'technology',
    'certName', 'certProvider', 'completion', 'validity', 'options'];


  // previouslyDoneStatus = ['Offer Letter Sent', 'Offer Letter Accepted', 'Documents Upload',
  //   'Document Verified', 'Send Welcome Mail', 'Intro E-mail Sent', 'Joined'];
  expandedElement: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() hideModalEvent = new EventEmitter();

  constructor(private http: HttpClient, private certificationService: CertificationService, private router: Router,
    private formbuilder: FormBuilder, private modalService: BsModalService, private loaderService: LoaderService,
    private sharedService: SharedService) {

  }

  // credentials = this.certificationService.credentials;
  months = [{
    monthId: "01",
    name: "January"
  },
  {
    monthId: "02",
    name: "February"
  },
  {
    monthId: "03",
    name: "March"
  },
  {
    monthId: "04",
    name: "April"
  },
  {
    monthId: "05",
    name: "May"
  },
  {
    monthId: "06",
    name: "June"
  },
  {
    monthId: "07",
    name: "July"
  },
  {
    monthId: "08",
    name: "August"
  },
  {
    monthId: "09",
    name: "September"
  },
  {
    monthId: "10",
    name: "October"
  },
  {
    monthId: "11",
    name: "November"
  },
  {
    monthId: "12",
    name: "December"
  }
  ];
  currentYear = new Date().getFullYear();
  years = [];
  noDataFound = "";

  exportCertificationForm = this.formbuilder.group({
    month: ['', Validators.required],
    year: ['', Validators.required]
  })


  ngOnInit() {
    // this.config.displayKey = "name";

    this.fetchDetail()
    for (let i = 0; i < 10; i++) {
      this.years.push(this.currentYear - i)
    }
  }

  addForm() {
    this.router.navigateByUrl('certification/certificationform');
  }

  showReminderView() {
    this.router.navigateByUrl('certification/certificationreminder');
  }

  getDate(input: any): any {
    return moment(input).format('L');
  }

  applyFilter(filterValue: string) {
    if (filterValue.trim().length > 0) {
      this.filterDataArray = this.rowDataArray.filter(data => // console.log('data', data);
        data.resource.name.toLowerCase().includes(filterValue.toLowerCase())
        || data.certification.name.toLowerCase().includes(filterValue.toLowerCase())
        || data.certification.provider.toLowerCase().includes(filterValue.toLowerCase())
        || data.certification.technology.join().toLowerCase().includes(filterValue.toLowerCase())
      );

    } else {
      this.filterDataArray = this.rowDataArray;
    }
    this.dataSource = new MatTableDataSource<any>(this.filterDataArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchDetail() {
    this.certificationService.getCertificationData().subscribe((obj: any) => {
      this.rowDataArray = obj['data'];
      this.dataSource = new MatTableDataSource<any>(this.rowDataArray);
      console.log('data', this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onUpdate(id, element) {
    console.log("id of employeee ", id);
    console.log("element value would be ", element);
    this.certificationService.updatedValue = element
    this.certificationService.idToUpdate = id;
    this.certificationService.updateFlag = true
    console.log("certification service ", this.certificationService.updatedValue);
    this.router.navigateByUrl("certification/certificationform");
  }
  onDelete(id) {
    console.log("id of employeee ", id);
    //write delete funtionality here
    this.deleteIdNew=id
    this.toggleModal=true


    // console.log("element value would be ", element);
    // this.certificationService.updatedValue = element
    // this.certificationService.idToUpdate = id;
    // this.certificationService.updateFlag = true
    // console.log("certification service ", this.certificationService.updatedValue);
    // this.router.navigateByUrl("certification/certificationform");
  }
  deleteCandidate(){

    this.certificationService.deleteCertificationData(this.deleteIdNew).subscribe(()=>{console.log("certification deleted");
    this.fetchDetail()
  });


  console.log("toggleModal value ",this.toggleModal);
  }

  onMonthSelected(event){
    console.log("month selected ",event);

  }
  onYearSelected(event){
    console.log("year selected ",event);

  }
  onSortChange() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log('property', property);
      console.log('item', item);
      // console.log("department ",item.resource.name);


      switch (property) {
        case 'name':
          return item.resource.name
        case 'department':
          return item.department.name;
        case 'team':
          return item.team.name;
        case 'classification':
          return item.certification.classification;
        case 'technology':
          return item.certification.technology;
        case 'certName':
          return item.certification.name;
        case 'certProvider':
          return item.certification.provider;
        case 'completion':
          return item.certification.completionDate;
        case 'validity':
          return item.certification.validthrough;
        default:
          return item[property];
      }
    };

  }


  get role() {
    return this.certificationService.role;
  }

  get CERTIFICATION_ROLE() {
    return CERTIFICATION_ROLE;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.noDataFound ="";
    this.exportCertificationForm.controls.month.setValue(this.months[new Date().getMonth()].monthId );
    this.exportCertificationForm.controls.year.setValue(this.currentYear) ;

  }
  onSubmit() {
    console.log(this.exportCertificationForm.value);
    this.certificationService.getCertificationDataByTime(this.exportCertificationForm.value.month, this.exportCertificationForm.value.year)
      .subscribe(res => {
        if (res.count > 0) {
          this.noDataFound = "";
          console.log(res.data);
          window.open(res.data, "_blank");
          // this.router.navigateByUrl(res.data);
        }
        else {
          this.noDataFound = res.message;
        }
      })
  }

  hideModal() {
    this.hideModalEvent.emit();
    this.modalRef.hide();
  }



// dropdwon config

    getDropdownConfig(key : string){
        switch(key){

          case 'month':
            return { ...dropdownConfig ,
                placeholder : "Select Month" ,
                search : false,
                displayKey : 'name'

              };

              case 'year':
            return { ...dropdownConfig ,
                  placeholder : "Select Year" ,
                  search : false,
                  displayKey : 'name'

                };

          default :
          return dropdownConfig;
        }
    }

}
