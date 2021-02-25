import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ShoppingCartService } from '../../servicies';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  amountOfItems: number = 0;

  private _sub: Subscription;

  constructor(
    private _shoppingCart: ShoppingCartService,
  ) { 
    this._sub = new Subscription();
  }

  ngOnInit(): void {
    this._sub.add(
      this._shoppingCart.getTotalPriceOfItems().pipe(
        tap((resp) => this.amountOfItems = resp)
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }
}
