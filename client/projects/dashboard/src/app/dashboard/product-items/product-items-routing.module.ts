import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { EditProductItemComponent } from './pages/edit-product-item/edit-product-item.component';
import { CategoriesGuard, ProductItemDetailsGuard } from '@dashboard/core/guards';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageProductItemsComponent,
    canActivate: [CategoriesGuard],
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
