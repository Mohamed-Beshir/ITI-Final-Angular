// update-comment-modal.component.ts

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from '../review/review.component';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-update-comment-modal',
  templateUrl: './update-comment-modal.component.html',
  styleUrls: ['./update-comment-modal.component.css']
})
export class UpdateCommentModalComponent {
  @Input() commentId: number = 0;
  @Input() initialComment: string = '';

  @Input() existingComment: string = '';
  updatedComment: string = '';

  @Output() updateCommentEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private comment : ReviewService) {}

  closeModal() {
    // Clear the updated comment and close the modal
    this.updatedComment = '';
    // Emit an event to notify the parent component (optional)
    // You can remove this line if you're not using the event emitter
    this.updateCommentEvent.emit('');
  }

  updateComment(updatedComment : string) {
    if (this.commentId && this.updatedComment) {
      // Here, you might perform additional validation or processing before emitting the updated comment
      this.comment.updateReview(this.commentId, updatedComment).subscribe();

      // Optionally, you can close the modal or perform other actions
    }
  }
}


@NgModule({
  declarations: [UpdateCommentModalComponent],
  imports: [
    CommonModule,
    FormsModule // Make sure FormsModule is imported here
  ],
  exports: [UpdateCommentModalComponent]
})
export class UpdateCommentModalModule { }
