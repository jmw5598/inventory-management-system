import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StockroomsGuard } from '@dashboard/core/guards';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [StockroomsGuard],
    data: { breadcrumb: 'Dashbaord' },
    children: [
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        data: { breadcrumb: 'Account' }
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'items',
        loadChildren: () => import('./items/items.module').then(m => m.ItemsModule),
        data: { breadcrumb: 'Items' }
      },
      {
        path: 'product-items',
        loadChildren: () => import('./product-items/product-items.module').then(m => m.ProductItemsModule),
        data: { breadcrumb: 'Product Items' }
      },
      {
        path: 'stock-items',
        loadChildren: () => import('./stock-items/stock-items.module').then(m => m.StockItemsModule),
        data: { breadcrumb: 'Stock Items' }
      },
      {
        path: 'stockrooms',
        loadChildren: () => import('./stockrooms/stockrooms.module').then(m => m.StockroomsModule),
        data: { breadcrumb: 'Stockrooms' }
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      } 
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }