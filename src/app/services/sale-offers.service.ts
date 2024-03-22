import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleOffersService {

  private apiUrl = 'http://localhost:8000/api/sale_offers';

  constructor(private http: HttpClient) { }

  getSaleOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
