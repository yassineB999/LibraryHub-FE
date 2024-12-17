import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { 
    path: 'books', 
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule), 
    canActivate: [AuthGuard]   
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
