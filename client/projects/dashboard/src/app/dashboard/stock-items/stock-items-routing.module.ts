import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateStockItemComponent } from './pages/create-stock-item/create-stock-item.component';
import { EditStockItemComponent } from './pages/edit-stock-item/edit-stock-item.component';
import { ManageStockItemsComponent } from './pages/manage-stock-items/manage-stock-items.component';
import { CategoriesGuard, ItemConditionsGuard, StockroomsGuard } from '@dashboard/core/guards';

const routes: Routes = [
  {
    path: 'create',
    component: CreateStockItemComponent,
    canActivate: [CategoriesGuard, ItemConditionsGuard, StockroomsGuard],
    data: { breadcrumb: 'Create' }
  },
  {
    path: 'manage',
    component: ManageStockItemsComponent,
    canActivate: [
      CategoriesGuard,
      ItemConditionsGuard,
      StockroomsGuard
    ],
    data: { breadcrumb: 'Manage ' }
  },
  {
    path: ':id',
    data: { breadcrumb: '' },
    children: [
      {
        path: 'edit',
        component: EditStockItemComponent,
        data: { breadcrumb: 'Edit' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'manage',
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockItemsRoutingModule { }
