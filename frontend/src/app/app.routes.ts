import { Routes } from '@angular/router';
import { AboutPageComponent, AdminPageComponent, CartPageComponent, DashboardPageComponent, HomePageComponent, NotFoundPageComponent, ProductsPageComponent, ProfilePageComponent, PurchaseCancelPageComponent, PurchaseSuccessPageComponent, RootPageComponent, SignInPageComponent, SignUpPageComponent } from './pages';
import { LoadCartResolver, LoadProductsResolver, SaveOrderResolver } from './features';
import { AdminRoleGuard, AuthGuard, ProtectGuard, UserRoleGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: RootPageComponent,
    canActivate: [
      UserRoleGuard,
    ],
    resolve: [
      LoadProductsResolver,
      LoadCartResolver
    ],
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'store',
        component: ProductsPageComponent
      },
      {
        path: 'profile',
        canActivate: [ProtectGuard],
        component: ProfilePageComponent
      },
      {
        resolve: [
          LoadCartResolver
        ],
        path: 'cart',
        canActivate: [ProtectGuard],
        component: CartPageComponent
      },
      {
        resolve: [
          SaveOrderResolver,
        ],
        path: 'purchase-success',
        component: PurchaseSuccessPageComponent
      },
      {
        path: 'purchase-cancel',
        component: PurchaseCancelPageComponent
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
