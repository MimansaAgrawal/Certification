import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "indianCurrency" })
export class IndianCurrency implements PipeTransform {
  transform(value: number, args?: string[]): any {
    if (!isNaN(value)) {
      const currencySymbol = "₹";
      let valued = parseFloat(value.toString());
      value = valued;
      let values = value.toFixed(2);
      // var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!
      const result = values.toString().split(".");
      let lastThree = result[0].substring(result[0].length - 3);
      const otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers !== "") {
        lastThree = "," + lastThree;
      }
      let output =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      //console.log(output);
      if (result.length > 1) {
        //console.log(result[1])
        // if (result[1].length > 2) {
        output += "." + result[1];
        //   //output = parseFloat(output).toFixed(2);
        // }
        // else {
        //   output += '.' + result[1];
        // }
      }

      return currencySymbol + output;
    } else {
      return value;
    }
  }
}
