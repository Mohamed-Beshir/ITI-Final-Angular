import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-property-ad',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './property-ad.component.html',
  styleUrl: './property-ad.component.css'
})
export class PropertyAdComponent {
  faPlusSquare = faSquarePlus;
}
