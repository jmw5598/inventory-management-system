import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';
import { 
  StockroomDetailsGuard, 
  StockroomSummariesGuard, 
  StockItemsByStockroomGuard } from '@dashboard/core/guards';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageStockroomsComponent,
    canActivate: [StockroomSummariesGuard],
    data: { breadcrumb: 'Manage' }
  },
  {
    path: ':id',
    canActivate: [
      StockItemsByStockroomGuard,
      StockroomDetailsGuard
    ],
    data: { breadcrumb: '' },
    children: [
      {
        path: 'details',
        component: StockroomDetailsComponent,
        data: { breadcrumb: 'Details' }
      },
      {
        path: '**',
        redirectTo: 'details',
        pathMatch: 'full'
      }
    ] 
  },
  {
    path: '**',
    redirectTo: 'manage',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockroomsRoutingModule { }
