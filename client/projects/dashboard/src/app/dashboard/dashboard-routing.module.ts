import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StockroomsGuard } from '../core/guards/stockrooms.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [StockroomsGuard],
    children: [
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'items',
        loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
      },
      {
        path: 'stockrooms',
        loadChildren: () => import('./stockrooms/stockrooms.module').then(m => m.StockroomsModule)
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