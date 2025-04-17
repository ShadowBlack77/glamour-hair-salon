import { Routes } from '@angular/router';
import { AboutPageComponent, HomePageComponent, RootPageComponent } from './pages';
import { LoadProductsResolver } from './features';

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
      }
    ]
  }
];
