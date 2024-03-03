import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
})
export class CutTextPipe implements PipeTransform {
  transform(text: string, limit: number): string {
    if (text.split(' ').length > limit) {
      return text.split(' ').splice(0, limit).join(' ') + '...';
    } else {
      return text.split(' ').splice(0, limit).join(' ');
    }
    // return text.split(' ').splice(0, limit).join(' ');
  }
}
