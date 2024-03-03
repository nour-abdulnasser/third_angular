import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com';

  getProductsAPI(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`);
  }

  getCategoriesAPI(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }
}
