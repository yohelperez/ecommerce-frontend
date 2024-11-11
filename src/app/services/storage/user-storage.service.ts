import { Injectable } from '@angular/core';

const TOKEN = 'ecommerce-token';
const USER = 'ecommerce-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return JSON.parse(window.localStorage.getItem(USER))
  }

  static getUserId(): string {
    const user = this.getUser();
    return user?.userId || '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null)
      return false;

    const userRole = this.getUserRole();
    return userRole == 'ADMIN';
  }
  
  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null)
      return false;

    const userRole = this.getUserRole();
    return userRole == 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
