import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProducts: Product[] = [];
pageSize:number = 0;
currentPage:number = 1;
total:number = 0;

  constructor(private _ProductsService:ProductsService, 
    private _Renderer2: Renderer2
    , 
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    ){}

  ngOnInit(): void {
    this._ProductsService.getProductsAPI().subscribe({
      next: (response: any) => {
        console.log('products component', response);
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;

      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
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


  pageChanged(event:any):void{
    console.log(event);
    this._ProductsService.getProductsAPI(event).subscribe({
      next: (response: any) => {
        console.log('products component', response);
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;

      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      },
    });
    
  }

}
