import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Routing and Component
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

// Shared Modules
import { NavbarModule } from '../shared/navbar/navbar.module';

// PrimeNG Services
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ReservationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReservationsRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    CalendarModule,
    NavbarModule,
    ConfirmDialogModule,
    ToastModule,
    SelectButtonModule,
    ProgressSpinnerModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ReservationsModule { }
