import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit {

  totalPrice: number = 0;
  cartItems: Product[] = [];

  productCountMap: {} = {};
  cartItemsToDisplay: Product[] = [];

  private _totalPrice;
  private _cartItems;
  private _cartItemsToDisplay;
  private _productCountMap;

  constructor() {
    if(localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      this._totalPrice = new BehaviorSubject < number > (cart.totalPrice);
      this._cartItems = new BehaviorSubject < Product[] > (cart.cartItems);
      this._cartItemsToDisplay = new BehaviorSubject < Product[] > (cart.cartItemsToDisplay);
      this._productCountMap = new BehaviorSubject < {} > (cart.productCountMap);
    } else {
      this._totalPrice = new BehaviorSubject < number > (this.totalPrice);
      this._cartItems = new BehaviorSubject < Product[] > (this.cartItems);
      this._cartItemsToDisplay = new BehaviorSubject < Product[] > (this.cartItemsToDisplay);
      this._productCountMap = new BehaviorSubject < {} > (this.productCountMap);
    }
  }

  ngOnInit() {
    
  }

  addItem(product: Product) {
    this.totalPrice += product.itemPrice;
    this.cartItems.push(product);
    this.productCountMap = this.prepareProductCountMap(this.cartItems);
    this.cartItemsToDisplay = this.prepareToDisplay(this.cartItems);
    this._saveToLocalStorage();

    this._cartItems.next(this.cartItems);
    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));
    this._totalPrice.next(this.totalPrice);
  }

  deleteItem(product: Product) {
    const tempP = this.cartItems.length;
    this.cartItems = this.cartItems.filter(item => item.itemId != product.itemId);
    const tempN = this.cartItems.length;

    this.totalPrice = this.totalPrice - (product.itemPrice * (tempP - tempN));
    this.productCountMap = this.prepareProductCountMap(this.cartItems);
    this.cartItemsToDisplay = this.prepareToDisplay(this.cartItems);
    this._saveToLocalStorage();

    this._cartItems.next(this.cartItems);
    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));
    this._totalPrice.next(this.totalPrice);
  }

  deleteOneItem(product: Product): void {
    let tempId = 0;
    
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].itemId == product.itemId) {
        tempId = i;
      }
    }

    if (tempId >= 0) {
      this.cartItems.splice(tempId, 1);
    }

    this.totalPrice -= product.itemPrice;
    this.productCountMap = this.prepareProductCountMap(this.cartItems);
    this.cartItemsToDisplay = this.prepareToDisplay(this.cartItems);
    this._saveToLocalStorage();

    this._cartItems.next(this.cartItems);
    this._totalPrice.next(this.totalPrice);
    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));
  }

  getTotalPriceOfItems(): Observable < number > {
    return this._totalPrice.asObservable();
  }

  getCartItems(): Observable < Product[] > {
    return this._cartItems.asObservable();
  }

  getCartItemsToDisplay(): Observable < Product[] > {
    return this._cartItemsToDisplay.asObservable();
  }

  getProductCountMap(): Observable <{}> {
    return this._productCountMap.asObservable();
  }

  prepareProductCountMap(cartItems: Product[]): object {
    return cartItems.reduce((acc: {[key: string]: number }, curr ) => {
      if (!acc[curr.itemId]) {
        acc[curr.itemId] = 0
      }

      acc[curr.itemId] += 1;

      return acc;
    }, {});
  }

  prepareToDisplay(cartItems: Product[]): Product[] {
    return this.cartItems.reduce((acc: Product[], curr) => {
      if (acc.find((el) => el.itemId === curr.itemId)) {
        return acc;
      }

      acc.push(curr);

      return acc;
    }, []);
  }

  resetAll(): void {
    this.totalPrice = 0;
    this.cartItems = [];
    this.productCountMap = null;
    this.cartItems = [];
    this._saveToLocalStorage();

    this._cartItems.next(this.cartItems);
    this._totalPrice.next(this.totalPrice);
    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));
  }

  private _saveToLocalStorage() {
    let cart = {
      totalPrice: this.totalPrice,
      cartItems: this.cartItems,
      productCountMap: this.productCountMap,
      cartItemsToDisplay: this.cartItemsToDisplay
    }
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}
