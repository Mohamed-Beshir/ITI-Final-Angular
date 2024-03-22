import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';
import { NgFor, NgIf } from '@angular/common';
import { UserLoggedService } from '../services/user-logged.service';
import { SubmitOfferService } from '../services/submit-offer.service';
import { ReviewComponent } from '../review/review.component';
import { RateService } from '../reviewServices/rate.service';
import { CommentService } from '../reviewServices/comment.service';
import { RatingPipe } from '../pipe/rating.pipe';




@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RatingModule, FormsModule, NavbarComponent, BigFooterComponent, NgIf, ReviewComponent, FormsModule, ReactiveFormsModule, RatingPipe, NgFor, RouterLink],
  templateUrl: './property-details.component.html',
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

  rateData : any;
  commentData : any;

  registerForm: FormGroup;
  constructor(private route: ActivatedRoute, private property_details : AddPropertyService, private loggedUser : UserLoggedService, private submitOfferService : SubmitOfferService, private formBuilder: FormBuilder, private rateApi : RateService, private commentApi : CommentService, private router : Router) {
    this.registerForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      rate: new FormControl('', [
        Validators.required,
      ]),
    });


    this.offerForm = this.formBuilder.group({
      offeredPrice: ['', [Validators.required, Validators.min(0)]],
      message: ['', Validators.required]
    });
  }

  rating : number = 0;
  numberOfRating : number = 0;
  finalRatingForProperty : number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.property_details.getOneProperty(this.id).subscribe(data => {
      this.property = data
      this.checkOfferSubmittedBefore();});

    

    // Check if user is logged in
    this.isLoggedIn = this.loggedUser.isLoggedIn();
    
    // Retrieve user data if user is logged in
    if (this.isLoggedIn) {
      const userData = this.loggedUser.getUserData();
      this.userRole = userData ? userData.role : null;
      this.userId = userData ? userData.id : null;
    }

    

    

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


  rateId : any;
 rateChange : boolean = false;
 completedReview : boolean = false;
  handlesubmit() {
    // save register data in object
    let form = this.registerForm.controls;
    let currentDate = new Date()
    let commentUser = {
      name: this.userLogged[1].name,
      email: this.userLogged[1].email,
      date: currentDate.getDate()+"."+currentDate.getMonth()+"."+currentDate.getFullYear(),
      comment: form["comment"].value,
      property_id: this.id
    }
    let rateUser = {
      email: this.userLogged[1].email,
      rate: form["rate"].value,
      property_id: this.id
    }




    // this.rateData.forEach((rate : any) => {
    //   this.userLogged.forEach((user : any) => {
    //     if(rate.email == user.email){
    //       this.rateChange  = true;
    //       this.rateId = rate.id;
    //     }
    //   })
    // });

    for(let i = 0; i < this.rateData.length; i++){
      if(this.userLogged[1].email == this.rateData[i].email && this.id == this.rateData[i].property_id){
        this.rateChange = true;
        this.rateId = this.rateData[i].id;
        i = this.rateData.length
        console.log("hello");
      }
    }
    
    this.commentApi.saveCommentData(commentUser).subscribe(res => res);
    this.completedReview = true;

    if(this.rateChange){
      this.rateApi.updateRate(this.rateId, rateUser).subscribe(res => res);
      console.log(true);
    }else {
      this.rateApi.saveRateData(rateUser).subscribe(res => res);
      console.log(false);
      this.router.navigate(['/property-listing']);
    }

    
    this.reloadComponent()
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

  deleteComment(id:number){
    this.commentApi.deleteCommentFromApi(id).subscribe()
    this.reloadComponent()
  }

  updateComment(id:number){
    // this.commentApi.updateComment(id, ).subscribe()
    this.reloadComponent()
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