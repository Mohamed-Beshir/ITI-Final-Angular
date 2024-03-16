import { Component } from '@angular/core';
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


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileAgentComponent },
    { path: 'my-properties', component: MypropertiesAgentComponent },
    { path: 'property-details/:id', component: PropertyDetailsComponent },
    { path: 'add-property', component: AddPropertyComponent},
    { path: 'edit-property/:id', component: EditPropertyComponent},
    { path: 'property-listing' , component: PropertiesListingComponent},
    { path: 'dashboard' , component: DashboardComponent},
    { path: 'requests' , component: RequestsPropertiesComponent}
];
