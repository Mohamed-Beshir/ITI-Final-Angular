import { RentofferActionsService } from './../services/rentoffer-actions.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { RentOffersService } from '../services/rent-offers.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rent-offers',
  standalone: true,
  imports: [NgFor, NavbarComponent, BigFooterComponent,CommonModule,RouterLink],
  templateUrl: './rent-offers.component.html',
  styleUrl: './rent-offers.component.css'
})
export class RentOffersComponent {
  rentsOffers: any[] = [];
  offerId: number = 0;

  constructor(private rentOffersService: RentOffersService, private RentofferActionsService: RentofferActionsService) { }

  ngOnInit(): void {
    this.getRentOffers();
  }

  getRentOffers(): void {
    this.rentOffersService.getRentOffers()
      .subscribe((data: any) => {
        this.rentsOffers = data.rentsOffers;
      });
  }

  acceptOffer(offerId: number): void {
    this.RentofferActionsService.acceptOffer(offerId).subscribe({
      next: response => {
        console.log('Offer accepted successfully:', response);
        // Handle success response
      },
      error: error => {
        console.error('Error accepting offer:', error);
        // Handle error response
      }
    });
  }

  rejectOffer(offerId: number): void {
    this.RentofferActionsService.rejectOffer(offerId).subscribe({
      next: response => {
        console.log('Offer rejected successfully:', response);
        // Handle success response
      },
      error: error => {
        console.error('Error rejecting offer:', error);
        // Handle error response
      }
    });
  }

}
