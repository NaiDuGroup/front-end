import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoodFoodHttpService } from '../../servicies';
import { Product } from '../../types';

@Component({
  selector: 'app-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss']
})
export class FullMenuComponent implements OnInit {

  soupCategoryProducts$: Observable<Product[]>;
  hotMealCategoryProducts$: Observable<Product[]>;
  breakfastCategoryProducts$: Observable<Product[]>;
  dessertCategoryProducts$: Observable<Product[]>;

  constructor(
    private _service: GoodFoodHttpService
  ) { }

  ngOnInit(): void {
    this.soupCategoryProducts$ = this._service.getProductsByCategoryId(1);
    this.hotMealCategoryProducts$ = this._service.getProductsByCategoryId(2);
    this.breakfastCategoryProducts$ = this._service.getProductsByCategoryId(3);
    this.dessertCategoryProducts$ = this._service.getProductsByCategoryId(4);
  }

}
