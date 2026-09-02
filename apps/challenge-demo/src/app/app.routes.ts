import { Route } from '@angular/router';
import { Home } from './feature/home/home';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('@ecommerce-challenge-v1/catalog-feature').then(
            (m) => m.ProductListComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('@ecommerce-challenge-v1/cart-feature').then(
            (m) => m.CartPageComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];
