import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CompleteFormComponent } from './components/complete-form/complete-form.component';

import { FullMenuComponent } from './components/full-menu/full-menu.component';
import { BreakfastsComponent } from './components/menu/breakfasts/breakfasts.component';
import { DessertsComponent } from './components/menu/desserts/desserts.component';
import { HotMealsComponent } from './components/menu/hot-meals/hot-meals.component';
import { SoupsComponent } from './components/menu/soups/soups.component';

const routes: Routes = [
  {
    path: '',
    component: FullMenuComponent
  },
  {
    path: 'breakfasts',
    component: BreakfastsComponent
  },
  {
    path: 'desserts',
    component: DessertsComponent
  },
  {
    path: 'hotMeals',
    component: HotMealsComponent
  },
  {
    path: 'soups',
    component: SoupsComponent
  },
  {
    path: 'cart',
    component: CartViewComponent
  },
  {
    path: 'order-form',
    component: CompleteFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
