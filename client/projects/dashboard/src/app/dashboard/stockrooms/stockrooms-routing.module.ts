import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateStockroomComponent } from './pages/create-stockroom/create-stockroom.component';
import { EditStockroomComponent } from './pages/edit-stockroom/edit-stockroom.component';
import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';
import { StockroomDetailsGuard } from '../../core/guards/stockroom-details.guard';
import { StockroomSummariesGuard } from '../../core/guards/stockroom-summaries.guard';
import { StockItemsByStockroomGuard } from '../../core/guards/stock-items-by-stockroom.guard';

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
        path: 'edit',
        component: EditStockroomComponent,
        data: { breadcrumb: 'Edit' }
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
