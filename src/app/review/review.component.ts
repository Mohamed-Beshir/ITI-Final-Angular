import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddReviewService } from '../services/add-review.service';



@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})


export class ReviewComponent implements OnInit {
  reviews: any[] = [
    { user: 'John Doe', rating: 4, comment: 'Great property!' },
    { user: 'Jane Smith', rating: 5, comment: 'Excellent location.' },
  ];

  newReview: any = {
    user_id: '',
    property_id:'',
    rating: 1,
    comment: '',
  };

  constructor(private addReviewService: AddReviewService) {}

  ngOnInit(): void {}

  submitReview() {
    this.addReviewService.createReview(this.newReview).subscribe(
      (response: any) => {
        console.log('Review submitted successfully:', response);
        // Optionally, update the UI to reflect the newly added review
      },
      (error: any) => {
        console.error('Failed to submit review:', error);
      }
    );

    // Reset the newReview object
    this.newReview = {
      user_id: '',
      property_id:'',
      rating: 1,
      comment: '',
    };
  }
}
