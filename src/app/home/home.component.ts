import { Component } from '@angular/core';
import { HomePageSliderComponent } from '../home-page-slider/home-page-slider.component';
import { AdvancedSearchComponent } from '../advanced-search/advanced-search.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HomePageSliderComponent, AdvancedSearchComponent, ServiceCardComponent, PropertyCardComponent, BigFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  services = [
    { id: 1, name: 'service1' },
    { id: 2, name: 'service2' },
    { id: 3, name: 'service3' },
  ];
  priceDropProperties = [
    { id: 1, name: 'property1' },
    { id: 2, name: 'property2' },
    { id: 3, name: 'property3' },
    { id: 4, name: 'property4' },
  ];
  newProperties = [
    { id: 1, name: 'property1' },
    { id: 2, name: 'property2' },
    { id: 3, name: 'property3' },
    { id: 4, name: 'property4' },
    { id: 5, name: 'property5' },
    { id: 6, name: 'property6' },
    { id: 7, name: 'property7' },
    { id: 8, name: 'property8' },
  ];
}
