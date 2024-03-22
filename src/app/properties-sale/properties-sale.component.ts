import { Component } from '@angular/core';

import{FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faUmbrella} from '@fortawesome/free-solid-svg-icons'
//
import { NavbarComponent } from '../navbar/navbar.component';
//

import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
// import {MatSliderModule} from '@angular/material/slider';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { SmallFooterComponent } from '../small-footer/small-footer.component';
import { ActivatedRoute, Route, Router, RouterEvent, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AddPropertyService } from '../services/add-property.service';
import { PropertyLineCardComponent } from '../property-line-cards/property-line-card.component';


@Component({
  selector: 'app-properties-sale',
  standalone: true,
  imports: [PropertyLineCardComponent,FontAwesomeModule
            ,FormsModule
            ,SearchComponent
            ,NavbarComponent
            ,BigFooterComponent
            ,SmallFooterComponent
            ,RouterLink

            ],
  templateUrl: './properties-sale.component.html',
  styleUrl: './properties-sale.component.css'
})
export class PropertiesSaleComponent {
a1="";
umbrela=faUmbrella;
home=faHome;
arrow=faAngleRight;
arrowdown=faAngleDown;

data: any;
queryParams : any;
properties: any;
constructor(private apiService: AddPropertyService, private route : ActivatedRoute) {
  const myArray = this.route.snapshot.queryParamMap.get('myArray');
  if (myArray === null) {
    this.properties = new Array();
  } else {
    this.properties = JSON.parse(myArray);
  }
}


ngOnInit(): void {
  const myArray = this.route.snapshot.queryParamMap.get('myArray')
  if(myArray){
    this.data = this.properties;
  }else{
    this.fetchDataFromApi();
  }
}

fetchDataFromApi() {
  this.apiService.getAllPropertyRentOrSale('for_sale').subscribe((data) => {
    this.data = data;
  });
}


sort (order_by : string) {
  this.apiService.getAllPropertyRentOrSaleOrderBy('for_sale', order_by)
      .subscribe(data => {
        this.data = data;
  })
}

itemsPerPage = 6; // Number of items to show per page
currentPage = 1; // Current page
  // Function to get the properties for the current page
  getCurrentPageProperties(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  // Function to get an array of page numbers based on the total number of properties and items per page
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Function to change the current page
  changePage(newPage: number): void {
    this.currentPage = newPage;
    console.log(this.data)
  }
  // propertys:Array<any>=
  // [{
  //   "id":1,
  //   "image":"assets/img/properties/property-09.jpg",
  //   "street":"3398 Lodgeville Road",
  //   "propertyNumber":"Golden Valley, MN 55427",
  //   "price":"11,000",
  //   "area":"240m",
  //   "Beds":2,
  //   "Baths":2,
  //   "Garages":0,
  //   "status":"For Sale"
  // },
  // {
  //   "id":2,
  //   "image":"assets/img/properties/property-03.jpg",
  //   "street":"2186 Rinehart Road",
  //   "propertyNumber":"Doral, FL 33178",
  //   "price":"38,000",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Rent"
  // },
  // {
  //   "id":3,
  //   "image":"assets/img/properties/property-06.jpg",
  //   "street":"3705 Brighton Circle Road",
  //   "propertyNumber":"Glenwood, MN 56334",
  //   "price":"325,000",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Rent"
  // },
  // {
  //   "id":4,
  //   "image":"assets/img/properties/property-02.jpg",
  //   "street":"2506 B Street",
  //   "propertyNumber":"New Brighton, MN 55112",
  //   "price":"18,000",
  //   "area":"280m",
  //   "Beds":3,
  //   "Baths":2,
  //   "Garages":1,
  //   "status":"For Sale"
  // },
  // {
  //   "id":5,
  //   "image":"assets/img/properties/property-12.jpg",
  //   "street":"3990 Late Avenue",
  //   "propertyNumber":"Kingfisher, OK 73750",
  //   "price":"136,000",
  //   "area":"30m",
  //   "Beds":1,
  //   "Baths":1,
  //   "Garages":0,
  //   "status":"For Rent"
  // },
  // {
  //   "id":6,
  //   "image":"assets/img/properties/property-05.jpg",
  //   "street":"297 Marie Street",
  //   "propertyNumber":"Towson, MD 21204",
  //   "price":"12,680",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Rent"
  // },
  // {
  //   "id":7,
  //   "image":"assets/img/properties/property-13.jpg",
  //   "street":"2663 West Side Avenue",
  //   "propertyNumber":"Fort Lee, NJ 07024",
  //   "price":"13,000",
  //   "area":"280m",
  //   "Beds":3,
  //   "Baths":2,
  //   "Garages":1,
  //   "status":"For Sale"
  // },
  // {
  //   "id":8,
  //   "image":"assets/img/properties/property-04.jpg",
  //   "street":"1821 Pursglove Court",
  //   "propertyNumber":"Dayton, OH 45429",
  //   "price":"189,000",
  //   "area":"30m",
  //   "Beds":1,
  //   "Baths":1,
  //   "Garages":0,
  //   "status":"For Rent"
  // },
  // {
  //   "id":9,
  //   "image":"assets/img/properties/property-07.jpg",
  //   "street":"1380 Sundown Lane",
  //   "propertyNumber":"Austin, TX 78748",
  //   "price":"45,730",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Sale"
  // },
  // {
  //   "id":10,
  //   "image":"assets/img/properties/property-04.jpg",
  //   "street":"4862 Palmer Road",
  //   "propertyNumber":"Worthington, OH 43085",
  //   "price":"38,000",
  //   "area":"280m",
  //   "Beds":3,
  //   "Baths":2,
  //   "Garages":1,
  //   "status":"For Rent"
  // },
  // {
  //   "id":11,
  //   "image":"assets/img/properties/property-11.jpg",
  //   "street":"1453 Calvin Street",
  //   "propertyNumber":"Bel Air, MD 21014",
  //   "price":"103,000",
  //   "area":"30m",
  //   "Beds":1,
  //   "Baths":1,
  //   "Garages":0,
  //   "status":"For Sale"
  // },
  // {
  //   "id":12,
  //   "image":"assets/img/properties/property-10.jpg",
  //   "street":"2323 Park Street",
  //   "propertyNumber":"Martinez, CA 94553",
  //   "price":"9,380",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Rent"
  // },
  // {
  //   "id":13,
  //   "image":"assets/img/properties/property-06.jpg",
  //   "street":"3398 Lodgeville Road",
  //   "propertyNumber":"Golden Valley, MN 55427",
  //   "price":"11,000",
  //   "area":"240m",
  //   "Beds":2,
  //   "Baths":2,
  //   "Garages":0,
  //   "status":"For Rent"
  // },
  // {
  //   "id":14,
  //   "image":"assets/img/properties/property-02.jpg",
  //   "street":"2186 Rinehart Road",
  //   "propertyNumber":"Doral, FL 33178",
  //   "price":"38,000",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Sale"
  // },
  // {
  //   "id":15,
  //   "image":"assets/img/properties/property-03.jpg",
  //   "street":"3705 Brighton Circle Road",
  //   "propertyNumber":"Glenwood, MN 56334",
  //   "price":"325,000",
  //   "area":"240m",
  //   "Beds":3,
  //   "Baths":1,
  //   "Garages":1,
  //   "status":"For Sale"
  // }
  // ];
}