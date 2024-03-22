import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  api: any = 'http://localhost:8000/api/reviews';

  constructor(private http: HttpClient) {}

  getAllComment(property_id : number) {
    return this.http.get(`${this.api}-comments?property_id=${property_id}`);
  }

  getAllRating(property_id : number) {
    return this.http.get(`${this.api}-rates?property_id=${property_id}`);
  }
  createReview(data: any) {
    return this.http.post(this.api, data);
  }
  updateReview(id: number, updateReview: any) {
    return this.http.put(`${this.api}/${id}`, updateReview);
  }
  deleteReview(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
