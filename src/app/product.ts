export interface Product {
  ratingsQuantity: number;
  title: string;
  price: number;
  imageCover: string;
  category: Category;
  // or 
  // category: {name: string}
  ratingsAverage: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
