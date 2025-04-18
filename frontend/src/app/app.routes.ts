import { Routes } from '@angular/router';
import { AboutPageComponent, HomePageComponent, ProductsPageComponent, RootPageComponent, SignInPageComponent, SignUpPageComponent } from './pages';
import { LoadProductsResolver } from './features';
import { AuthGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    component: RootPageComponent,
    resolve: [
      LoadProductsResolver
    ],
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'store',
        component: ProductsPageComponent
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sign-in',
        component: SignInPageComponent
      },
      {
        path: 'sign-up',
        component: SignUpPageComponent
      }
    ]
  }
];
