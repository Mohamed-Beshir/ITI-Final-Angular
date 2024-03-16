import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddPropertyService } from '../services/add-property.service';
import { RouterLink } from '@angular/router';
import { RequestPropertyService } from '../services/request-property.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  dataForProperties : any;
  dataForRequests : any;

  constructor(private propertiesData : AddPropertyService, private requestsData : RequestPropertyService){}

  ngOnInit(){
    this.propertiesData.getAllProperty().subscribe(res=> this.dataForProperties = res)
    this.requestsData.getAllRequests().subscribe(res=> this.dataForRequests = res)
  }
}
