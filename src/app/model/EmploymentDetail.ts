export class EmploymentDetail {
  nameOfCompany: string;
  duration: number;
  designation: string;
  mostRecentExperience: boolean;

  constructor(nameOfCompany: string, duration: number, designation: string, mostRecentExperience: boolean) {
    this.nameOfCompany = nameOfCompany;
    this.duration = duration;
    this.designation = designation;
    this.mostRecentExperience = mostRecentExperience;
  }
}

