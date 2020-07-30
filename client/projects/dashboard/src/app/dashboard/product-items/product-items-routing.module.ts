import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductItemComponent } from './pages/create-product-item/create-product-item.component';
import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { UpdateProductItemComponent } from './pages/update-product-item/update-product-item.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateProductItemComponent,
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
        path: '',
        component: UpdateProductItemComponent,
        data: { breadcrumb: 'Details' }
      },
      {
        path: 'edit',
        component: UpdateProductItemComponent,
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
export class ProductItemsRoutingModule { }
