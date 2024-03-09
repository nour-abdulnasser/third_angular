import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    return products.filter((item) => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }
}
