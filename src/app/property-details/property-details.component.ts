import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { ActivatedRoute } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RatingModule, FormsModule, NavbarComponent, BigFooterComponent, PropertyCardComponent, NgIf],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent {
  id?: any;
  property : any;
  constructor(private route: ActivatedRoute, private property_details : AddPropertyService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.property_details.getOneProperty(this.id).subscribe(data => this.property = data)
  }

  userValue!: number;
  overallValue: number = 4;
  similarProperties = [{id : 1},{id : 2},{id : 3}];
}
