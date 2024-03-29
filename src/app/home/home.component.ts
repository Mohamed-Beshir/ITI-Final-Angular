import { Component } from '@angular/core';
import { SearchboxComponent } from '../searchbox/searchbox.component';
import { SliderComponent } from '../slider/slider.component';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { faFolder, faUsers, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { PropertyAdComponent } from '../property-ad/property-ad.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { PropertyCardComponent } from '../property-cards/property-card.component';
import { AddPropertyService } from '../services/add-property.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, BigFooterComponent, SliderComponent, SearchboxComponent, ServiceCardComponent, PropertyCardComponent, PropertyAdComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'ITI-Final-Angular';
  services = [
    { title: 'Wide Range of Properties', description: 'Discover a diverse selection of properties tailored to your unique needs, ensuring you find the perfect home.', icon: faFolder },
    { title: '14 Agents for Your Service', description: 'Our team is committed to guiding you through every real estate transaction with expertise and personalized service.', icon: faUsers },
    { title: 'Best Price Guarantee!', description: 'Real estate deals at unbeatable prices, ensuring your investment brings optimal value and savings.', icon: faMoneyBill }
  ];
  // priceDropProperties = [{id : 1},{id : 2},{id : 3},{id : 4}];
  // newProperties = [{id : 1},{id : 2},{id : 3},{id : 4},{id : 5},{id : 6},{id : 7},{id : 8}];

  propertiesHome : any;
  constructor(private properties : AddPropertyService){}
  ngOnInit(){
    this.properties.getAllProperty().subscribe(res => this.propertiesHome = res);
  }
}