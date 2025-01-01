import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermanagmentComponent } from './usermanagment.component';

const routes: Routes = [{ path: '', component: UsermanagmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermanagmentRoutingModule { }
