import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'mobileNumberHide' })
export class MobileNumberHide implements PipeTransform {
    transform(value: number, args: string[]): any {
        if (!isNaN(value)) {
            let result: string;
            result = value.toString();
            const lastThree = result.substring(result.length - 3);
            const otherNumbers = result.substring(0, result.length - 3).replace(/./g, 'X');
            return otherNumbers + lastThree;
        } else {
            return value;
        }
    }
}
