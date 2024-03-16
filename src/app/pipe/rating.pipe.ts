import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
  standalone: true
})
export class RatingPipe implements PipeTransform {

  transform(rating : number): any {
    if(rating == 5) {
      return '<i class="fa-solid fa-star text-warning text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i>'
    }else if(rating >= 4.5) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning-half-stroke"></i>'
    }else if(rating >= 4) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 3.5) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning-half-stroke"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 3) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 2.5) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning-half-stroke"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 2) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 1.5) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning-half-stroke"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 1) {
      return '<i class="fa-solid fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 0.5) {
      return '<i class="fa-solid fa-star text-warning-half-stroke"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }else if(rating >= 0) {
      return '<i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i>'
    }
  }

}
