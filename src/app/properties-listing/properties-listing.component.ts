import { Component } from '@angular/core';
import {PropertyCardComponent} from "../property-cards/property-card.component"

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


@Component({
  selector: 'app-properties-listing',
  standalone: true,
  imports: [PropertyCardComponent,FontAwesomeModule
            ,FormsModule
            ,SearchComponent
            ,NavbarComponent
            ,BigFooterComponent
            ,SmallFooterComponent
            ,RouterLink

            ],
  templateUrl: './properties-listing.component.html',
  styleUrl: './properties-listing.component.css'
})
export class PropertiesListingComponent {
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
  this.apiService.getAllProperty().subscribe((data) => {
    this.data = data;
  });
}


sort (order_by : string) {
  console.log(order_by)
  this.apiService.getAllPropertyOrderBy(order_by)
      .subscribe(data => {
        this.data = data;
  })
}



itemsPerPage = 12; // Number of items to show per page
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
}