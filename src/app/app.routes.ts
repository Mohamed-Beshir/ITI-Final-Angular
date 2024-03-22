import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileAgentComponent } from './profile-agent/profile-agent.component';
import { MypropertiesAgentComponent } from './myproperties-agent/myproperties-agent.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertiesListingComponent } from './properties-listing/properties-listing.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsPropertiesComponent } from './requests-properties/requests-properties.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSaleOffersComponent } from './admin-sale-offers/admin-sale-offers.component';
import { AdminRentOffersComponent } from './admin-rent-offers/admin-rent-offers.component';
import { AdminPaymentsComponent } from './admin-payments/admin-payments.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { PropertiesRentComponent } from './properties-rent/properties-rent.component';
import { PropertiesSaleComponent } from './properties-sale/properties-sale.component';
import { UserOfferedPropertiesComponent } from './user-offered-properties/user-offered-properties.component';
import { PaymentComponent } from './payment/payment.component';
import { RentOffersComponent } from './rent-offers/rent-offers.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path:'profile', component:ProfileAgentComponent},
    { path: 'my-properties', component: MypropertiesAgentComponent },
    { path: 'property-details/:id', component: PropertyDetailsComponent },
    { path: 'add-property', component: AddPropertyComponent},
    { path: 'edit-property/:id', component: EditPropertyComponent},
    { path: 'property-listing' , component: PropertiesListingComponent},
    { path: 'property-rent' , component: PropertiesRentComponent},
    { path: 'property-sale' , component: PropertiesSaleComponent},
    { path: 'dashboard' , component: DashboardComponent},
    { path: 'requests' , component: RequestsPropertiesComponent},
    { path: 'admin' , component: AdminComponent , canActivate: [() => {
        return !!localStorage.getItem('admin_token');
    }]},
    { path: 'admin/sale-offers' , component: AdminSaleOffersComponent , canActivate: [() => {
        return !!localStorage.getItem('admin_token');
    }]},
    { path: 'admin/rent-offers' , component: AdminRentOffersComponent , canActivate: [() => {
        return !!localStorage.getItem('admin_token');
    }]},
    { path: 'admin/payments' , component: AdminPaymentsComponent , canActivate: [() => {
        return !!localStorage.getItem('admin_token');
    }]},
    { path: 'admin/users' , component: AdminUsersComponent , canActivate: [() => {
        return !!localStorage.getItem('admin_token');
    }]},
    { path: 'offered-properties' , component: UserOfferedPropertiesComponent},
    { path: 'payment' , component: PaymentComponent},


    { path: 'offers' , component: RequestsPropertiesComponent},
    { path: 'rent_offers', component:RentOffersComponent}
];
