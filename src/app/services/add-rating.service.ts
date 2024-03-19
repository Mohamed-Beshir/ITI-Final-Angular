import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddRatingService {
  api: any = 'https://retoolapi.dev/gF5JjY/rating';

  constructor(private http: HttpClient) {}
  getAllRating() {
    return this.http.get(this.api);
  }
  getRating(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }
  createRating(data: any) {
    return this.http.post(this.api, data);
  }
  updateRating(id: string, updateRating: any) {
    return this.http.put(`${this.api}/${id}`, updateRating);
  }

  // deleteRating(id: string) {
  //   return this.http.delete(`${this.api}/${id}`);
  // }
}
