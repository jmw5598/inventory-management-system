import { NgModule, ModuleWithProviders } from '@angular/core';
import { InvCoreConfig, INV_CORE_CONFIG } from './inv-core.config';

import { AccountsService } from './services/accounts.service';
import { AuthenticationService } from './services/authentication.service';
import { CategoriesService } from './services/categories.service';
import { InvoicesService } from './services/invoices.service';
import { ItemConditionsService } from './services/item-conditions.service';
import { ListedItemsService } from './services/listed-items.service';
import { PlansService } from './services/plans.service';
import { PlatformsService } from './services/platforms.service';
import { ProductItemsService } from './services/product-items.service';
import { ProfilesService } from './services/profiles.service';
import { StockroomsService } from './services/stockrooms.service';

const providers: any[] = [
  AccountsService,
  AuthenticationService,
  CategoriesService,
  InvoicesService,
  ItemConditionsService,
  ListedItemsService,
  PlansService,
  PlatformsService,
  ProductItemsService,
  ProfilesService,
  StockroomsService,
];

@NgModule({})
export class InvCoreModule {
  public static forRoot(config: InvCoreConfig): ModuleWithProviders {
    return {
      ngModule: InvCoreModule,
      providers: [
        ...providers,
        {
          provide: INV_CORE_CONFIG,
          useValue: config
        }
      ]
    }
  }
}
