import { Routes } from '@angular/router';
import { AboutPageComponent, HomePageComponent, RootPageComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    component: RootPageComponent,
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
