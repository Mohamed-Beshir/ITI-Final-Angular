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
  // cities: string[] | undefined;
  // districts: string[] | undefined;
  // propertyTypes: string[] | undefined;
  // prices: string[] | undefined;
  // paymentMethods: string[] | undefined;
  // rentalPrices: string[] | undefined;
  // rentalPeriods: string[] | undefined;

  // ngOnInit() {
    // this.cities = ['Cairo', 'Alexandria', 'Giza', 'Beni Suef', 'Beheira'];
    // this.districts = ['Maadi', 'Zamalek', 'Sidi Gaber', 'Dokki', 'Downtown'];
    // this.propertyTypes = ['Apartment', 'Condominium', 'Cottage', 'Flat', 'House'];
    // this.prices = ['LE 10,000 +', 'LE 50,000 +', 'LE 100,000 +', 'LE 500,000 +', 'LE 1,000,000 +', 'LE 5,000,000 +'];
    // this.paymentMethods = ['Cash', 'Installments', 'All'];
    // this.rentalPeriods = ['Monthly', 'Daily'];
    // this.rentalPrices = ['LE 500 +', 'LE 2,000 +', 'LE 5,000 +', 'LE 15,000 +', 'LE 50,000 +', 'LE 200,000 +', 'LE 1,000,000 +'];
  // }


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
        this.route.navigate(['property-listing'] , navigationExtras );
      });
  }
}
