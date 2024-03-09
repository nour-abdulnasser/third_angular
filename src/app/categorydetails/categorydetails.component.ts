import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Category } from '../product';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css'],
})
export class CategorydetailsComponent implements OnInit {
  categoryId: string | null = '';
  // categoryDetails!: Category;
  categoryDetails: Category = {} as Category;
  subcats!: Category[];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      },
    });
    this._ProductsService.getCategoriesDetailsAPI(this.categoryId).subscribe({
      next: (res: any) => {
        this.categoryDetails = res.data;
      },
    });
    this._ProductsService.getSubCategoriesAPI(this.categoryId).subscribe({
      next: (res) => {
        this.subcats = res.data;
      },
    });
  }

}
