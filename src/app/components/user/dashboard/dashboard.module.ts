import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarModule } from '../shared/navbar/navbar.module';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    ChartModule,
    CardModule,
    RippleModule,
    NavbarModule
  ]
})
export class DashboardModule { }
