import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumberOfProducts: BehaviorSubject<number> = new BehaviorSubject(0); // inital value is 0
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  userToken: any = localStorage.getItem('userToken');
  constructor(private _HttpClient: HttpClient) {}

  addToCart(prodIdParam: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}cart`,
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

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}cart`, {
      headers: { token: this.userToken },
    });
  }

  removeCartItem(prodId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}cart/${prodId}`, {
      headers: { token: this.userToken },
    });
  }

  updateCartProductCount(prodId: string, countNum: number): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}cart/${prodId}`,
      {
        count: countNum,
      },
      {
        headers: { token: this.userToken },
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}cart`, {
      headers: { token: this.userToken },
    });
  }

  checkout(cartId: string|null, orderInfo: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderInfo,
      },
      {
        headers: {token: this.userToken}
      }
    );
  }
}
