import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { DocumentService } from "@app/document/document.service";

@Component({
  selector: "app-emp-address-inf",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./emp-address-inf.component.html",
  styleUrls: ["./emp-address-inf.component.css"],
})
export class EmpAddressInfComponent implements OnInit {
  currentCandidateData: any;
  public currAddress1: string;
  public street: string;
  public locality: string;
  public currCity: string;
  public currState: string;
  public currPinCode: string;
  constructor(public documentService: DocumentService) {}

  ngOnInit() {}
  checkadress(isChecked:boolean) {
    const addressForm = this.documentService.employeeAddressForm;
    console.log("afaza", isChecked);
    if (isChecked === true) {
      addressForm.get('permanentAddress1').setValue(addressForm.get('currAddress1').value);
      addressForm.get('permState').setValue(addressForm.get('currState').value);
      addressForm.get('permPinCode').setValue(addressForm.get('currPinCode').value);
      addressForm.get('perstreet').setValue(addressForm.get('street').value);
      addressForm.get('perlocality').setValue(addressForm.get('locality').value);
      addressForm.get('permCity').setValue(addressForm.get('currCity').value);
      addressForm.controls.permanentAddress1.disable();
      addressForm.controls.permState.disable();
      addressForm.controls.permPinCode.disable();
      addressForm.controls.perstreet.disable();
      addressForm.controls.perlocality.disable();
      addressForm.controls.permCity.disable();

    }else{
      addressForm.get('permanentAddress1').reset();
      addressForm.get('permState').reset();
      addressForm.get('permPinCode').reset();
      addressForm.get('perstreet').reset();
      addressForm.get('perlocality').reset();
      addressForm.get('permCity').reset();
      addressForm.controls.permanentAddress1.enable();
      addressForm.controls.permState.enable();
      addressForm.controls.permPinCode.enable();
      addressForm.controls.perstreet.enable();
      addressForm.controls.perlocality.enable();
      addressForm.controls.permCity.enable();

    }
  }
}
