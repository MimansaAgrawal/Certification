import { map } from 'rxjs/operators';

interface Deserializable {
  deserialize(input: any): this;
}

export class ApiSchema implements Deserializable {
  createdBy: string;
  candidateDetails: Candidate;
  employeeFeedback: FeedBack;
  hrSpokes: HrSpokes;
  familyDetails: Family;
  others: Others;
  currentAddressDetails: Address;
  permanentAddressDetails: Address;
  processStatus: number;
  rejectReason: string;
  education: Education[];
  allEmploymentDetails: EmploymentDetail;
  references: References;
  identityInformation: IdentityInformation;
  laptopDetails: LaptopDetails;
  nextAction: Action[];
  currentStatus: Action;
  buddy: Buddy;
  reportingManager: ReportingManager;
  teamName: string;
  status: Status[];
  uploadedDocuments: Document[];
  isDeleted: boolean;
  bankDetails: Bank;
  insuranceDetails: Insurance;
  visa: Visa;
  feedbackDetails: FeedBackDetails;
  deserialize(input: any) {
    Object.assign(this, input);
    this.candidateDetails = new Candidate().deserialize(input.candidateDetails);
    this.employeeFeedback = new FeedBack().deserialize(input.employeeFeedback);
    this.hrSpokes = new HrSpokes().deserialize(input.hrSpokes);
    this.familyDetails = new Family().deserialize(input.familyDetails);
    this.others = new Others().deserialize(input.others);
    this.currentAddressDetails = new Address().deserialize(input.currentAddressDetails);
    this.permanentAddressDetails = new Address().deserialize(input.permanentAddressDetails);
    this.education = input.education.map((education: Education) => new Education().deserialize(education));
    this.allEmploymentDetails = new EmploymentDetail().deserialize(input.allEmploymentDetails);
    this.references = new References().deserialize(input.references);
    this.identityInformation = new IdentityInformation().deserialize(input.identityInformation);
    this.laptopDetails = new LaptopDetails().deserialize(input.laptopDetails);
    this.nextAction = input.nextAction.map((action: Action) => new Action().deserialize(action));
    this.currentStatus = new Action().deserialize(input.currentStatus);
    this.buddy = new Buddy().deserialize(input.buddy);
    this.reportingManager = new ReportingManager().deserialize(input.reportingManager);
    this.status = input.status.map((status: Status) => new Status().deserialize(status));
    this.uploadedDocuments = input.uploadedDocuments.map((document: Document) => new Document().deserialize(document));
    this.bankDetails = new Bank().deserialize(input.bankDetails);
    this.insuranceDetails = new Insurance().deserialize(input.insuranceDetails);
    this.visa = new Visa().deserialize(input.visa);
    this.feedbackDetails = new FeedBackDetails().deserialize(input.feedbackDetails);
    return this;
  }
}

export class Candidate implements Deserializable {
  name: Name;
  marital_status: MaritalStatus;
  dob: Date;
  gender: string;
  primaryContactNumber: string;
  emergencyContactNumber: string;
  email: string;
  bloodGroup: string;
  nationality: Nationality;
  languageProficiency: string;
  profileStakeholder: StakeHolder;
  profile: string;
  offerDate: Date;
  doj: Date;
  dojString: string;
  designation: Designation;
  resume: string;
  resumeUrl: string;
  professionalExperience: string;
  hiringLocation: string;
  candidateLocation: string;
  ctc: string;
  probationPeriodEndsOn: Date;
  probationPeriodEndsOnString: string;
  
  deserialize(input: any) {
    Object.assign(this, input);
    this.name = new Name().deserialize(input.name);
    this.marital_status = new MaritalStatus().deserialize(input.marital_status);
    this.nationality = new Nationality().deserialize(input.nationality);
    this.profileStakeholder = new StakeHolder().deserialize(input.profileStakeholder);
    this.designation = new Designation().deserialize(input.designation);
    return this;
  }
}

export class Name implements Deserializable {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class MaritalStatus implements Deserializable {
  status: string;
  spouseName: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Nationality implements Deserializable {
  country: string;
  otherCountry: string;
  workPermitForIndia: boolean;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class StakeHolder implements Deserializable {
  name: string;
  email: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Designation implements Deserializable {
  id: string;
  name: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class FeedBack implements Deserializable {
  feedbackSubmitted: boolean;
  SubmittedOnname: Date;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class HrSpokes implements Deserializable {
  name: string;
  email: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Family implements Deserializable {
  fathersName: string;
  fathersOccupation: string;
  fathersAge: string;
  fathersCurrentWorkStatus: string;
  mothersName: string;
  mothersAge: string;
  mothersCurrentWorkStatus: string;
  siblings: Sibling[];
  deserialize(input: any) {
    Object.assign(this, input);
    this.siblings = input.siblings.map((sibling: Sibling) => new Sibling().deserialize(sibling));
    return this;
  }
}

export class Sibling implements Deserializable {
  name: string;
  age: string;
  educationalStatus: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Others implements Deserializable {
  technicalSkillSets: string;
  hobbies: string;
  overallWorkExperienceInYears: string;
  linkedInUrl: string;
  lastCollegeAttended: string;
  lastOrganisationWorkedAt: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Address implements Deserializable {
  address1: string;
  address2: string;
  address3: string;
  state: string;
  pinCode: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Education implements Deserializable {
  name: string;
  location: string;
  marks: string;
  field: string;
  ispersuing: boolean;
  yearofpassing: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class EmploymentDetail implements Deserializable {
  experienceType: string;
  employmentDetail: Employment[];
  deserialize(input: any) {
    Object.assign(this, input);
    this.employmentDetail = input.employmentDetail.map((employment: Employment) => new Employment().deserialize(employment));
    return this;
  }
}

export class Employment implements Deserializable {
  nameOfCompany: string;
  duration: string;
  designation: string;
  mostRecentExperience: boolean;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class References implements Deserializable {
  professionalReference: Reference[];
  hrReference: Reference[];
  collegeReference: Reference[];
  deserialize(input: any) {
    Object.assign(this, input);
    this.professionalReference = input.professionalReference.map((reference: Reference) => new Reference().deserialize(reference));
    this.hrReference = input.hrReference.map((reference: Reference) => new Reference().deserialize(reference));
    this.collegeReference = input.collegeReference.map((reference: Reference) => new Reference().deserialize(reference));
    return this;
  }
}

export class Reference implements Deserializable {
  name: string;
  emailId: string;
  contactNumber: string;
  designation: string;
  department: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class IdentityInformation implements Deserializable {
  aadharCardNumber: string;
  panCardNumber: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class LaptopDetails implements Deserializable {
  systemType: string;
  softwareInstalled: string[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Action implements Deserializable {
  previousScreenId: string[];
  candidateType: string;
  name: string;
  value: string;
  description: string;
  documentstobeuploaded: string[];
  compulsory: boolean;
  screenId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Buddy implements Deserializable {
  id: string;
  name: string;
  isconfirmed: string;
  email: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class ReportingManager implements Deserializable {
  name: string;
  email: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Status implements Deserializable {
  date: Date;
  action: string;
  actionName: string;
  creadtedby: string;
  screenId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Document implements Deserializable {
  docId: string;
  value: string;
  filename: string;
  verified: boolean;
  reject: boolean;
  reason: string;
  uploadedBy: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Bank implements Deserializable {
  bankName: string;
  ifscCode: string;
  accountNo: string;
  aadharNo: string;
  panNo: string;
  beneficiaryName: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Insurance implements Deserializable {
  name: string;
  gender: string;
  doj: Date;
  designation: string;
  contact: string;
  dob: Date;
  maritalStatus: string;
  spouse: Person;
  children: Person[];
  addParents: boolean;
  father: Person;
  mother: Person;
  deserialize(input: any) {
    Object.assign(this, input);
    this.spouse = new Person().deserialize(input.spouse);
    this.children = input.children.map((person: Person) => new Person().deserialize(person));
    return this;
  }
}

export class Person implements Deserializable {
  name: string;
  gender: string;
  dob: Date;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Visa implements Deserializable {
  visaStatus: string;
  visaType: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class FeedBackDetails implements Deserializable {
  name: string;
  feedbackPurpose: string;
  ratingParameters: RatingParameters;
  feedback: FeedBack2;
  deserialize(input: any) {
    Object.assign(this, input);
    this.ratingParameters = new RatingParameters().deserialize(input.ratingParameters);
    this.feedback = new FeedBack2().deserialize(input.feedback);
    return this;
  }
}

export class RatingParameters implements Deserializable {
  workPlaningExecution: string;
  managerialProficiency: string;
  technicalSkills: string;
  dependability: string;
  productivity: string;
  problemSolving: string;
  initiative: string;
  learnability: string;
  adapabiltiy: string;
  teamWork: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class FeedBack2 implements Deserializable {
  goodIn: string;
  areaofImprovement: string;
  remark: string;
  rating: string;
  isFullTime: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
  
