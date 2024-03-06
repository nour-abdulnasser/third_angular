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

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // home has guard, guard redirects to login
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'category', canActivate: [authGuard], component: CategoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'productdetails/:id', canActivate: [authGuard], component: DetailsComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
