import {CandidateDetails} from '@app/model/CandidateDetails';
import {FamilyDetails} from '@app/model/FamilyDetails';
import {OthersDetail} from '@app/model/OthersDetail';
import {Address} from '@app/model/Address';
import {References} from '@app/model/References';
import {Buddy} from '@app/model/Buddy';
import {ReportingManager} from '@app/model/ReportingManager';
import {CurrentStatus} from '@app/model/CurrentStatus';
import {DocumentDetail} from '@app/model/DocumentDetail';
import {Education} from '@app/model/Education';
import {AllEmploymentDetails} from '@app/model/AllEmploymentDetails';
import {IdentityInformation} from '@app/model/IdentityInformation';
import {LaptopDetails} from '@app/model/LaptopDetails';

export class CandidateData {
  _id: string;
  // candidateDetails: CandidateDetails;
  rejectReason: string;
  familyDetails: FamilyDetails;
  others: OthersDetail;
  currentAddressDetails: Address;
  permanentAddressDetails: Address;
  references: References;
  buddy: Buddy;
  reportingManager: ReportingManager;
  teamName: string;
  // currentStatus: CurrentStatus;
  currentScreenId:string
  uploadedDocuments: DocumentDetail[];
  education: Education[];
  allEmploymentDetails: AllEmploymentDetails;
  identityInformation: IdentityInformation;
  laptopDetails: LaptopDetails;

  constructor(_id: string, rejectReason: string,
              familyDetails: FamilyDetails, others: OthersDetail,
              currentAddressDetails: Address, permanentAddressDetails: Address,
              references: References, buddy: Buddy, reportingManager: ReportingManager,
              teamName: string, currentStatus:string,
              uploadedDocuments: DocumentDetail[], education: Education[],
              allEmploymentDetails: AllEmploymentDetails,
              identityInformation: IdentityInformation, laptopDetails: LaptopDetails) {
                this._id = _id;
    // this.candidateDetails = candidateDetails;
    this.rejectReason = rejectReason;
    this.familyDetails = familyDetails;
    others.hobbies = others.hobbies.toString();
    this.others = others;
    this.currentAddressDetails = currentAddressDetails;
    this.permanentAddressDetails = permanentAddressDetails;
    this.references = references;
    this.buddy = buddy;
    this.reportingManager = reportingManager;
    this.teamName = teamName;
    this.currentScreenId = currentStatus;
    this.uploadedDocuments = uploadedDocuments;
    this.education = education;
    this.allEmploymentDetails = allEmploymentDetails;
    this.identityInformation = identityInformation;
    this.laptopDetails = laptopDetails;
  }
}
