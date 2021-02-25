import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ShoppingCartService } from '../../servicies';
import { Product } from '../../types';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit, OnDestroy {

  cartItems: Product[];
  productCountMap: {} = {};
  totalPrice: number = 0;

  private _sub: Subscription;

  constructor(
    private _shoppingCart: ShoppingCartService
  ) {
    this._sub = new Subscription();
  }

  ngOnInit(): void {
    this._sub.add(
      this._shoppingCart.getCartItemsToDisplay().pipe(
        tap((cartItems) => this.cartItems = cartItems)
      ).subscribe()
    );

    this._sub.add(
      this._shoppingCart.getProductCountMap().pipe(
        tap((countMap) => this.productCountMap = countMap)
      ).subscribe()
    )

    this._sub.add(
      this._shoppingCart.getTotalPriceOfItems().pipe(
        tap((total) => this.totalPrice = total)
      ).subscribe()
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  addOneToCart(product: Product): void {
    this._shoppingCart.addItem(product);
  }

  subOneFromCart(product: Product): void {
    this._shoppingCart.deleteOneItem(product);
  }

  deleteItem(product: Product): void {
    this._shoppingCart.deleteItem(product);
  }
}
