import { Routes } from '@angular/router';
import { AboutPageComponent, AdminPageComponent, DashboardPageComponent, HomePageComponent, NotFoundPageComponent, ProductsPageComponent, RootPageComponent, SignInPageComponent, SignUpPageComponent } from './pages';
import { LoadProductsResolver } from './features';
import { AdminRoleGuard, AuthGuard, UserRoleGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    component: RootPageComponent,
    canActivate: [
      UserRoleGuard
    ],
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
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminRoleGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
