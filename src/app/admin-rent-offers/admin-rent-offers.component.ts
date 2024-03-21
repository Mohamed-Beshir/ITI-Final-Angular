import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../services/user-logged.service';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-rent-offers',
  standalone: true,
  imports: [NgClass, RouterLink,NgFor],
  templateUrl: './admin-rent-offers.component.html',
  styleUrl: './admin-rent-offers.component.css'
})
export class AdminRentOffersComponent implements OnInit {
  rentOffers: any[] = [];

  constructor(private loggedUser : UserLoggedService, private router: Router, private admin : AdminService){
  }

  ngOnInit(): void {
    this.fetchRentOffers(); // Call the function to fetch rent offers when the component initializes
  }

  fetchRentOffers(): void {
    this.admin.getRentOffers()
      .subscribe((data: any[]) => {
        this.rentOffers = data; // Assign the fetched rent offers data to the class variable
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
