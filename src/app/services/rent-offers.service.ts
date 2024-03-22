import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentOffersService {
  
  private apiUrl = 'http://localhost:8000/api/rent_offers';

  constructor(private http: HttpClient) { }

  getRentOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
