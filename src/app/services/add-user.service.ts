import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  api = "http://localhost:8000/api/users";
  register = "http://localhost:8000/api/register";
  login = "http://localhost:8000/api/login";

  constructor(private http : HttpClient) {}
  getAllUsers () {
    return this.http.get(this.api);
  }
  saveUserData (data : any) {
    return this.http.post(this.register, data)
  }
  loginUser (data : any) {
    return this.http.post(this.login, data)
  }
}
