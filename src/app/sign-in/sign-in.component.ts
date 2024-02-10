import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SmallFooterComponent } from '../small-footer/small-footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NavbarComponent, SmallFooterComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signForm : FormGroup;
  constructor (private formb : FormBuilder) {
    this.signForm = this.formb.group({
      email: ['', [Validators.email,
         Validators.required,
          Validators.pattern('^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$')]],
      
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
}