import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: any = null;
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response: any) => {
        console.log('cart', response);
        this.cartDetails = response.data;
      },
      error: () => {},
    });
  }

  removeItem(prodId: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.removeCartItem(prodId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartDetails = res.data;
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: () => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  changeCount(
    newCount: number,
    prodId: string,
    element1: HTMLButtonElement,
    element2: HTMLButtonElement
  ) {
    this._Renderer2.setAttribute(element1, 'disabled', 'true');
    this._Renderer2.setAttribute(element2, 'disabled', 'true');
    if (newCount >= 1) {
      this._CartService.updateCartProductCount(prodId, newCount).subscribe({
        next: (res: any) => {
          this.cartDetails = res.data;
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        },
        error: () => {
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        },
      });
    } else {
    }
  }

  clear() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success'){
          this.cartDetails = null
        }
      },
      error: () => {},
    });
  }
}
