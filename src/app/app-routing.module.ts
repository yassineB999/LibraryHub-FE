import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // ROUTES FOR VISITOR
  { path: 'LibraryHub/Home', loadChildren: () => import('./components/visitor/home/home.module').then(m => m.HomeModule) },
  // END ROUTES FOR VISITOR



  // ROUTES FOR USER
  { path: 'LibraryHub/User/Dashboard', loadChildren: () => import('./components/user/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'LibraryHub/User/Books', loadChildren: () => import('./components/user/books/books.module').then(m => m.BooksModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_USER'] }},
  { path: 'LibraryHub/User/Reservations', loadChildren: () => import('./components/user/reservations/reservations.module').then(m => m.ReservationsModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_USER'] }},


  // END ROUTES FOR USER



  // ROUTES FOR ADMIN
  { path: 'LibraryHub/Admin/Dashboard', loadChildren: () => import('./components/user/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'LibraryHub/Admin/Books', loadChildren: () => import('./components/user/books/books.module').then(m => m.BooksModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN'] }},
  { path: 'LibraryHub/Admin/Reservations', loadChildren: () => import('./components/user/reservations/reservations.module').then(m => m.ReservationsModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN'] }},
  { path: 'LibraryHub/Admin/UserManagement', loadChildren: () => import('./components/admin/usermanagment/usermanagment.module').then(m => m.UsermanagmentModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN'] } },

  // END ROUTES FOR ADMIN


   // ROUTES FOR TEACHER
  { path: 'LibraryHub/Admin/BookManagement', loadChildren: () => import('./components/admin/bookmanagement/bookmanagement.module').then(m => m.BookmanagementModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_TEACHER'] } },


  // WRONG PATH URL
  { path: '', redirectTo: 'LibraryHub/Home', pathMatch: 'full' },
  { path: '**', redirectTo: 'LibraryHub/Home' }
  // END WRONG PATH URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
