import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-searchbox',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './searchbox.component.html',
  styleUrl: './searchbox.component.css'
})
export class SearchboxComponent implements OnInit {
  cities: string[] | undefined;
  districts: string[] | undefined;
  propertyTypes: string[] | undefined;
  prices: string[] | undefined;
  paymentMethods: string[] | undefined;
  rentalPrices: string[] | undefined;
  rentalPeriods: string[] | undefined;

  ngOnInit() {
    this.cities = ['Cairo', 'Alexandria', 'Giza', 'Beni Suef', 'Beheira'];
    this.districts = ['Maadi', 'Zamalek', 'Sidi Gaber', 'Dokki', 'Downtown'];
    this.propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Chalet', 'Duplex', 'Full Floor', 'Half Floor', 'Whole Building','Land', 'Hotel Apartment','Cabin','Palace','Roof'];
    this.prices = ['LE 10,000 +', 'LE 50,000 +', 'LE 100,000 +', 'LE 500,000 +', 'LE 1,000,000 +', 'LE 5,000,000 +'];
    this.paymentMethods = ['Cash', 'Installments', 'All'];
    this.rentalPeriods = ['Monthly', 'Daily'];
    this.rentalPrices = ['LE 500 +', 'LE 2,000 +', 'LE 5,000 +', 'LE 15,000 +', 'LE 50,000 +', 'LE 200,000 +', 'LE 1,000,000 +'];
  }
}
