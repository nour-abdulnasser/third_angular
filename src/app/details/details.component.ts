import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productId!: string | null;
  productDetails: any = null;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService,


  ) {}
  ngOnInit(): void {
    /*
      grab id given while routing and store in variable productId
    */
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('id');
      },
    });
    /*
      get product details from api using the id
    */
    this._ProductsService.getSpecificProductDetails(this.productId).subscribe({
      // next: (response:any) => {
      //   console.log('specific product', response.data);
      // },
      /*
        we can use destructuring too 
        the below does the same as the above
      */
      next: ({ data }: any) => {
        console.log('specific product', data);
        this.productDetails = data;
      },
      error: (errorResponse) => {
        console.log('specific product', errorResponse);
      },
    });
  }

  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  addProduct(id: string | undefined, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        console.log('cart', res);
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (errorRes) => {
        console.log('cart', errorRes);
        this._ToastrService.error(errorRes.message);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
  
}
