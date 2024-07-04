import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout';
import { AnonymousGuard, AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'Home',
        },
      },
      {
        path: 'employee',
        loadComponent: () =>
          import('./employee/employee.component').then(
            (m) => m.EmployeeComponent
          ),
        data: {
          title: 'Employee',
        },
      },
      {
        path: 'employee/:id',
        loadComponent: () =>
          import('./employee-detail/employee-detail.component').then(
            (m) => m.EmployeeDetailComponent
          ),
        data: {
          title: 'Employee',
        },
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
        data: {
          title: 'Profile',
        },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [AnonymousGuard],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./page404/page404.component').then((m) => m.Page404Component),
    data: {
      title: 'Page 404',
    },
  },
  { path: '**', redirectTo: 'dashboard' },
];
