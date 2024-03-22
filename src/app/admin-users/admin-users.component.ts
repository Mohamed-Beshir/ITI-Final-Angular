import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../services/user-logged.service';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';




@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
  providers: [ConfirmationService, MessageService, RouterLink],
})
export class AdminUsersComponent implements OnInit {

  users: any[] =[];



  constructor(private loggedUser : UserLoggedService, private router: Router, private admin : AdminService, private confirmationService: ConfirmationService, private messageService: MessageService){
  }

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    this.admin.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  confirmDelete(event: Event, userId: number, userName: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to delete ${userName}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      

      accept: () => {
        this.deleteUser(userId);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'User deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  


  deleteUser(userId: number): void {
    this.admin.deleteUser(userId).subscribe(
      () => {
        // Refresh users data after deletion
        this.fetchUsersData();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  logout(){
    this.loggedUser.logout();
    this.router.navigate(['signin']);
  }

}
