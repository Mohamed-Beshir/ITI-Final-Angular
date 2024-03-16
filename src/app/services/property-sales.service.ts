import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertySalesService {

  api : any = "http://localhost:8000/api/property_sales";

  constructor(private http : HttpClient) {}
  getAllProperty_sales () {
    return this.http.get(this.api);
  }
  getOneProperty_sales (id : number) {
    return this.http.get(`${this.api}/${id}`);
  }
  saveProperty_salesData (data : any) {
    return this.http.post(this.api, data)
  }
  updateProperty_sales(id: number, updatedProperty_sales: any) {
    return this.http.put(`${this.api}/${id}`, updatedProperty_sales);
  }
  deleteProperty_salesFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
