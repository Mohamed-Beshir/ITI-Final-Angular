import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  private accessTokenKey = 'access_token';
  private userDataKey = 'user_data';
  private adminTokenKey = 'admin_token';

  constructor() {}

  setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAdminToken(token: string) {
    localStorage.setItem(this.adminTokenKey, token);
  }

  getAdminToken() {
    return localStorage.getItem(this.adminTokenKey);
  }

  setUserData(data: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

  getUserData() {
    const userDataString = localStorage.getItem(this.userDataKey);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  isAdminLoggedIn() {
    return !!localStorage.getItem(this.adminTokenKey);
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userDataKey);
    localStorage.removeItem(this.adminTokenKey);
  }
}
