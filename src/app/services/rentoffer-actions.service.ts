import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentofferActionsService {
  private apiUrl = 'http://localhost:8000/api/rentoffers';

  constructor(private http: HttpClient) { }

  acceptOffer(offerId: number): Observable<any> {
    const url = `${this.apiUrl}/accept/${offerId}`;
    return this.http.put<any>(url, {});
  }

  rejectOffer(offerId: number): Observable<any> {
    const url = `${this.apiUrl}/reject/${offerId}`;
    return this.http.put<any>(url, {});
  }
}
