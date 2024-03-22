import { Component, OnInit } from '@angular/core';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SubmitOfferService } from '../services/submit-offer.service';
import { UserLoggedService } from '../services/user-logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-offered-properties',
  standalone: true,
  imports: [BigFooterComponent, NavbarComponent],
  templateUrl: './user-offered-properties.component.html',
  styleUrl: './user-offered-properties.component.css'
})
export class UserOfferedPropertiesComponent implements OnInit {

  userId: number = 0;
  offers: any[] = [];

  constructor(private offersService : SubmitOfferService, private loggedUser : UserLoggedService, private router: Router){}

  ngOnInit(): void {

    const userData = this.loggedUser.getUserData();
      this.userId = userData ? userData.id : null;

    
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offersService.getOffersByUserId(this.userId)
      .subscribe((data: any) => {
        console.log(data);
        this.offers = data; 
      });
  }

  proceedToPayment(offer:any) {
    this.router.navigate(['/payment'], { queryParams: { offer: JSON.stringify(offer) } });
  }
  
}
