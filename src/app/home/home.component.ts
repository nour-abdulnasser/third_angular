import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category, Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  allCategories: Category[] = [];
  searchTerm: string = '';
  wishlistArr: string[] = [];

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    this._WishlistService.getUserWishlist().subscribe({
      next: (res: any) => {
        this.wishlistArr = res.data.map((item:any)=>item._id);
      },
    });
    this._ProductsService.getProductsAPI().subscribe({
      next: (response: any) => {
        console.log('allProducts', response);
        this.allProducts = response.data;
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      },
    });

    this._ProductsService.getCategoriesAPI().subscribe({
      next: (response: any) => {
        console.log('allCategories', response);
        this.allCategories = response.data;
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    autoplay: true,
  };

  mainSliderOptions: OwlOptions = {
    autoplay: true,
    autoplayHoverPause: false,
    autoplayTimeout: 2500,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplaySpeed: 1000,
  };

  addProductToWishlist(id: string | undefined, element: HTMLElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._WishlistService.addToWishlistRequest(id).subscribe({
      next: (res: any) => {
        console.log('wishlist home ', res);
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');
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

  removeFromWishlist(id: string | undefined, element?: HTMLElement): void {

    this._WishlistService.removeWishlistItem(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this._ToastrService.success(res.message);
        this.wishlistArr = res.data;
        this._WishlistService.wishlistNumberOfProducts.next(res.data.length);
        

      },
    });
  }
}
