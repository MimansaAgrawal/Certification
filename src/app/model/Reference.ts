export class Reference {
  name: string;
  emailId: string;
  contactNumber: number;
  designation: string;
  department: string;

  constructor(name: string, emailId: string, contactNumber: number, designation: string, department: string) {
    this.name = name;
    this.emailId = emailId;
    this.contactNumber = contactNumber;
    this.designation = designation;
    this.department = department;
  }
}
