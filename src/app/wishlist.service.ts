import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistNumberOfProducts: BehaviorSubject<number> = new BehaviorSubject(0); // inital value is 0
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  userToken: any = localStorage.getItem('userToken');


  constructor(private _HttpClient: HttpClient) { }
  
  addToWishlistRequest(prodIdParam: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}wishlist`,
      {
        productId: prodIdParam,
      },
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }

  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}wishlist`, {
      headers: { token: this.userToken },
    });
  }

  removeWishlistItem(prodId: string|undefined): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}wishlist/${prodId}`, {
      headers: { token: this.userToken },
    });
  }

}
