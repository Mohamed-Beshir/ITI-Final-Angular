import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { NgIf } from '@angular/common';
import { UserLoggedService } from '../services/user-logged.service';

@Component({
  selector: 'app-profile-agent',
  standalone: true,
  imports: [NavbarComponent, BigFooterComponent, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './profile-agent.component.html',
  styleUrl: './profile-agent.component.css'
})
export class ProfileAgentComponent implements OnInit {
  isLoggedIn: boolean = false;
  userData: any;
  userInfo:any;
  updateUserForm: FormGroup;
  changePasswordForm: FormGroup;
  successMessage: string | null = null;

  constructor(private userService: UserServiceService, private router: Router, private loggedUser: UserLoggedService) {
    this.updateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$')])
    });

    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, this.confirmPasswordValidator])
    });
  }

  ngOnInit(): void {
    // Check if user is logged in
    this.isLoggedIn = this.loggedUser.isLoggedIn();
    
    // Retrieve user data if user is logged in
    if (this.isLoggedIn) {
      this.userInfo = this.loggedUser.getUserData();
      this.userService.getUserData(this.userInfo.id).subscribe(
        (userData) => {
          this.userData = userData;
          // Populate form fields with user data
          this.updateUserForm.patchValue({
            name: userData.name,
            email: userData.email
          });
        },
        (error) => {
          console.error('Error retrieving user data:', error);
          // Handle error as needed
        }
      );
      this.updateUserForm.patchValue({
        name: this.userData.name,
        email: this.userData.email
      });
    }else{
      this.router.navigate(['/signin']);
    }
  }

  confirmPasswordValidator = (control: FormControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate if confirm password is empty
    }
  
    const password = this.changePasswordForm.get('password');
  
    if (password && control.value !== password.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }

  updateUserInfo(): void {
    if (this.updateUserForm.valid) {
      // Assuming you have access to userId, replace '1' with actual user ID
      const updatedUserData = this.updateUserForm.value;
      this.userService.updateUserData(this.userData.id, updatedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/profile']);
          });
        },
        (error) => {
          console.error('Error updating user data:', error);
          // Optionally, you can show an error message or perform other actions
        }
      );
    }
  }


  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const newPasswordData = this.changePasswordForm.value;
      this.userService.updateUserData(this.userData.id, newPasswordData).subscribe(
          (response) => {
              console.log('Password updated successfully:', response);
              this.successMessage = 'Password updated successfully.';
              this.changePasswordForm.reset(); // Reset the form after successful password change
          },
          (error) => {
              console.error('Error updating password:', error);
              // Optionally, you can display an error message or perform other actions
          }
      );
  }
  }


  
}
