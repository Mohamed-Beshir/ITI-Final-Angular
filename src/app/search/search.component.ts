import { Component } from '@angular/core';

//

import{FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {faHome, faUmbrella} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { AddPropertyService } from '../services/add-property.service';
import { NavigationExtras, Router } from '@angular/router';
// import { MatSliderModule } from '@angular/material/slider';
// import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  a1=''
  umbrela=faUmbrella;
  home=faHome;
  arrow=faAngleRight;
  arrowdown=faAngleDown;

  constructor(private propertyService: AddPropertyService, private route: Router) { }

  search(status : string, city : string, district : string, propertyType : string, area : string, beds : string, baths : string, price : string): void {
    this.propertyService.searchProperties(city, district, propertyType, status, area, beds, baths, price)
      .subscribe(data => {
        // this.properties = data;
        // console.log(this.properties)
        const queryParams: any = {};
        queryParams.myArray = JSON.stringify(data);
        const navigationExtras: NavigationExtras = {
          queryParams
        };
        this.route.navigateByUrl('').then(()=>{
          this.route.navigate(['property-listing'] , navigationExtras );
        })
      });
  }

}
