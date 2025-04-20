import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthInterceptor, AuthService, ENV_CONFIG } from '@glamour/core';
import { environemnt } from '../env/environments';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { productsReducer } from './features/products/store/products.reducer';
import { ProductsEffects } from './features/products/store/products.effects';
import { CartEffects } from './features/cart/store/cart.effects';
import { cartReducer } from './features/cart/store/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({
      products: productsReducer,
      cart: cartReducer
    }), 
    provideEffects([
      ProductsEffects,
      CartEffects
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
        apiKey: environemnt.apiKey
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
