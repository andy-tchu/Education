import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 30 ? value.substring(0, 80) + '...' : value;
  }

}
