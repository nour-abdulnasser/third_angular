import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLogin!: boolean;
  cartNum: number = 0;
  wishNum: number = 0;

  constructor(
    private _authService: AccountsService,
    private _router: Router,
    private _CartService: CartService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2
  ) {}

  ngOnInit(): void {
    this._authService.userToken.subscribe(() => {
      if (this._authService.userToken.getValue() == null) {
        this.isLogin = false;
      } else if (this._authService.userToken.getValue() != null) {
        this.isLogin = true;
      }
    });

    this._CartService.cartNumberOfProducts.subscribe({
      next: (data: any) => {
        console.log('nav', data);
        this.cartNum = data;
      },
    });
    this._WishlistService.wishlistNumberOfProducts.subscribe({
      next: (data: any) => {
        console.log('nav wishes', data);
        this.wishNum = data;
      },
    });
    // if (this._authService.userToken == null){
    //   this.isLogin = false;
    // } else if (this._authService.userToken != null){
    //   this.isLogin = true;
    // }
    this._CartService.getUserCart().subscribe({
      next: (res: any) => {
        this.cartNum = res.numOfCartItems;
      },
    });
    this._WishlistService.getUserWishlist().subscribe({
      next: (res: any) => {
        console.log('nav wihs response', res);
        
        this.wishNum= res.count;
      },
    });
  }

  @ViewChild('navbar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 300){

      this._Renderer2.addClass(this.navElement.nativeElement, 'py-2')
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow')
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'py-2')
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow')


    }
  }

  logout() {
    // 1. remove userToken key value from local storage
    localStorage.removeItem('userToken');

    // 2. userToken variable = null
    this._authService.decodeUserToken(); // nulls userToken variable if userToken in local storage doesnt exist
    // or we can do this
    // this._authService.userToken.next(null);

    // 3. route to login page
    this._router.navigate(['/login']);
  }
}
