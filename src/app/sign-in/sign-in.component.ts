import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SmallFooterComponent } from '../small-footer/small-footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddUserService } from '../services/add-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NavbarComponent, SmallFooterComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signForm : FormGroup;
  constructor (private formb : FormBuilder, private users : AddUserService, private router : Router) {
    this.signForm = this.formb.group({
      email: ['', [Validators.email,
         Validators.required,
          Validators.pattern('^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$')]],
      
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  arrOfUsers : any;
  ngOnInit(){
    this.users.getAllUsers().subscribe(res=> this.arrOfUsers = res)
  }

  checkUser(){
    let result = false;
    for(let i = 0; i < this.arrOfUsers.length; i++){
      if(this.signForm.controls['email'].value == this.arrOfUsers[i]['email'] && this.signForm.controls['password'].value == this.arrOfUsers[i]['password']) {
        result = true
      }
    }
    if(!result){
      this.signForm.setErrors({ unauthenticated: true });
    }else{
      this.router.navigate(['/']);
    }
  }
}