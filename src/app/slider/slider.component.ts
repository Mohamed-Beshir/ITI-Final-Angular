import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  propertiesSlider : any;
  constructor(private properties : AddPropertyService){}
  ngOnInit(){
    this.properties.getAllProperty().subscribe(res => this.propertiesSlider = res);
  }

}
