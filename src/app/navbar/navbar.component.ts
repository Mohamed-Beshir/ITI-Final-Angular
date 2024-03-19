import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserLoggedService } from '../services/user-logged.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  userName: string | null = null;

  constructor(private loggedUser : UserLoggedService, private router: Router){
  }

  ngOnInit(){
    // Check if user is logged in
    this.isLoggedIn = this.loggedUser.isLoggedIn();
    
    // Retrieve user data if user is logged in
    if (this.isLoggedIn) {
      const userData = this.loggedUser.getUserData();
      this.userRole = userData ? userData.role : null;
      this.userName = userData ? userData.name : null;
    }
  }

  logout(){
    this.loggedUser.logout();
    this.router.navigate(['signin']);
  }
}