import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Property_RentsService {

  api : any = "http://localhost:8000/api/property_rents";

  constructor(private http : HttpClient) {}
  getAllProperty_rents () {
    return this.http.get(this.api);
  }
  getOneProperty_rents (id : number) {
    return this.http.get(`${this.api}/${id}`);
  }
  saveProperty_rentsData (data : any) {
    return this.http.post(this.api, data)
  }
  updateProperty_rents(id: number, updatedProperty_rents: any) {
    return this.http.put(`${this.api}/${id}`, updatedProperty_rents);
  }
  deleteProperty_rentsFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
