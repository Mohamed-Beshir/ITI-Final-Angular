import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoggedService } from './user-logged.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rentPayments = "http://localhost:8000/api/rent_payments";
  salePayments = "http://localhost:8000/api/sale_payments";

  constructor(private http: HttpClient, private userLoggedService: UserLoggedService) { }

  saveRentPaymentDetails(paymentDetails: any): Observable<any> {
    const userToken = this.userLoggedService.getAccessToken();

    // Create headers with the user token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post<any>(this.rentPayments, paymentDetails, { headers:headers });
  }

  saveSalePaymentDetails(paymentDetails: any): Observable<any> {
    const userToken = this.userLoggedService.getAccessToken();

    // Create headers with the user token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post<any>(this.salePayments, paymentDetails, { headers:headers });
  }
}
