import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InnerfooterComponent } from '../innerfooter/innerfooter.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SmallFooterComponent } from '../small-footer/small-footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    InnerfooterComponent,
    NavbarComponent,
    SmallFooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private router: Router) {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
      ]),
    });
  }
  handlesubmit() {
    console.log(this.registerForm);
    this.router.navigate(['/signin']);
  }

}
