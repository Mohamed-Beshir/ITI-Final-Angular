import { CommonModule, NgFor } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { RequestPropertyService } from '../services/request-property.service';
import { SaleOffersService } from '../services/sale-offers.service';
import { OfferActionsService } from '../services/offer-actions.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-requests-properties',
  standalone: true,
  imports: [NgFor, NavbarComponent, BigFooterComponent,RouterLink,CommonModule],
  templateUrl: './requests-properties.component.html',
  styleUrl: './requests-properties.component.css'
})
export class RequestsPropertiesComponent implements OnInit {
 salesOffers: any[] = [];
  offerId: number=0;

  constructor(private saleOffersService: SaleOffersService,private offerActionsService: OfferActionsService) { }

  ngOnInit(): void {
    this.getSaleOffers();
  }

  getSaleOffers(): void {
    this.saleOffersService.getSaleOffers()
      .subscribe((data: any) => {
        this.salesOffers = data.salesOffers;
      });
  }


  acceptOffer(offerId: number): void {
    this.offerActionsService.acceptOffer(offerId).subscribe({
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
    this.offerActionsService.rejectOffer(offerId).subscribe({
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
