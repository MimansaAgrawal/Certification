import {Designation} from '@app/model/Designation';
import {ProfileStakeHolder} from '@app/model/ProfileStakeHolder';
import {Nationality} from '@app/model/Nationality';
import {MaritalStatus} from '@app/model/MaritalStatus';
import {Name} from '@app/model/Name';

export class CandidateDetails {
  name: Name;
  // tslint:disable-next-line:variable-name
  marital_status: MaritalStatus;
  dob: string;
  gender: string;
  primaryContactNumber: number;
  emergencyContactNumber: number;
  email: string;
  bloodGroup: string;
  nationality: Nationality;
  languageProficiency: string;
  profile: string;
  profileStakeholder: ProfileStakeHolder;
  offerDate: string;
  doj: string;
  dof: string;
  professionalExperience: string;
  resume: string;
  hiringLocation: string;
  candidateLocation: string;
  createdAt: string;
  ctc: string;
  designation: Designation;

  // tslint:disable-next-line:variable-name
  constructor(name: Name, marital_status: MaritalStatus, dob: string,
              gender: string, primaryContactNumber: number,
              emergencyContactNumber: number, email: string, bloodGroup: string,
              nationality: Nationality, languageProficiency: string, profile: string,
              profileStakeholder: ProfileStakeHolder, offerDate: string, doj: string,
              dof: string, professionalExperience: string, resume: string,
              hiringLocation: string, candidateLocation: string, createdAt: string,
              ctc: string,designation: Designation) {
    this.name = name;
    this.marital_status = marital_status;
    this.dob = dob;
    this.gender = gender;
    this.primaryContactNumber = primaryContactNumber;
    this.emergencyContactNumber = emergencyContactNumber;
    this.email = email;
    this.bloodGroup = bloodGroup;
    this.nationality = nationality;
    this.languageProficiency = languageProficiency;
    this.profile = profile;
    this.profileStakeholder = profileStakeholder;
    this.offerDate = offerDate;
    this.doj = doj;
    this.dof = dof;
    this.professionalExperience = professionalExperience;
    this.resume = resume;
    this.hiringLocation = hiringLocation;
    this.candidateLocation = candidateLocation;
    this.createdAt = createdAt;
    this.ctc = ctc;
    this.designation = designation;
  }
}
