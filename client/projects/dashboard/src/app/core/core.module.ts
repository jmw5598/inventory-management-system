import { NgModule, APP_INITIALIZER, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { resetStateOnLogout } from './store/reducers/global-meta.reducer';
import { AuthenticationEffects } from './store/effects/authentication.effects';
import { authenticatedUserInitializer } from './initializers/authenticated-user.initializer';
import { AccountEffects } from './store/effects/account.effects';
import { accountReducer } from './store/reducers/account.reducer';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { authenticationReducer } from './store/reducers/authentication.reducer';
import { HttpErrorEffects } from './store/effects/http-error.effects';
import { CategoryEffects } from './store/effects/category.effects';
import { categoryReducer } from './store/reducers/category.reducer';
import { PlanEffects } from './store/effects/plan.effects';
import { planReducer } from './store/reducers/plan.reducer';
import { PlatformEffects } from './store/effects/platform.effects';
import { platformReducer } from './store/reducers/platform.reducer';
import { ProductItemEffects } from './store/effects/product-item.effects';
import { productItemReducer } from './store/reducers/product-item.reducer';
import { ItemConditionEffects } from './store/effects/item-condition.effects';
import { itemConditionReducer } from './store/reducers/item-condition.reducer';
import { StockItemEffects } from './store/effects/stock-item.effects';
import { stockItemReducer } from './store/reducers/stock-item.reducer';
import { StockroomEffects } from './store/effects/stockroom.effects';
import { stockroomReducer } from './store/reducers/stockroom.reducer';
import { AuthenticationService } from '@inv/core';

const jwtTokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtTokenInterceptor,
  multi: true
}

const authenticationAppInitializer = { 
  provide: APP_INITIALIZER, 
  useFactory: authenticatedUserInitializer, 
  multi: true,
  deps: [Store, AuthenticationService]
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      accounts: accountReducer,
      authentication: authenticationReducer,
      stockrooms: stockroomReducer,
      platforms: platformReducer,
      itemConditions: itemConditionReducer,
      categories: categoryReducer,
      plans: planReducer,
      productItems: productItemReducer,
      stockItems: stockItemReducer,
    }, { metaReducers: [resetStateOnLogout] }),
    EffectsModule.forRoot([
      AccountEffects,
      AuthenticationEffects,
      PlatformEffects,
      HttpErrorEffects,
      StockroomEffects,
      ItemConditionEffects,
      CategoryEffects,
      PlanEffects,
      ProductItemEffects,
      StockItemEffects,
    ]),
    HttpClientModule,
  ],
  providers: [
    jwtTokenInterceptor,
    authenticationAppInitializer,
  ]
})
export class CoreModule { }
