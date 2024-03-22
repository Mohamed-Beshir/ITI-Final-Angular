import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoggedService } from './user-logged.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient, private userLoggedService: UserLoggedService) {}

  dashboardUrl = "http://localhost:8000/api/admin";
  rentOffersUrl = "http://localhost:8000/api/admin/rent-offers";
  saleOffersUrl = "http://localhost:8000/api/admin/sale-offers";
  paymentsUrl = "http://localhost:8000/api/admin/payments";
  usersUrl = "http://localhost:8000/api/admin/users";


  getDashboardData(): Observable<any> {
    // Get the admin token from local storage
    const adminToken = this.userLoggedService.getAdminToken();

    // Create headers with the admin token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`
    });

    // Include headers in the HTTP request
    return this.http.get<any>(this.dashboardUrl, { headers: headers }); 
  }

  getRentOffers(): Observable<any> {
    // Get the admin token from local storage
    const adminToken = this.userLoggedService.getAdminToken();

    // Create headers with the admin token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`
    });

    // Include headers in the HTTP request
    return this.http.get<any>(this.rentOffersUrl, { headers: headers }); 
  }

  getSaleOffers(): Observable<any> {
    // Get the admin token from local storage
    const adminToken = this.userLoggedService.getAdminToken();

    // Create headers with the admin token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`
    });

    // Include headers in the HTTP request
    return this.http.get<any>(this.saleOffersUrl, { headers: headers }); 
  }

  getPayments(): Observable<any> {
    // Get the admin token from local storage
    const adminToken = this.userLoggedService.getAdminToken();

    // Create headers with the admin token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`
    });

    // Include headers in the HTTP request
    return this.http.get<any>(this.paymentsUrl, { headers: headers }); 
  }

  getUsers(): Observable<any> {
    // Get the admin token from local storage
    const adminToken = this.userLoggedService.getAdminToken();

    // Create headers with the admin token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`
    });

    // Include headers in the HTTP request
    return this.http.get<any>(this.usersUrl, { headers: headers }); 
  }

  deleteUser(userId: number): Observable<any> {
    // Get the admin token from local storage
    const adminToken = this.userLoggedService.getAdminToken();

    // Create headers with the admin token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`
    });
    
    return this.http.delete<any>(`http://localhost:8000/api/admin/users/${userId}`, { headers: headers });
  }
}
