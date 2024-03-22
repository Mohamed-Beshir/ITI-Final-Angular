import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-line-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './property-line-card.component.html',
  styleUrl: './property-line-card.component.css'
})
export class PropertyLineCardComponent {

@Input() property :any;


}