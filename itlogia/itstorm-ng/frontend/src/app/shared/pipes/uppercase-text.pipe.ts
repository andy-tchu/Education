import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseText'
})
export class UppercaseTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
