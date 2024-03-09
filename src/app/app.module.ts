import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CutTextPipe } from './cut-text.pipe';
// import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { DetailsComponent } from './details/details.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './payment/payment.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './loading.interceptor';
import { SearchPipe } from './search.pipe';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BrandsComponent,
    CategoryComponent,
    CartComponent,
    ProductsComponent,
    NotfoundComponent,
    CutTextPipe,
    ScrollToTopComponent,
    DetailsComponent,
    PaymentComponent,
    AllOrdersComponent,
    SearchPipe,
    CategorydetailsComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // RouterModule, // why did this give an error
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:MyhttpInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor,multi:true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
