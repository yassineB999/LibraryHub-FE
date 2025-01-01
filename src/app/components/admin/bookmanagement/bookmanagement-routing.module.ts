import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmanagementComponent } from './bookmanagement.component';

const routes: Routes = [{ path: '', component: BookmanagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmanagementRoutingModule { }
