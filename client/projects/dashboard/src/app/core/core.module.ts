import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthenticationEffects } from './store/effects/authentication.effects';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { authenticationReducer } from './store/reducers/authentication.reducer';
import { HttpErrorEffects } from './store/effects/http-error.effects';
import { CategoryEffects } from './store/effects/category.effects';
import { categoryReducer } from './store/reducers/category.reducer';
import { PlanEffects } from './store/effects/plan.effects';
import { planReducer } from './store/reducers/plan.reducer';
import { PlatformEffects } from './store/effects/platform.effects';
import { platformReducer } from './store/reducers/platform.reducer';
import { ItemConditionEffects } from './store/effects/item-condition.effects';
import { itemConditionReducer } from './store/reducers/item-condition.reducer';
import { StockroomEffects } from './store/effects/stockroom.effects';
import { stockroomReducer } from './store/reducers/stockroom.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      authentication: authenticationReducer,
      stockrooms: stockroomReducer,
      platforms: platformReducer,
      itemConditions: itemConditionReducer,
      categories: categoryReducer,
      plans: planReducer,
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      PlatformEffects,
      HttpErrorEffects,
      StockroomEffects,
      ItemConditionEffects,
      CategoryEffects,
      PlanEffects,
    ]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
