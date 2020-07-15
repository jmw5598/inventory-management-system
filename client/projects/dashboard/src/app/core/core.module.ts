import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthenticationEffects } from './store/effects/authentication.effects';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { authenticationReducer } from './store/reducers/authentication.reducer';
import { StockroomEffects } from './store/effects/stockroom.effects';
import { stockroomReducer } from './store/reducers/stockroom.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      authentication: authenticationReducer,
      stockrooms: stockroomReducer 
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      StockroomEffects
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
