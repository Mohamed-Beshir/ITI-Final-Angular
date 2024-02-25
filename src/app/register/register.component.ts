import { Component} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SmallFooterComponent } from '../small-footer/small-footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddUserService } from '../services/add-user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    SmallFooterComponent,
    NavbarComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private users : AddUserService) {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      isagent: new FormControl('user')
    });
  }
  
  arrOfUsers : any;
  ngOnInit(){
    this.users.getAllUsers().subscribe(res=> this.arrOfUsers = res)
  }

  handlesubmit() {
    // save register data in object
    let form = this.registerForm.controls;
    let newUser : any = {
      name: form["fullname"].value,
      isagent: form["isagent"].value == "agent" ? true : false,
      email: form["email"].value,
      password: form["password"].value,
    }
  
    let result = false;
    for(let i = 0; i < this.arrOfUsers.length; i++){
      if(this.registerForm.controls['email'].value == this.arrOfUsers[i]['email']) {
        result = true;
      }
    }
    if(result){
      this.registerForm.setErrors({ unauthenticated: true });
    }else {
      this.users.saveUserData(newUser).subscribe((res)=> res);
      this.router.navigate(['signin']);
    }

    
  }

  handledropdown (){}


}