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
  // properties = [
  //   {
  //     id: 1,
  //     image: 'assets/img/properties/property-09.jpg',
  //     street: '3398 Lodgeville Road',
  //     propertyNumber: 'Golden Valley, MN 55427',
  //     price: '11,000',
  //     area: '240m',
  //     Beds: 2,
  //     Baths: 2,
  //     Garages: 0,
  //     status: 'For Sale',
  //     dateAdded: '2022-01-01',
  //     views: 500
  //   },
  //   {
  //     id: 2,
  //     image: 'assets/img/properties/property-03.jpg',
  //     street: '2186 Rinehart Road',
  //     propertyNumber: 'Doral, FL 33178',
  //     price: '38,000',
  //     area: '240m',
  //     Beds: 3,
  //     Baths: 1,
  //     Garages: 1,
  //     status: 'For Rent',
  //     dateAdded: '2022-02-01',
  //     views: 300
  //   },
  //   {
  //     id: 3,
  //     image: 'assets/img/properties/property-06.jpg',
  //     street: '3705 Brighton Circle Road',
  //     propertyNumber: 'Glenwood, MN 56334',
  //     price: '325,000',
  //     area: '240m',
  //     Beds: 3,
  //     Baths: 1,
  //     Garages: 1,
  //     status: 'For Rent',
  //     dateAdded: '2022-03-01',
  //     views: 800
  //   },
  //   {
  //     id: 4,
  //     image: 'assets/img/properties/property-02.jpg',
  //     street: '2506 B Street',
  //     propertyNumber: 'New Brighton, MN 55112',
  //     price: '18,000',
  //     area: '280m',
  //     Beds: 3,
  //     Baths: 2,
  //     Garages: 1,
  //     status: 'For Sale',
  //     dateAdded: '2022-04-01',
  //     views: 200
  //   },
  //   {
  //     id: 5,
  //     image: 'assets/img/properties/property-12.jpg',
  //     street: '3990 Late Avenue',
  //     propertyNumber: 'Kingfisher, OK 73750',
  //     price: '136,000',
  //     area: '30m',
  //     Beds: 1,
  //     Baths: 1,
  //     Garages: 0,
  //     status: 'For Rent',
  //     dateAdded: '2022-05-01',
  //     views: 600
  //   },
  //   {
  //     id: 6,
  //     image: 'assets/img/properties/property-05.jpg',
  //     street: '297 Marie Street',
  //     propertyNumber: 'Towson, MD 21204',
  //     price: '12,680',
  //     area: '240m',
  //     Beds: 3,
  //     Baths: 1,
  //     Garages: 1,
  //     status: 'For Rent',
  //     dateAdded: '2022-06-01',
  //     views: 900
  //   },
  //   {
  //     id: 7,
  //     image: 'assets/img/properties/property-13.jpg',
  //     street: '2663 West Side Avenue',
  //     propertyNumber: 'Fort Lee, NJ 07024',
  //     price: '13,000',
  //     area: '280m',
  //     Beds: 3,
  //     Baths: 2,
  //     Garages: 1,
  //     status: 'For Sale',
  //     dateAdded: '2022-07-01',
  //     views: 400
  //   },
  //   {
  //     id: 8,
  //     image: 'assets/img/properties/property-04.jpg',
  //     street: '1821 Pursglove Court',
  //     propertyNumber: 'Dayton, OH 45429',
  //     price: '189,000',
  //     area: '30m',
  //     Beds: 1,
  //     Baths: 1,
  //     Garages: 0,
  //     status: 'For Rent',
  //     dateAdded: '2022-08-01',
  //     views: 750
  //   },
  //   {
  //     id: 9,
  //     image: 'assets/img/properties/property-07.jpg',
  //     street: '1380 Sundown Lane',
  //     propertyNumber: 'Austin, TX 78748',
  //     price: '45,730',
  //     area: '240m',
  //     Beds: 3,
  //     Baths: 1,
  //     Garages: 1,
  //     status: 'For Sale',
  //     dateAdded: '2022-09-01',
  //     views: 300
  //   },
  //   {
  //     id: 10,
  //     image: 'assets/img/properties/property-04.jpg',
  //     street: '4862 Palmer Road',
  //     propertyNumber: 'Worthington, OH 43085',
  //     price: '38,000',
  //     area: '280m',
  //     Beds: 3,
  //     Baths: 2,
  //     Garages: 1,
  //     status: 'For Rent',
  //     dateAdded: '2022-10-01',
  //     views: 500
  //   }
  // ]
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
        this.propertiesApi.deletePropertyFromApi(propertyId).subscribe(res => res)
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
