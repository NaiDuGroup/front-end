import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoodFoodHttpService } from '../../../servicies';
import { Product } from '../../../types';

@Component({
  selector: 'app-breakfasts',
  templateUrl: './breakfasts.component.html',
  styleUrls: ['./breakfasts.component.scss']
})
export class BreakfastsComponent implements OnInit {

  breakfastCategoryProducts$: Observable<Product[]>;

  constructor(
    private _service: GoodFoodHttpService
  ) { }

  ngOnInit(): void {
    this.breakfastCategoryProducts$ = this._service.getProductsByCategoryId(3);
  }

}
