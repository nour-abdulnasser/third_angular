import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category } from '../product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categoriesData: Category[] = []
  
constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    
    this._ProductsService.getCategoriesAPI().subscribe({
      next: (res: any) => {
        this.categoriesData = res.data;
      },
    });
  }

}
