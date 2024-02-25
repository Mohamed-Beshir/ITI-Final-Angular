import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {

  api : any = "https://retoolapi.dev/MyBVCy/properties";

  constructor(private http : HttpClient) {}
  getAllProperty () {
    return this.http.get(this.api);
  }
  getOneProperty (id : number) {
    return this.http.get(`${this.api}/${id}`);
  }
  savePropertyData (data : any) {
    return this.http.post(this.api, data)
  }
  updateProperty(id: number, updatedProperty: any) {
    return this.http.put(`${this.api}/${id}`, updatedProperty);
  }
  deletePropertyFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
