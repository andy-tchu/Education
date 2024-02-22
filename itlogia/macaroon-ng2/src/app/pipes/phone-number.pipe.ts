import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    return '+' + value.substring(0,3) + ' (' + value.substring(3,5) + ') ' + value.substring(5,8) + '-' + value.substring(8,10) + '-' + value.substring(10,12);
  }

}
