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
    return user?.userRole || '';
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken === null)
      return false;

    return this.getUserRole() == 'ADMIN';
  }
  
  static isCustomerLoggedIn(): boolean {
    if (this.getToken === null)
      return false;

    return this.getUserRole() == 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
