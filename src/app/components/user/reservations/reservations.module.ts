import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { NavbarModule } from '../shared/navbar/navbar.module';

@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReservationsRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SelectButtonModule,
    TooltipModule,
    ProgressSpinnerModule,
    CardModule,
    DialogModule,
    CalendarModule,
    NavbarModule
  ]
})
export class ReservationsModule { }
