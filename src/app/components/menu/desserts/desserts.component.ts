import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoodFoodHttpService } from '../../../servicies';
import { Product } from '../../../types';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  dessertCategoryProducts$: Observable<Product[]>;

  constructor(
    private _service: GoodFoodHttpService
  ) { }

  ngOnInit(): void {
    this.dessertCategoryProducts$ = this._service.getProductsByCategoryId(4);
  }

}
