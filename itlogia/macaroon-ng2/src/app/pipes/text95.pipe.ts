import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text95'
})
export class Text95Pipe implements PipeTransform {

  transform(value: string): string {
    if (value.length <= 95){
    return value;}
    else {
      return value.substring(0,95) + '...';
    }
  }

}
