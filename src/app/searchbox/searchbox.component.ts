import { Component} from '@angular/core';
// import { DropdownModule } from 'primeng/dropdown';
import { AddPropertyService } from '../services/add-property.service';
import { FormsModule} from '@angular/forms';
import { NavigationExtras, Route, Router } from '@angular/router';


@Component({
  selector: 'app-searchbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbox.component.html',
  styleUrl: './searchbox.component.css'
})
export class SearchboxComponent  {
  
  constructor(private propertyService: AddPropertyService, private route: Router) { }

  search(status : string, period : string, city : string, district : string, propertyType : string, area : string, beds : string, baths : string, price : string): void {
    this.propertyService.searchProperties(city, district, propertyType, status, area, beds, baths, price, period)
      .subscribe(data => {
        // this.properties = data;
        // console.log(this.properties)
        const queryParams: any = {};
        queryParams.myArray = JSON.stringify(data);
        const navigationExtras: NavigationExtras = {
          queryParams
        };
        this.route.navigate(['property-listing'] , navigationExtras );
      });
  }
}
