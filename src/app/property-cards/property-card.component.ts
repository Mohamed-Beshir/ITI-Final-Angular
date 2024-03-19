import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {

@Input() property :any;


}