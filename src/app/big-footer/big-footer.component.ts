import { Component } from '@angular/core';
import { AddPropertyService } from '../services/add-property.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-big-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './big-footer.component.html',
  styleUrl: './big-footer.component.css'
})
export class BigFooterComponent {

  propertiesFooter : any;
  constructor(private properties : AddPropertyService){}
  ngOnInit(){
    this.properties.getAllProperty().subscribe(res => this.propertiesFooter = res);
  }

}
