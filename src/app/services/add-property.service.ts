import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {

  api : any = "https://retoolapi.dev/lsc0k2/properties";

  constructor(private http : HttpClient) {}
  getAllUsers () {
    return this.http.get(this.api);
  }
  saveUserData (data : any) {
    return this.http.post(this.api, data)
  }
}
