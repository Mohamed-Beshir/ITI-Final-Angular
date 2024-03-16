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
  userLogged : any;
  constructor(private loggedUser : UserLoggedService, private router: Router){
    
  }

  ngOnInit(){
  this.loggedUser.getuserLogged().subscribe(res => this.userLogged = res);
}



logout(){
  this.loggedUser.deleteUserLoggedFromApi(this.userLogged[1].id).subscribe(res => res)
  this.router.navigate(['signin']);
}
}
