export class Address {
  address1: string;
  street:string;
  locality:string;
  city:string;
  state: string;
  pinCode: number;

  constructor(address1: string,street:string,locality:string,city:string, state: string, pinCode: number) {
    this.address1 = address1;
    this.street = street;
    this.locality = locality;
    this.city = city;
    this.state = state;
    this.pinCode = pinCode;
  }
}
