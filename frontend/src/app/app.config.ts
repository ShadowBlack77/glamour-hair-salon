import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthService, ENV_CONFIG } from '@glamour/core';
import { environemnt } from '../env/environments';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { productsReducer } from './features/products/store/products.reducer';
import { ProductsEffects } from './features/products/store/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({
      products: productsReducer
    }), 
    provideEffects([
      ProductsEffects
    ]),
    provideHttpClient(),
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
    }
  ]
};
