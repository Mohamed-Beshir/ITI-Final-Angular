import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../services/user-logged.service';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  dashboardData: any = [];

  constructor(private loggedUser : UserLoggedService, private router: Router, private admin : AdminService){
  }

  ngOnInit(){
    this.fetchDashboardData();
  }

  fetchDashboardData() :void{
    this.admin.getDashboardData()
    .subscribe(data => {
      this.dashboardData = data;
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
