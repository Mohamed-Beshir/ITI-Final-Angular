import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../services/user-logged.service';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './admin-payments.component.html',
  styleUrl: './admin-payments.component.css'
})
export class AdminPaymentsComponent implements OnInit {

  paymentsData: any = [];

  constructor(private loggedUser : UserLoggedService, private router: Router, private admin : AdminService){
  }

  ngOnInit(): void {
    this.fetchPayments(); // Call the function to fetch rent offers when the component initializes
  }

  fetchPayments(): void {
    this.admin.getPayments()
      .subscribe((data: any[]) => {
        this.paymentsData = data; // Assign the fetched rent offers data to the class variable
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
