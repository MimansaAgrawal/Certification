import {Reference} from '@app/model/Reference';

export class References {
  professionalReference: Reference[];
  hrReference: Reference[];
  collegeReference: Reference[];

  constructor(professionalReference: Reference[], hrReference: Reference[], collegeReference: Reference[]) {
    this.professionalReference = professionalReference;
    this.hrReference = hrReference;
    this.collegeReference = collegeReference;
  }
}
