import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserLoggedService } from '../services/user-logged.service';
import { RequestPropertyService } from '../services/request-property.service';
import { ReviewComponent } from '../review/review.component';
import { RateService } from '../reviewServices/rate.service';
import { CommentService } from '../reviewServices/comment.service';
import { RatingPipe } from '../pipe/rating.pipe';



@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RatingModule, FormsModule, NavbarComponent, BigFooterComponent, NgIf, ReviewComponent, FormsModule, ReactiveFormsModule, RatingPipe, CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent implements OnInit{
  id?: any;
  property : any;
  userLogged : any;
  requestProperty : any;
  resultRequest : boolean = false;
  rateData : any;
  commentData : any;
  registerForm: FormGroup;
  userId: any;
  addReviewService: any;
  completedReview!: boolean;
  constructor(private route: ActivatedRoute, private property_details : AddPropertyService, private user_logged : UserLoggedService, private request : RequestPropertyService,  private formBuilder: FormBuilder, private rateApi : RateService, private commentApi : CommentService, private router : Router) {
    this.registerForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      rate: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  rating : number = 0;
  numberOfRating : number = 0;
  finalRatingForProperty : number = 0;

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

    this.rateApi.getAllRate().subscribe(res => {
      this.rateData = res;
      for(let i = 0; i < this.rateData.length; i++){
        if(this.rateData[i].property_id == this.id){
          this.rating += parseInt(this.rateData[i].rate);
          this.numberOfRating++
        }
      }
      if(this.numberOfRating){
        this.finalRatingForProperty = this.rating / this.numberOfRating;
      }
    });
    this.commentApi.getAllComment().subscribe(res => this.commentData = res);

//////////////////////////////////////////////////////////////////////////////////////

    this.id = this.route.snapshot.params['id'];
    // Get the user ID from wherever you have it available, e.g., from authentication service
    this.userId = getUserData(); 

    this.registerForm = this.formBuilder.group({
      rate: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.getComments();

  }


  getComments() {
    this.commentData = []; // Fetch comments based on the property ID and populate commentData
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


  reloadComponent(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/property-details', this.id]);
    });
  }

  goToListComponent(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/property-listing', this.id]);
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




  handlesubmit() {
    if (this.registerForm.valid) {
      const reviewData = {
        property_id: this.id,
        user_id: this.userId, // Include user ID in the review data
        rating: this.registerForm.value.rate,
        comment: this.registerForm.value.comment
      };

      this.addReviewService.createReview(reviewData).subscribe(
        (response: any) => {
          console.log('Review submitted successfully:', response);
          this.completedReview = true;
          this.registerForm.reset();
          this.getComments();
        },
        (error: any) => {
          console.error('Failed to submit review:', error);
        }
      );
    }
  }

  deleteComment(commentId: any) {
    console.log('Deleting comment with ID:', commentId);
    this.getComments();
  }

  
}










function getUserData(): any {
  throw new Error('Function not implemented.');
}

