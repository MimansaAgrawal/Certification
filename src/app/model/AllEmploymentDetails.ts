import {EmploymentDetail} from '@app/model/EmploymentDetail';

export class AllEmploymentDetails {
  experienceType: string;
  employmentDetail: EmploymentDetail[];

  constructor(experienceType: string, employmentDetail: EmploymentDetail[]) {
    this.experienceType = experienceType;
    this.employmentDetail = employmentDetail;
  }
}
