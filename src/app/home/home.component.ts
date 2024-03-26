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
    { title: 'Wide Range of Properties', description: 'Discover a diverse selection of properties tailored to your needs, ensuring you find the perfect home.', icon: faFolder },
    { title: '14 Agents for Your Service', description: 'Our team is committed to guiding you in every real estate transaction with expertise and personalized service.', icon: faUsers },
    { title: 'Best Price Guarantee!', description: 'Real estate deals at unbeatable prices, ensuring your investment brings optimal value and savings.', icon: faMoneyBill }
  ];

  propertiesHome: any;
  priceDropProperties: any[] = [];

  constructor(private properties: AddPropertyService) { }
  ngOnInit() {
    this.properties.getAllProperty().subscribe(res => {
      this.propertiesHome = res;
      this.findPriceDropProperties();
    });
  }

  findPriceDropProperties() {
    this.propertiesHome.forEach((property:any) => {
      if (property.old_price && property.old_price > property.price) {
        this.priceDropProperties.push(property);
      }
    });
  }
}