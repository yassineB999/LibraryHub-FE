import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // ROUTES FOR VISITOR
  { path: 'LibraryHub/Home', loadChildren: () => import('./components/visitor/home-page/home-page.module').then(m => m.HomePageModule) },
  // END ROUTES FOR VISITOR



  // ROUTES FOR USER
  { path: 'LibraryHub/User/Books', loadChildren: () => import('./components/user/books/books.module').then(m => m.BooksModule), canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_USER'] }},
  // END ROUTES FOR USER



  // ROUTES FOR ADMIN

  // END ROUTES FOR ADMIN



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
