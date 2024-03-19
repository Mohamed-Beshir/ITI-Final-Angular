import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SmallFooterComponent } from '../small-footer/small-footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddUserService } from '../services/add-user.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserLoggedService } from '../services/user-logged.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NavbarComponent, SmallFooterComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signForm : FormGroup;
  constructor (private formb : FormBuilder, private users : AddUserService, private router : Router, private userlogged : UserLoggedService, private route: ActivatedRoute) {
    this.signForm = this.formb.group({
      email: ['', [Validators.email,
         Validators.required,
          Validators.pattern('^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$')]],
      
      password: ['', [Validators.required]]
    })
  }
  
  successMessage: string | any;
  ngOnInit(){
    // Retrieve the success message from the query parameter
    this.route.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'] || null;
    });

  }

  checkUser() {
    if (this.signForm.valid) {
      const formData = this.signForm.value;
      // Send login data to the API
      this.users.loginUser(formData).subscribe(
        (response: any) => {
          // Handle successful login response
          console.log('Response from API:', response);
          if (response.access_token) {
            // User authenticated successfully
            // Store access token and user data returned from api 
            this.userlogged.setAccessToken(response.access_token);
            this.userlogged.setUserData(response.user); 
            // Redirect the user to the home page
            this.router.navigate(['/']);
          }
        },
        (error) => {
          // Handle error response from the API
          console.error('Error from API:', error);
          if (error.error && error.error.message === 'Invalid credentials') {
            // Invalid credentials error
            // Set error message for display in the template
            this.signForm.setErrors({ apiError: 'Invalid credentials' });
          }
        }
      );
    }
  }
  
}