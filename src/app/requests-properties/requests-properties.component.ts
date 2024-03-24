import { RentofferActionsService } from './../services/rentoffer-actions.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { RequestPropertyService } from '../services/request-property.service';
import { SaleOffersService } from '../services/sale-offers.service';
import { OfferActionsService } from '../services/offer-actions.service';
import { Router, RouterLink } from '@angular/router';

interface Offer {
  offer_id: number;
  property_title: string;
  property_image: string;
  offer_for: string;
  lister_name: string;
  buyer_name: string;
  buyer_email: string;
  offer_price: number;
  offer_message: string;
  offer_status: string;
}



@Component({
  selector: 'app-requests-properties',
  standalone: true,
  imports: [NgFor, NavbarComponent, BigFooterComponent,RouterLink,CommonModule,],
  templateUrl: './requests-properties.component.html',
  styleUrl: './requests-properties.component.css'
})
export class RequestsPropertiesComponent implements OnInit {
  offers: Offer[] = [];
  userId: number=0;

  constructor(private dataService: SaleOffersService, private offerActionsService: OfferActionsService, private rentofferActionsService: RentofferActionsService, private router : Router) { }

  ngOnInit(): void {
    // Retrieve user ID from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data') ?? '0');
    this.userId = userData ? userData.id : null;

    // Fetch offers data using the user ID
    if (this.userId) {
      this.dataService.getAllOffersByListerId(this.userId)
        .subscribe((offers: Offer[]) => {
          this.offers = offers;
        });
    }
  }

  acceptOffer(offerId: number, offerFor: string): void {
    if (offerFor === 'Sale') {
      this.offerActionsService.acceptOffer(offerId).subscribe({
        next: response => {
          console.log('Sale offer accepted successfully:', response);
          // Handle success response
        },
        error: error => {
          console.error('Error accepting sale offer:', error);
          // Handle error response
        }
      });
    } else if (offerFor === 'Rent') {
      this.rentofferActionsService.acceptOffer(offerId).subscribe({
        next: response => {
          console.log('Rent offer accepted successfully:', response);
          // Handle success response
          this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/requests']);
          });
      },
      error: error => {
        console.error('Error accepting offer:', error);
        // Handle error response
      }
    });
  } else {
    console.error('Invalid offer type:', offerFor);
  }
  }

  rejectOffer(offerId: number, offerFor: string): void {
    if (offerFor === 'Sale') {
      this.offerActionsService.rejectOffer(offerId).subscribe({
        next: response => {
          console.log('Sale offer rejected successfully:', response);
          // Handle success response
        },
        error: error => {
          console.error('Error rejecting sale offer:', error);
          // Handle error response
        }
      });
    } else if (offerFor === 'Rent') {
      this.rentofferActionsService.rejectOffer(offerId).subscribe({
        next: response => {
          console.log('Rent offer rejected successfully:', response);
          // Handle success response
          this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/requests']);
          });
      },
      error: error => {
        console.error('Error rejecting offer:', error);
        // Handle error response
      }
    });
  } else {
    console.error('Invalid offer type:', offerFor);
  }
  }

}
