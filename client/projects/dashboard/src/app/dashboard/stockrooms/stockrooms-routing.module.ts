import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateStockroomComponent } from './pages/create-stockroom/create-stockroom.component';
import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';
import { StockroomDetailsGuard } from '../../core/guards/stockroom-details.guard';
import { StockroomSummariesGuard } from '../../core/guards/stockroom-summaries.guard';

const routes: Routes = [
  {
    path: 'create',
    component: CreateStockroomComponent,
    data: { breadcrumb: 'Create' }
  },
  {
    path: 'manage',
    component: ManageStockroomsComponent,
    canActivate: [StockroomSummariesGuard],
    data: { breadcrumb: 'Manage' }
  },
  {
    path: ':id',
    canActivate: [StockroomDetailsGuard],
    component: StockroomDetailsComponent,
    data: { breadcrumb: 'Details' }
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
