import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiGoodFoodGetProductsByCategoryId, apiGoodFoodSendOrder } from '../api';
import { Order } from '../types';

@Injectable({
  providedIn: 'root'
})
export class GoodFoodHttpService {

  constructor(
    private _http: HttpClient
  ) {}

  getProductsByCategoryId(category: number): Observable <any> {
    return this._http.get<Observable<any>>(apiGoodFoodGetProductsByCategoryId(), {
      params: {
        categoryId: category.toString()
      }
    })
  }

  sendOrder(order: Order): Observable<any> {
    return this._http.post<Order>(apiGoodFoodSendOrder(), order);
  }
}
