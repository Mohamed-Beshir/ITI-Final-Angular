import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  propertyData = [{
    "id":1,
    "image":"assets/img/slide-01.jpg",
    "street":"3398 Lodgeville Road",
    "propertyNumber":"Golden Valley, MN 55427",
    "price":"11,000",
    "area":"240m",
    "Beds":2,
    "Baths":2,
    "Garages":0,
    "status":"For Sale"
  },
  {
    "id":2,
    "image":"assets/img/slide-02.jpg",
    "street":"2186 Rinehart Road",
    "propertyNumber":"Doral, FL 33178",
    "price":"38,000",
    "area":"240m",
    "Beds":3,
    "Baths":1,
    "Garages":1,
    "status":"For Rent"
  },
  {
    "id":3,
    "image":"assets/img/slide-03.jpg",
    "street":"3705 Brighton Circle Road",
    "propertyNumber":"Glenwood, MN 56334",
    "price":"325,000",
    "area":"240m",
    "Beds":3,
    "Baths":1,
    "Garages":1,
    "status":"For Rent"
  },
  ]

  

}
