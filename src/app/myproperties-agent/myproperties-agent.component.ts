import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddPropertyService } from '../services/add-property.service';



@Component({
  selector: 'app-myproperties-agent',
  standalone: true,
  imports: [NavbarComponent, BigFooterComponent, RouterLink, ButtonModule, ToastModule, ConfirmDialogModule, RouterModule],
  templateUrl: './myproperties-agent.component.html',
  providers: [ConfirmationService, MessageService, RouterLink],
  styleUrl: './myproperties-agent.component.css'
})
export class MypropertiesAgentComponent {

  itemsPerPage = 5; // Number of items to show per page
  currentPage = 1; // Current page
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private propertiesApi : AddPropertyService, private router : Router) {
    const userDataString = localStorage.getItem('user_data');
    // Check if user data exists in localStorage
    if (userDataString) {
      // Convert the JSON string to an object
      this.userData= JSON.parse(userDataString);
    }else{
      this.router.navigate(['/signin']);
    }
    if(this.userData.role == 'user'){
      this.router.navigate([""])
    }
  }
  propertiesArray : any;
  userData : any = [];
  ngOnInit(){
    this.propertiesApi.getAllPropertyAgent(this.userData.id).subscribe(res => this.propertiesArray = res)
  }
  confirmDelete(event: Event, propertyId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      

      accept: () => {
        this.propertiesApi.deletePropertyFromApi(propertyId).subscribe(res => console.log(res))
        const index = this.propertiesArray.findIndex((property : any) => property.id === propertyId);
        if (index !== -1) {
          this.propertiesArray.splice(index, 1);
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  // Function to get the properties for the current page
  getCurrentPageProperties(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.propertiesArray.slice(startIndex, endIndex);
  }

  // Function to get an array of page numbers based on the total number of properties and items per page
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.propertiesArray.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Function to change the current page
  changePage(newPage: number): void {
    this.currentPage = newPage;
    console.log(this.propertiesArray)
  }

}
