import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category } from '../product';
import { Brand } from '../brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brandsData: Brand[] = [];

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this._ProductsService.getBrands().subscribe({
      next: (res: any) => {
        this.brandsData = res.data;
      },
    });
  }
}
