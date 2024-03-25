import { Component ,OnInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { Router, RouterLink } from '@angular/router';
import { AddUserService } from './../services/add-user.service';
import { UserServiceService } from '../services/user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-agent',
  standalone: true,
  imports: [NavbarComponent, BigFooterComponent, RouterLink,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './profile-agent.component.html',
  styleUrl: './profile-agent.component.css'
})
export class ProfileAgentComponent implements OnInit {
  userId: string | null = null;
  userData: any;
  userForm!: FormGroup;
  showEditForm = false; // Initialize flag for edit form visibility
  notificationMessage: string | null = null;

  constructor(private userService: UserServiceService, private formBuilder: FormBuilder, private router : Router) {

  }
  userloggedData : any = [];

  ngOnInit(): void {

    //
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    //

    const userData = localStorage.getItem('user_data');
    if (userData) {
      this.userloggedData= JSON.parse(userData);
      this.userId = JSON.parse(userData).id;
    }else{
      this.router.navigate(['/signin']);

    }

    if (this.userId) {
      this.getUserData(this.userId);
    }
  }

  getUserData(userId: string): void {
    this.userService.getUserData(userId).subscribe(data => {
      this.userData = data;
      this.userForm.patchValue(data);
    });
  }

  toggleEdit(): void {
    this.showEditForm = !this.showEditForm; // Toggle the edit form visibility
  }

  cancelEdit(): void {
    this.showEditForm = false; // Hide the edit form
  }

  onSubmit(): void {


    if (this.userForm.valid) {
      // Form is valid, perform form submission logic here
      console.log('Form submitted:', this.userForm.value);
    } else {
      // Form is invalid, display error messages or handle as needed
      console.log('Form is invalid');
      // Optionally, you can mark all fields as touched to display validation errors
      this.userForm.markAllAsTouched();
    }
    if (!this.userId) {
      console.error('User ID is not available.');
      return;
    }
    this.notificationMessage = 'User data saved successfully.';

    const updatedUserData = this.userForm.value;
    this.userService.updateUserData(this.userId, updatedUserData).subscribe(response => {
      console.log('Data updated successfully:', response);
      // You can handle success response here
      this.showEditForm = false; // Hide the edit form after successful submission
    }, error => {
      console.error('Error updating data:', error);
      // You can handle error response here
    });



    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile']);
    });
  }
}
