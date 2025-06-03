import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { environemnt } from '../env/environments';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { productsReducer } from '../../libs/glamour/products/src/lib/store/products.reducer';
import { ProductsEffects } from '../../libs/glamour/products/src/lib/store/products.effects';
import { ENV_CONFIG } from '@lib/core/environments';
import { AuthInterceptor, AuthService } from '@lib/auth';
import { bookingReducer } from '../../libs/glamour/booking/src/lib/store/booking.reducer';
import { BookingEffects } from '../../libs/glamour/booking/src/lib/store/booking.effects';
import { cartReducer } from '../../libs/glamour/cart/src/lib/store/cart.reducer';
import { CartEffects } from '../../libs/glamour/cart/src/lib/store/cart.effects';
import { payoutsReducer } from '../../libs/glamour/payouts/src/lib/store/payouts.reducer';
import { PayoutsEffects } from '../../libs/glamour/payouts/src/lib/store/payouts.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({
      products: productsReducer,
      cart: cartReducer,
      payouts: payoutsReducer,
      booking: bookingReducer
    }), 
    provideEffects([
      ProductsEffects,
      CartEffects,
      PayoutsEffects,
      BookingEffects
    ]),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (authSerivce: AuthService) => {
        return () => authSerivce.init();
      },
      multi: true,
      deps: [AuthService]
    },
    {
      provide: ENV_CONFIG,
      useValue: {
        backendUrl: environemnt.backendUrl,
        apiKey: environemnt.apiKey,
        stripePublicKey: environemnt.stripePublicKey
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
