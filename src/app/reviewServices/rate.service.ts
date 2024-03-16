import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  api : any = "https://retoolapi.dev/vm0l58/rate";

  constructor(private http : HttpClient) {}
  getAllRate () {
    return this.http.get(this.api);
  }
  getOneRate (id : number) {
    return this.http.get(`${this.api}/${id}`);
  }
  saveRateData (data : any) {
    return this.http.post(this.api, data)
  }
  updateRate(id: number, updatedRate: any) {
    return this.http.put(`${this.api}/${id}`, updatedRate);
  }
  deleteRateFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
