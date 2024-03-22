import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'date',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, format: string = 'MMM d, y, h:mm a') {
    if (!value) return ''; // If no value, return an empty string
    return new DatePipe('en-US').transform(value, format);
  }

}
