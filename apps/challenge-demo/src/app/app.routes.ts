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
        redirectTo: 'appointments',
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('@ecommerce-challenge-v1/appointments-feature').then(
            (m) => m.AppointmentsPageComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'appointments',
      },
    ],
  },
];
