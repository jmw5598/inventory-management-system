import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductItemComponent } from './pages/create-product-item/create-product-item.component';
import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { EditProductItemComponent } from './pages/edit-product-item/edit-product-item.component';
import { CategoriesGuard } from '../../core/guards/categories.guard';
import { ProductItemDetailsGuard } from '../../core/guards/product-item-details.guard';

const routes: Routes = [
  {
    path: 'create',
    component: CreateProductItemComponent,
    canActivate: [CategoriesGuard],
    data: { breadcrumb: 'Create' }
  },
  {
    path: 'manage',
    component: ManageProductItemsComponent,
    data: { breadcrumb: 'Manage' }
  },
  {
    path: ':id',
    data: { breadcrumb: '' },
    children: [
      {
        path: 'edit',
        component: EditProductItemComponent,
        canActivate: [CategoriesGuard, ProductItemDetailsGuard],
        data: { breadcrumb: 'Edit' }
      },
      {
        path: '***',
        redirectTo: 'edit',
        pathMatch: 'full'
      },
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
export class ProductItemsRoutingModule { }
