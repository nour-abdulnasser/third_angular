import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { RegisterComponent } from './register/register.component';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // home has guard, guard redirects to login
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent },
  { path: 'category', canActivate: [authGuard], component: CategoryComponent },
  { path: 'categorydetails/:id', canActivate: [authGuard], component: CategorydetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'productdetails/:id', canActivate: [authGuard], component: DetailsComponent },
  { path: 'payment/:cartId', canActivate: [authGuard], component: PaymentComponent },
  { path: 'allorders', canActivate: [authGuard], component: AllOrdersComponent },
  // { path: 'payment', canActivate: [authGuard], component: PaymentComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
