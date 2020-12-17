import {Sibling} from '@app/model/Sibling';

export class FamilyDetails {
  fathersName: string;
  fathersOccupation: string;
  fathersAge: number;
  fathersCurrentWorkStatus: string;
  mothersName: string;
  mothersOccupation:string;
  mothersAge: number;
  mothersCurrentWorkStatus: string;
  siblings: Sibling[];

  constructor(fathersName: string, fathersOccupation: string,
              fathersAge: number, fathersCurrentWorkStatus: string, mothersName: string,mothersOccupation:string,
              mothersAge: number, mothersCurrentWorkStatus: string, siblings: Sibling[]) {
    this.fathersName = fathersName;
    this.fathersOccupation = fathersOccupation;
    this.fathersAge = fathersAge;
    this.fathersCurrentWorkStatus = fathersCurrentWorkStatus;
    this.mothersName = mothersName;
    this.mothersOccupation = mothersOccupation;
    this.mothersAge = mothersAge;
    this.mothersCurrentWorkStatus = mothersCurrentWorkStatus;
    this.siblings = siblings;
  }
}
