import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removeEmptyField' })
export class RemoveEmptyField implements PipeTransform {
  transform(stringCapitalize: String, args: string[]): any {
    if (stringCapitalize) {
      // console.log(stringCapitalize);
      return stringCapitalize
        .split(',')
        .filter(res => {
          if (res != ' ') {
            // console.log(res);
            return res;
          }
        })
        .join(',');
    }
  }
}
