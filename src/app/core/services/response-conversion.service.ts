import { SharedService } from './shared.service';
import { ApiSchema } from '@app/shared/api-schema.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseConversionService {

  constructor(private sharedService: SharedService) { }

  public addEmployeeForm(formInput: any): any {
    return {
      id: this.sharedService.updateForm.id,
      candidateDetails: {
        name: this.breakFullName(formInput.name),
        primaryContactNumber: formInput.phoneNumber,
        email: formInput.email,
        profileStakeholder: {
          name: formInput.profileStakeHolder,
          email: formInput.profileStakeholderEmail
        },
        profile: formInput.profile,
        offerDate: formInput.dateOfOffer,
        doj: formInput.dateOfJoining,
        designation: {
          name: formInput.designation
        },
        professionalExperience: formInput.experienceStatus,
        hrSpokes: {
          name: formInput.hrSpoc
        }
      },
    };
  }

  public addBankDetails(formInput: any): any {
    return {
      id: formInput._id,
      bankDetails: {
        bankName: formInput.bName,
        ifscCode: formInput.ifscCode,
        accountNo: formInput.accNo,
        aadharNo: formInput.aadharNo,
        panNo: formInput.panNo,
        beneficiaryName: formInput.beneficiaryName,  
      },
      insuranceDetails: {
        name: formInput.name,
        gender: formInput.gender,
        doj: formInput.doj,
        designation: formInput.desig,
        contact: formInput.phone,
        dob: formInput.dob,
        maritalStatus: formInput.mStatus,
        spouse: {
          name: formInput.sName,
          gender: formInput.sGender,
          dob: formInput.sdob,
        },
        children: formInput.children,
        addParents: formInput.addParents,
        father: {
          name: formInput.fName,
          dob: formInput.fdob,
        },
        mother: {
          name: formInput.mName,
          dob: formInput.mdob
        },
      },
      visa: {
        visaStatus: formInput.visaStatus,
        visaType: formInput.visaType,
      }
    };
  }
  
  public removeUndefined(obj) {
    Object.keys(obj).forEach(key=> {
      if((typeof obj[key]) == 'object') {
        this.removeUndefined(obj[key]);
      }
      if(obj[key] === undefined || Object.keys(obj[key]).length == 0) {
        delete obj[key];
      }
    });
  }

  public breakFullName(fullName: String) {
    const indexOfBSP = fullName.indexOf(' ');
    let firstName: String = '', middleName: String = '', lastName: String = '';
    if(indexOfBSP != -1) {
        firstName = fullName.slice(0,indexOfBSP);
        const indexOfBSP2 = fullName.slice(indexOfBSP+1,fullName.length).indexOf(' ');
        if(indexOfBSP2 != -1) {
            middleName = fullName.slice(indexOfBSP+1,indexOfBSP+indexOfBSP2+1);
            lastName = fullName.slice(indexOfBSP+indexOfBSP2+2,fullName.length);
        } else {
            lastName = fullName.slice(indexOfBSP+1,fullName.length);
        }
    } else {
        firstName = fullName;
    }
    return {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      fullName: fullName
    } ;
  }
}
