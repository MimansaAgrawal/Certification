import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "capitalize" })
export class CapitalizeString implements PipeTransform {
  transform(stringCapitalize: String, args: string[]): any {
    if (stringCapitalize) {
      // console.log("pipe::::::::::::::;", stringCapitalize);
      return stringCapitalize
        .split(" ")
        .filter(elem => {
          // console.log("here");
          // console.log("elem:::::", elem);
          if (elem !== "") {
            return elem;
          }
        })
        .map(elem => {
          // console.log("mapped elem:::::::::", elem);
          elem = elem.toLocaleLowerCase();
          return elem[0].toUpperCase() + elem.slice(1);
        })
        .join(" ");
    }
  }
}
