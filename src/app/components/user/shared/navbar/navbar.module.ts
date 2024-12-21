import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    MenuModule,
    ButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
