export class OthersDetail {
  technicalSkillSets: any[];
  hobbies: string;
  overallWorkExperienceInYears: number;
  linkedInUrl: string;
  lastCollegeAttended: string;
  lastOrganisationWorkedAt: string;

  constructor(technicalSkillSets: any[], hobbies: string[],
              overallWorkExperienceInYears: number, linkedInUrl: string,
              lastCollegeAttended: string, lastOrganisationWorkedAt: string) {
    this.technicalSkillSets = technicalSkillSets;
    this.hobbies = hobbies.toString();
    this.overallWorkExperienceInYears = overallWorkExperienceInYears;
    this.linkedInUrl = linkedInUrl;
    this.lastCollegeAttended = lastCollegeAttended;
    this.lastOrganisationWorkedAt = lastOrganisationWorkedAt;
  }
}
