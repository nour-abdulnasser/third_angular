import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category, Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  allCategories: Category[] = []

  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getProductsAPI().subscribe({
      next: (response: any) => {
        console.log('allProducts',response);
        this.allProducts = response.data;
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      },
    });

    this._ProductsService.getCategoriesAPI().subscribe({
      next: (response: any) => {
        console.log('allCategories' , response);
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
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
}
