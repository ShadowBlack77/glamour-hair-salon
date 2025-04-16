import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthService, ENV_CONFIG } from '@glamour/core';
import { environemnt } from '../env/environments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore(), 
    provideEffects(),
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
        apiUrl: environemnt.backendUrl,
        apiKey: environemnt.apiKey
      }
    }
  ]
};
