import { Component} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SmallFooterComponent } from '../small-footer/small-footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddUserService } from '../services/add-user.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    SmallFooterComponent,
    NavbarComponent,
    NgIf,NgFor
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private router: Router, private users : AddUserService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        this.confirmPasswordValidator,
      ]),
      role: new FormControl('user')
    });
  }
  
  confirmPasswordValidator = (control: FormControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate if confirm password is empty
    }
  
    const password = this.registerForm.get('password');
  
    if (password && control.value !== password.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }

  showSuccessMessage=false;

  handlesubmit() {
    // Collect form data
    const formData = this.registerForm.value;
  
    // Prepare data to be sent to the API
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      role: formData.role
    };
  
    // Send data to the API
    this.users.saveUserData(newUser).subscribe(
      (response: any) => {
        // Handle successful response from the API
        console.log('Response from API:', response);
        // Redirect the user to the login page with success message
        this.router.navigate(['signin'], { queryParams: { successMessage: 'User registered successfully. Please log in.' } });
      },
      (error) => {
        // Handle error response from the API
        console.error('Error from API:', error);
  
        // Check if there are validation errors in the response
        if (error && error.error && error.error.errors) {
          // Loop through the validation errors and update form errors
          for (const fieldName in error.error.errors) {
            if (error.error.errors.hasOwnProperty(fieldName)) {
              const errorMessage = error.error.errors[fieldName];
              this.registerForm.get(fieldName)?.setErrors({ apiError: errorMessage });
            }
          }
        }
      }
    );
  }
  

}