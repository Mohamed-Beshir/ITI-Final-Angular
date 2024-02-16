import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  api : any = "https://retoolapi.dev/cHNZYt/users";

  constructor(private http : HttpClient) {}
  getAllUsers () {
    return this.http.get(this.api);
  }
  saveUserData (data : any) {
    return this.http.post(this.api, data)
  }
}
