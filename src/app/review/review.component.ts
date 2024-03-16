import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})


  export class ReviewComponent implements OnInit {
    reviews: any[] = [
      { user: 'John Doe', rating: 4, comment: 'Great property!' },
      { user: 'Jane Smith', rating: 5, comment: 'Excellent location.' }
    ];
  
    newReview: any = {
      user: '',
      rating: 1,
      comment: ''
    };
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    submitReview() {
      this.reviews.push(this.newReview);
      this.newReview = {
        user: '',
        rating: 1,
        comment: ''
      };
    }
  }

