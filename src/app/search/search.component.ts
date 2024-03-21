import { Component, Input } from '@angular/core';

//

import{FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {faHome, faUmbrella} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { AddPropertyService } from '../services/add-property.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgIf } from '@angular/common';
// import { MatSliderModule } from '@angular/material/slider';
// import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  a1=''
  umbrela=faUmbrella;
  home=faHome;
  arrow=faAngleRight;
  arrowdown=faAngleDown;

  @Input() dataStatus : string | null = null;

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
        if(!this.dataStatus){
          this.route.navigateByUrl('').then(()=>{
            this.route.navigate(['property-listing'] , navigationExtras );
          })
        }else {
          if(status == 'for_sale'){
            this.route.navigateByUrl('').then(()=>{
              this.route.navigate(['property-sale'] , navigationExtras );
            })
          }else{
            this.route.navigateByUrl('').then(()=>{
              this.route.navigate(['property-rent'] , navigationExtras );
            })
          }
        }
      });
  }

}
