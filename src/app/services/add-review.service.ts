import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AddReviewService {
  private apiUrl = 'http://localhost:8000/api/reviews';

  constructor(private http: HttpClient) {}

  getAllReviews() {
    return this.http.get(this.apiUrl);
  }

  getReviewById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createReview(reviewData: any) {
    return this.http.post(this.apiUrl, reviewData);
  }

  updateReview(id: string, updatedReview: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedReview);
  }

  deleteReview(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
