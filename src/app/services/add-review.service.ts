import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddReviewService {
  api: any = 'https://retoolapi.dev/LToEEu/review';

  constructor(private http: HttpClient) {}

  getAllReview() {
    return this.http.get(this.api);
  }
  getReview(id: string) {
    return this.http.get(`${this.api}${id}`);
  }
  createReview(data: any) {
    return this.http.post(this.api, data);
  }
  updateReview(id: string, updateReview: any) {
    return this.http.put(`${this.api}/${id}`, updateReview);
  }
  deleteReview(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
