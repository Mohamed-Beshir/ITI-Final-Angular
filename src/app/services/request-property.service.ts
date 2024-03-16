import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestPropertyService {

  api : any = "https://retoolapi.dev/qYfTXS/requests";

  constructor(private http : HttpClient) {}
  getAllRequests () {
    return this.http.get(this.api);
  }
  saveRequests (data : any) {
    return this.http.post(this.api, data)
  }
  deleteRequest (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
