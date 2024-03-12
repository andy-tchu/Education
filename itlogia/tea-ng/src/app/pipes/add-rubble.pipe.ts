import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addRubble'
})
export class AddRubblePipe implements PipeTransform {

  transform(value: number): string {
    return 'Цена: ' + value.toString() + ' руб.';
  }

}
