import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoggedService } from './user-logged.service';

@Injectable({
  providedIn: 'root'
})
export class SubmitOfferService {

  constructor(private http : HttpClient, private userLoggedService: UserLoggedService) {}

  rentOffers = "http://localhost:8000/api/rent_offers";
  saleOffers = "http://localhost:8000/api/sale_offers";

  submitRentOffer (data : any) {
    const userToken = this.userLoggedService.getAccessToken();

    // Create headers with the user token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post(this.rentOffers, data, { headers: headers })
  }

  submitSaleOffer (data : any) {
    const userToken = this.userLoggedService.getAccessToken();

    // Create headers with the user token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post(this.saleOffers, data, { headers: headers })
  }

  getAllSaleOffers (){
    const userToken = this.userLoggedService.getAccessToken();

    // Create headers with the user token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.get(this.saleOffers, { headers: headers })
  }

  getAllRentOffers (){
    const userToken = this.userLoggedService.getAccessToken();

    // Create headers with the user token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.get(this.rentOffers, { headers: headers })
  }

  getOffersByUserId(userId: number) {
    const userToken = this.userLoggedService.getAccessToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.get(`http://localhost:8000/api/users/${userId}/offers`, { headers: headers });
  }
}
