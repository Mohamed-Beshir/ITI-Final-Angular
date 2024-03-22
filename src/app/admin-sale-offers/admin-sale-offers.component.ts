import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../services/user-logged.service';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sale-offers',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink],
  templateUrl: './admin-sale-offers.component.html',
  styleUrl: './admin-sale-offers.component.css'
})
export class AdminSaleOffersComponent implements OnInit {
  saleOffers: any[] = [];

  constructor(private loggedUser : UserLoggedService, private router: Router, private admin : AdminService){
  }

  ngOnInit(): void {
    this.fetchSaleOffers(); // Call the function to fetch rent offers when the component initializes
  }

  fetchSaleOffers(): void {
    this.admin.getSaleOffers()
      .subscribe((data: any[]) => {
        this.saleOffers = data; // Assign the fetched rent offers data to the class variable
      });
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  logout(){
    this.loggedUser.logout();
    this.router.navigate(['signin']);
  }
}
