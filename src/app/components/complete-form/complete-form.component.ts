import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Order, Product } from '../../types';
import { GoodFoodHttpService } from '../../servicies';
import { ShoppingCartService } from '../../servicies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-form',
  templateUrl: './complete-form.component.html',
  styleUrls: ['./complete-form.component.scss']
})
export class CompleteFormComponent implements OnInit, OnDestroy {

  cartItems: Product[];
  totalPrice: number = 0;

  orderForm = this._formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(7), Validators.email]),
    address: new FormControl('', [Validators.required, Validators.minLength(7)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(7)])
  })

  
  name1 = this.orderForm.get('name');
  email1 = this.orderForm.get('email');
  tel1 = this.orderForm.get('telephone');
  address1 = this.orderForm.get('address');  

  private _sub: Subscription;

  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _service: GoodFoodHttpService,
    private _shoppingCart: ShoppingCartService,
    private _router: Router
  ) {
    this._sub = new Subscription();
   }

   ngOnInit(): void {
    this._sub.add(
      this._shoppingCart.getCartItems().pipe(
        tap((cartItems) => this.cartItems = cartItems)
      ).subscribe()
    );

    this._sub.add(
      this._shoppingCart.getTotalPriceOfItems().pipe(
        tap((total) => this.totalPrice = total)
      ).subscribe()
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  getNameErrorMessage() {
    return this.orderForm.get('name').hasError('required') ? 'Введите имя' : '';
  }  

  getTelephoneErrorMessage() {
    return this.orderForm.get('telephone').hasError('required') ? 'Введите телефон' : '';
  }

  getAddressErrorMessage() {
    return this.orderForm.get('address').hasError('required') ? 'Введите адрес' : '';
  }

  getEmailErrorMessage() {
    if (this.orderForm.get('email').hasError('required')) {
      return 'Введите емэйл';
    }

    return this.orderForm.get('email').hasError('email') ? 'Емэйл не действителен' : '';
  }

  completeOrder() {
    

    if (this.orderForm.valid) {

      let currOrder: Order = {
        orderType: "delivery",
        address: this.address1.value,
        customerEmail: this.email1.value,
        customerName: this.name1.value,
        customerPhoneNumber: this.tel1.value.toString(),
        orderTotalPrice: this.totalPrice,
        orderItems: this.cartItems,
      }
      this._service.sendOrder(currOrder).subscribe();
      this._shoppingCart.resetAll();
      this._snackBar.open(currOrder.customerName + ", Спасибо за заказ! Ожидайте курьера в течении часа.","x", {
        duration: 10000,
      });
      this._router.navigate(['/']);
    }
  }


  

}
