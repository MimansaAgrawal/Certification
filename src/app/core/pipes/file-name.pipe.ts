import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return '...' + value.substr(value.length - 15); 
  }

}
