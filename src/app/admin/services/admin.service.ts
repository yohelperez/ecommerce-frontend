import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  
  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader()
    })
  }

  addProduct(prductDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/product', prductDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
      observe: 'response' // Allows access to status codes and such
    })
  }
  
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
