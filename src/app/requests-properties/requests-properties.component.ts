import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { RequestPropertyService } from '../services/request-property.service';

@Component({
  selector: 'app-requests-properties',
  standalone: true,
  imports: [NgFor, NavbarComponent, BigFooterComponent],
  templateUrl: './requests-properties.component.html',
  styleUrl: './requests-properties.component.css'
})
export class RequestsPropertiesComponent {
  requests : any;
  constructor(private requestProperty : RequestPropertyService){}
  ngOnInit() {
    this.requestProperty.getAllRequests().subscribe(res=> this.requests = res)
  }
  deleteRequest(id : number){
    this.requestProperty.deleteRequest(id).subscribe(()=> {
      this.requests = this.requests.filter((item : any) => item.id !== id);
    })
    this.ngOnInit()
  }
}
