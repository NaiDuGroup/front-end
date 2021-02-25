import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoodFoodHttpService } from '../../../servicies';
import { Product } from '../../../types';

@Component({
  selector: 'app-hot-meals',
  templateUrl: './hot-meals.component.html',
  styleUrls: ['./hot-meals.component.scss']
})
export class HotMealsComponent implements OnInit {

  hotMealCategoryProducts$: Observable<Product[]>;

  constructor(
    private _service: GoodFoodHttpService
  ) { }

  ngOnInit(): void {
    this.hotMealCategoryProducts$ = this._service.getProductsByCategoryId(2);
  }

}
