import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Offer {
  offer_id: number;
  property_title: string;
  property_image: string;
  offer_for: string;
  lister_name: string;
  buyer_name: string;
  buyer_email: string;
  offer_price: number;

}

@Injectable({
  providedIn: 'root'
})
export class SaleOffersService {

  private apiUrl = 'http://localhost:8000/api/agent';

  constructor(private http: HttpClient) { }

  getAllOffersByListerId(listerId: number): Observable<any[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/${listerId}/offers`);
  }


}
