import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';
import { NgFor, NgIf } from '@angular/common';
import { UserLoggedService } from '../services/user-logged.service';
import { RequestPropertyService } from '../services/request-property.service';
import { ReviewComponent } from '../review/review.component';
import { RatingPipe } from '../pipe/rating.pipe';
import { ReviewService } from '../services/review.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCommentModalComponent } from '../update-comment-modal/update-comment-modal.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RatingModule, FormsModule, NavbarComponent, BigFooterComponent, NgIf, ReviewComponent, FormsModule, ReactiveFormsModule, RatingPipe, NgFor, ButtonModule, ToastModule, ConfirmDialogModule, RouterLink, RouterModule],
  templateUrl: './property-details.component.html',
  providers: [ConfirmationService, MessageService, RouterLink],
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent implements OnInit{
  id?: any;
  property : any;
  userLogged : any;
  requestProperty : any;
  resultRequest : boolean = false;


  userLoggedData : any = [];

  registerForm: FormGroup;
  commentForm : any;
  rateForm : any;
  constructor(private route: ActivatedRoute, private property_details : AddPropertyService, private user_logged : UserLoggedService, private request : RequestPropertyService,  private formBuilder: FormBuilder, private review : ReviewService, private router : Router, private modalService: NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.registerForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      rate: new FormControl('', [
        Validators.required,
      ]),
    });
    this.commentForm = this.registerForm.controls['comment']
    this.rateForm = this.registerForm.controls['rate']
    

  }


  rating : any = [];
  sumOfRates : number = 0;
  numberOfRating : number = 0;
  finalRatingForProperty : number = 0;


  reviewData : any;
  commentsForThisProperty : any = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.property_details.getOneProperty(this.id).subscribe(data => this.property = data);

    this.request.getAllRequests().subscribe(res => {
      this.requestProperty = res;
      
      for(let i = 0; i < this.requestProperty.length; i++){
          if(this.requestProperty[i].user_id == this.userLogged[this.userLogged.length -1].id && this.requestProperty[i].property_id == this.id ){
            this.resultRequest = true;
          }
      }
    });


    let userDataString = localStorage.getItem('user_data');
    // Check if user data exists in localStorage
    if (userDataString) {
      // Convert the JSON string to an object
      this.userLoggedData = JSON.parse(userDataString);
    }

    this.review.getAllComment(this.id).subscribe(res => {
      this.reviewData = res;
    })

    this.review.getAllRating(this.id).subscribe(res => {
      this.rating = res;
      if(this.rating.rowCount){
        this.finalRatingForProperty = this.rating.sumOfRates / this.rating.rowCount;
      }
    })
    
    
  }

isRequested : boolean = true;
  sendRequest(property_id : number){
    let currentDate = new Date()
    let newRequest : any = {
      user_id: this.userLogged[this.userLogged.length - 1].id,
      user_name : this.userLogged[this.userLogged.length - 1].name,
      user_email : this.userLogged[this.userLogged.length - 1].email,
      property_id : property_id,
      request_date: currentDate.getDate()+"."+currentDate.getMonth()+"."+currentDate.getFullYear(),
      is_approve: false
    }

    for(let i = 0; i < this.requestProperty.length; i++){
      if(this.requestProperty[i].user_id == this.userLogged[this.userLogged.length -1].id && this.requestProperty[i].property_id == this.id ){
        this.resultRequest = true;
      }
    }
    if(!this.resultRequest){
      this.request.saveRequests(newRequest).subscribe(res => res);
      this.resultRequest = true;
    }else{
      this.isRequested = false;
    }
  }


  reviewId : any;
 reviewChange : boolean = false;
  handlesubmit() {
    const userDataString = localStorage.getItem('user_data');
    let userData = [];
    // Check if user data exists in localStorage
    if (userDataString) {
      // Convert the JSON string to an object
      userData= JSON.parse(userDataString);
    }else{
      this.router.navigate(['/signin']);
    }

    let form = this.registerForm.controls;
    let reviewUser = {
      user_id: userData.id,
      property_id: this.id,
      comment: form["comment"].value??null,
      rating: form["rate"].value??null,
    }

      if(this.commentForm.valid || this.rateForm.valid){
        this.review.createReview(reviewUser).subscribe(res => console.log(res));
      }

    this.reloadComponent()
  }

  reloadComponent(): void {
    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/property-details', this.id]);
    });
  }

  // goToListComponent(): void {
  //   this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
  //     this.router.navigate(['/property-listing', this.id]);
  //   });
  // }

  deleteComment(id:number){
    this.review.deleteReview(id).subscribe();
    this.reloadComponent();
  }

  // updateComment(id:number){
  //   this.review.updateReview(id, "D").subscribe()
  //   this.reloadComponent()
  // }
  // updateComment(id: number, comment : string) {
  //   this.openUpdateCommentModal(id, comment);
  // }
  // openUpdateCommentModal(commentId: number, initialComment: string) {
  //   const modalRef = this.modalService.open(UpdateCommentModalComponent);
  //   modalRef.componentInstance.commentId = commentId;
  //   modalRef.componentInstance.initialComment = initialComment;

  //   // Subscribe to the event emitter from the modal to get updated comment value
  //   modalRef.componentInstance.commentUpdated.subscribe((updatedComment: string) => {
  //     // Update the comment value in the component
  //     // Here you would update the comment in the property or wherever it's stored
  //     console.log('Updated comment:', updatedComment);
  //   });
  // }
  confirmDelete(event: Event, reviewId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this comment?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      

      accept: () => {
        this.review.deleteReview(reviewId).subscribe()
        const index = this.reviewData.findIndex((review : any) => review.id === reviewId);
        if (index !== -1) {
          this.reviewData.splice(index, 1);
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Comment deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }




  @ViewChild('modal') modal: any;

  openModal(item: any): void {
      // Populate modal content with item-specific data
      // You can use item properties to customize modal content
      // For example: this.modal.nativeElement.querySelector('.modal-body').textContent = item.description;
      
      // Open the modal
      this.modal.nativeElement.classList.add('show');
      this.modal.nativeElement.style.display = 'block';
  }

  userValue!: number;
  overallValue: number = 4;
  similarProperties = [{id : 1},{id : 2},{id : 3}];
}