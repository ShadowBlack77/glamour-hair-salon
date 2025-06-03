import { Routes } from '@angular/router';
import { AdminRoleGuard, AuthGuard, ProtectGuard, UserRoleGuard } from '@lib/auth';
import { LoadBookingResolver } from '@lib/glamour/booking';
import { LoadCartResolver } from '@lib/glamour/cart';
import { SaveOrderResolver } from '@lib/glamour/payouts';
import { LoadProductsResolver } from '@lib/glamour/products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [
      UserRoleGuard,
    ],
    resolve: [
      LoadProductsResolver,
      LoadCartResolver
    ],
    loadComponent: () => import('./pages/user/root/root-page.component').then((c) => c.RootPageComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/user/root/home/home-page.component').then((c) => c.HomePageComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/user/root/about/about-page.component').then((c) => c.AboutPageComponent)
      },
      {
        path: 'store',
        loadComponent: () => import('./pages/user/root/products/products-page.component').then((c) => c.ProductsPageComponent)
      },
      {
        path: 'profile',
        resolve: [LoadBookingResolver],
        canActivate: [ProtectGuard],
        loadComponent: () => import('./pages/user/root/profile/profile-page.component').then((c) => c.ProfilePageComponent)
      },
      {
        path: 'cart',
        resolve: [
          LoadCartResolver
        ],
        canActivate: [ProtectGuard],
        loadComponent: () => import('./pages/user/root/cart/cart-page.component').then((c) => c.CartPageComponent)
      },
      {
        resolve: [
          SaveOrderResolver,
        ],
        path: 'purchase-success',
        loadComponent: () => import('./pages/user/root/purchase-success/purchase-success-page.component').then((c) => c.PurchaseSuccessPageComponent)
      },
      {
        path: 'purchase-cancel',
        loadComponent: () => import('./pages/user/root/purchase-cancel/purchase-cancel-page.component').then((c) => c.PurchaseCancelPageComponent)
      }
    ]
  },
  {
    path: 'auth',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/user/auth/sign-in/sign-in-page.component').then((c) => c.SignInPageComponent)
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/user/auth/sign-up/sign-up-page.component').then((c) => c.SignUpPageComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/user/auth/reset-password/reset-password-page.component').then((c) => c.ResetPasswordPageComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminRoleGuard],
    loadComponent: () => import('./pages/admin/admin-page.component').then((c) => c.AdminPageComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard-page.component').then((c) => c.DashboardPageComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/user/root/not-found/not-found-page.component').then((c) => c.NotFoundPageComponent)
  }
];
