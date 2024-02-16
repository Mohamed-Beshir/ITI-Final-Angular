import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileAgentComponent } from './profile-agent/profile-agent.component';
import { MypropertiesAgentComponent } from './myproperties-agent/myproperties-agent.component';
import { AddPropertyComponent } from './add-property/add-property.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileAgentComponent },
    { path: 'my-properties', component: MypropertiesAgentComponent },
    { path: 'add-property', component: AddPropertyComponent}

];
