import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {

  api : any = "https://retoolapi.dev/ss42as/properties";

  constructor(private http : HttpClient) {}
  getAllProperty () {
    return this.http.get(this.api);
  }
  savePropertyData (data : any) {
    return this.http.post(this.api, data)
  }
  deletePropertyFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
