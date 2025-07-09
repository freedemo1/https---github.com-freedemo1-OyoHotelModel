// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    loadComponent: () =>
       import('./auth/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  // {
  //   path: '',
  //   redirectTo: 'auth/login', // 👈 use only one default route
  //   pathMatch: 'full'
  // },
  {
  path: 'profile',
  loadComponent: () => import('./auth/profile/profile.component').then(m => m.ProfileComponent)
},
{
  path: 'user/bookings',
  loadComponent: () => import('./user/booking-history/booking-history.component').then(m => m.BookingHistoryComponent)
},
{
  path: 'home',
  loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
},
{
  path: 'hotels/:locality',
  loadComponent: () => import('./hotels/hotel-list.component').then(m => m.HotelListComponent)
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
];
