import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {

  api : any = "http://localhost:8000/api/properties";

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

  searchProperties(city: string, district: string, propertyType: string, status : string, area : string, beds : string, baths : string, price : string){
    let params = new HttpParams();
    if (city) params = params.set('city', city);
    if (district) params = params.set('district', district);
    if (propertyType) params = params.set('propertyType', propertyType);
    if (status) params = params.set('status', status);
    if (area) params = params.set('area', area);
    if (beds) params = params.set('beds', beds);
    if (baths) params = params.set('baths', baths);
    if (price) params = params.set('price', price);
    return this.http.get(`${this.api}-search`, { params });
  }

  getAllPropertyOrderBy(orderBy: string) {
    return this.http.get(`${this.api}?order_by=${orderBy}`);
  }
  
  getAllPropertyRentOrSale (status: string) {
    return this.http.get(`${this.api}-rent-or-sale?status=${status}`);
  }
  getAllPropertyRentOrSaleOrderBy(status: string, orderBy: string) {
    return this.http.get(`${this.api}-rent-or-sale?status=${status}&order_by=${orderBy}`);
  }
}
