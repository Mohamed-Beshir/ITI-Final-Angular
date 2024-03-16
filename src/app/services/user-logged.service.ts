import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  api : any = "https://retoolapi.dev/guv7ZQ/user_logged";

  constructor(private http : HttpClient) { }
  getuserLogged () {
    return this.http.get(this.api);
  }
  saveUserLoggedData (data : any) {
    return this.http.post(this.api, data)
  }
  deleteUserLoggedFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
