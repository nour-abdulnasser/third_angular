import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartId!: string | null;
  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('cartId');
        console.log(this.cartId);
      },
    });
  }

  handleOrderForm(): void {
    console.log(this.orderForm.value);
    this._CartService.checkout(this.cartId, this.orderForm.value).subscribe({
      next:(res:any)=>{
        if (res.status === 'success'){
          window.open(res.session.url, '_self')
        }

      }
    })
  }
}
