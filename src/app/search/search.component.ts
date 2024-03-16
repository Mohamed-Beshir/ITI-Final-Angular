import { Component } from '@angular/core';

//

import{FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {faHome, faUmbrella} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
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

}