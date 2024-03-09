import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
wishlistData: any = null;
wishlistArr: string[] = [];

  constructor(private _WishlistService:WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,

    ){}

  ngOnInit(): void {
      this._WishlistService.getUserWishlist().subscribe({
      next: (response: any) => {
        console.log('wishlistData', response);
        this.wishlistData = response.data;
        this.wishlistArr = response.data.map((item:any)=>item._id);

      },
      error: () => {},
    });
  }

  
  addProduct(id: string | undefined, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        console.log('cart', res);
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumberOfProducts.next(res.numOfCartItems);
      },
      error: (errorRes) => {
        console.log('cart', errorRes);
        this._ToastrService.error(errorRes.message);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  
  addProductToWishlist(id: string | undefined, element: HTMLElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._WishlistService.addToWishlistRequest(id).subscribe({
      next: (res: any) => {
        console.log('wishlist', res);
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        // this._WishlistService.wishlistNumberOfProducts.next(res.numOfCartItems);
        this.wishlistArr = res.data;
        this._WishlistService.wishlistNumberOfProducts.next(res.data.length);


      },
      error: (errorRes) => {
        console.log('wishlist', errorRes);
        this._ToastrService.error(errorRes.message);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }


  removeFromWishlist(id:string|undefined, element?:HTMLElement):void{
    this._WishlistService.removeWishlistItem(id).subscribe({
      next: (res:any)=>{
        console.log(res);
        this._ToastrService.success(res.message)
        this.wishlistArr = res.data;
        this._WishlistService.wishlistNumberOfProducts.next(res.data.length);

        this._WishlistService.getUserWishlist().subscribe({
          next:(res:any)=>{
            this.wishlistData = res.data;

          }
        })
      }
    })

  }
}
