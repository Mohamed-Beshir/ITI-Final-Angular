import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPropertyService } from '../services/add-property.service';
import { NgIf } from '@angular/common';
import { UserLoggedService } from '../services/user-logged.service';
import { RequestPropertyService } from '../services/request-property.service';
import { ReviewComponent } from '../review/review.component';
import { RateService } from '../reviewServices/rate.service';
import { CommentService } from '../reviewServices/comment.service';
import { RatingPipe } from '../pipe/rating.pipe';



@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RatingModule, FormsModule, NavbarComponent, BigFooterComponent, NgIf, ReviewComponent, FormsModule, ReactiveFormsModule, RatingPipe],
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

    // this.requestProperty.forEach((req : any) => {
      
    //   this.userLogged.forEach((user :any) => {
    //     if(req.user_id == user.id && req.property_id == this.property.id ){
    //       this.resultRequest = true;
    //       console.log(this.resultRequest);
    //     }
    //   })
    // });

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