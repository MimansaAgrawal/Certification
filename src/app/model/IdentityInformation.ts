export class IdentityInformation {
  aadharCardNumber: string;
  panCardNumber: string;

  constructor(aadharCardNumber: string, panCardNumber: string) {
    this.aadharCardNumber = aadharCardNumber;
    this.panCardNumber = panCardNumber;
  }
}
