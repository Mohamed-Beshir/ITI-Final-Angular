import { Component } from '@angular/core';
import { Routes } from '@angular/router';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
 { 'path':'register' , component:RegisterComponent }
=======
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SignInComponent },
>>>>>>> d96eb3889a0de516934cf534a330d0edd95fde3f
];
