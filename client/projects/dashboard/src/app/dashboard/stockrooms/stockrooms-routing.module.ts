import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: StockroomDetailsComponent
  },
  {
    path: 'manage',
    component: ManageStockroomsComponent
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
