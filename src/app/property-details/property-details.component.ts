import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { UserLoggedService } from '../services/user-logged.service';
import { SubmitOfferService } from '../services/submit-offer.service';
import { ReviewComponent } from '../review/review.component';
import { RatingPipe } from '../pipe/rating.pipe';
import { ReviewService } from '../services/review.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCommentModalComponent } from '../update-comment-modal/update-comment-modal.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SearchComponent } from '../search/search.component';
import { DateFormatPipe } from '../pipe/date.pipe';


@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RatingModule, FormsModule, NavbarComponent, BigFooterComponent, NgIf, ReviewComponent, FormsModule, ReactiveFormsModule, RatingPipe, NgFor, ButtonModule, ToastModule, ConfirmDialogModule, RouterLink, RouterModule, SearchComponent, DateFormatPipe],
  templateUrl: './property-details.component.html',
  providers: [ConfirmationService, MessageService, RouterLink],
  styleUrl: './property-details.component.css'
})

export class PropertyDetailsComponent implements OnInit{
  id?: any;
  property : any;
  userLogged : any;

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  userId: number | null = null;
  offerForm: FormGroup;
  offerSubmittedBefore: boolean = false;


  userLoggedData : any = [];

  registerForm: FormGroup;
  commentForm : any;
  rateForm : any;
  constructor(private route: ActivatedRoute, private property_details : AddPropertyService, private loggedUser : UserLoggedService, private submitOfferService : SubmitOfferService,  private formBuilder: FormBuilder, private review : ReviewService, private router : Router, private modalService: NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService) {
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
    this.offerForm = this.formBuilder.group({
      offeredPrice: ['', [Validators.required, Validators.min(0)]],
      message: ['', Validators.required]
    });
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
    this.property_details.getOneProperty(this.id).subscribe(data => {
      this.property = data
      this.checkOfferSubmittedBefore();
      this.fetchSimilarProperties(this.id);});

    

    // Check if user is logged in
    this.isLoggedIn = this.loggedUser.isLoggedIn();
    
    // Retrieve user data if user is logged in
    if (this.isLoggedIn) {
      const userData = this.loggedUser.getUserData();
      this.userRole = userData ? userData.role : null;
      this.userId = userData ? userData.id : null;
    }

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
  
  private checkOfferSubmittedBefore(): void {
    if (this.property.property_rent_id) {
      this.submitOfferService.getAllRentOffers().subscribe(
        (rentOffers: any) => {
          console.log(rentOffers);
          this.offerSubmittedBefore = rentOffers.data.some((offer: any) =>
            offer.property_rent_id === this.property.property_rent_id && offer.buyer_id === this.userId
          );
        },
        error => {
          console.error('Error fetching rent offers:', error);
        }
      );
    } else if (this.property.property_sale_id) {
      this.submitOfferService.getAllSaleOffers().subscribe(
        (saleOffers: any) => {
          console.log(saleOffers)
          this.offerSubmittedBefore = saleOffers.data.some((offer: any) =>
            offer.property_sale_id === this.property.property_sale_id && offer.buyer_id === this.userId
          );
        },
        error => {
          console.error('Error fetching sale offers:', error);
        }
      );
    }
  }

  submitOffer() {
    if (this.offerForm.valid) {
      console.log('Form submitted:', this.offerForm.value);
      const formData = this.offerForm.value;
      formData.buyer_id = this.userId;
      formData.offered_price = formData.offeredPrice;
      if(this.property.property_rent_id){
        formData.property_rent_id = this.property.property_rent_id;
        this.submitOfferService.submitRentOffer(formData).subscribe(
          () => {
            console.log('Offer submitted successfully');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/property-details', this.id]);
            });
          },
          error => {
            console.error('Error submitting offer:', error);
          }
        );
      }else if(this.property.property_sale_id){
        formData.property_sale_id = this.property.property_sale_id;
        this.submitOfferService.submitSaleOffer(formData).subscribe(
          () => {
            console.log('Offer submitted successfully');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/property-details', this.id]);
            });
          },
          error => {
            console.error('Error submitting offer:', error);
          }
        );
      }
      this.offerForm.reset();
    } else {
      // Mark all form fields as touched to display validation messages
      this.offerForm.markAllAsTouched();
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


  updatedComment: string = '';
  action: string = ''; 
  confirmDelete(event: Event, reviewId: number, action : string) {
    this.action = action;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this comment?',
      header: action == 'delete' ? 'Delete Confirmation' : 'Update Confirmation',
      icon: action == 'delete' ?'pi pi-info-circle' : '',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      
      accept: () => {
        if(action == 'delete'){
          this.review.deleteReview(reviewId).subscribe(res=>res)
          const index = this.reviewData.findIndex((review : any) => review.id === reviewId);
          if (index !== -1) {
            this.reviewData.splice(index, 1);
          }
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Comment deleted' });
        }else {
          let comment = {'comment': this.updatedComment}
          this.review.updateReview(reviewId, comment).subscribe(res=>res)
          this.reloadComponent()
        }
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
  
  similarProperties: any[] = [];
  fetchSimilarProperties(propertyId: number): void {
    this.property_details.getSimilarProperties(propertyId).subscribe(
      (similarProperties: any) => {
        // Store the similar properties in the array
        this.similarProperties = similarProperties;
        console.log('Similar Properties:', this.similarProperties);
      },
      error => {
        console.error('Error fetching similar properties:', error);
      }
    );
  }
}