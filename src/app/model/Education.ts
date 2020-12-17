export class Education {
  name: string;
  location: string;
  marks: string;
  field: string;
  isPersuing: boolean;
  yearOfPassing: string;

  constructor(name: string, location: string, marks: string, field: string, isPersuing: boolean, yearOfPassing: string) {
    this.name = name;
    this.location = location;
    this.marks = marks;
    this.field = field;
    this.isPersuing = isPersuing;
    this.yearOfPassing = yearOfPassing;
  }
}
