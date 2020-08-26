import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { CategoriesGuard, ProductItemDetailsGuard } from '@dashboard/core/guards';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageProductItemsComponent,
    canActivate: [CategoriesGuard],
    data: { breadcrumb: 'Manage' }
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
