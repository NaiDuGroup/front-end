import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoodFoodHttpService } from '../../../servicies';
import { Product } from '../../../types';

@Component({
  selector: 'app-soups',
  templateUrl: './soups.component.html',
  styleUrls: ['./soups.component.scss']
})
export class SoupsComponent implements OnInit {

  soupCategoryProducts$: Observable<Product[]>;

  constructor(
    private _service: GoodFoodHttpService
  ) { }

  ngOnInit(): void {
    this.soupCategoryProducts$ = this._service.getProductsByCategoryId(1);
  }

}
