import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = 'http://localhost:8000/api/users'; // Assuming your API URL

  constructor(private   http: HttpClient) { }

  getUserData(userId: number): Observable<any> {
    // Append user ID to API URL
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  updateUserData(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, userData);
  }
}
