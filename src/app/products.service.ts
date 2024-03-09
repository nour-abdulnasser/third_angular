import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com';

  getProductsAPI(pageNum:number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${pageNum}`);
  }

  getBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`);
  }

  getCategoriesAPI(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }
  getCategoriesDetailsAPI(id:string|null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}`);
  }
  getSubCategoriesAPI(id:string|null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}/subcategories`);
  }

  getSpecificProductDetails(id:string|null){
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
}
