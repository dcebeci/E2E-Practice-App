import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'checkout', 
        loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent) 
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
