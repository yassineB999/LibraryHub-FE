import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsermanagmentRoutingModule } from './usermanagment-routing.module';
import { UsermanagmentComponent } from './usermanagment.component';
import { NavbarModule } from '../../user/shared/navbar/navbar.module';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    UsermanagmentComponent
  ],
  imports: [
    CommonModule,
    UsermanagmentRoutingModule,
    FormsModule,
    NavbarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    TooltipModule,
    DialogModule,
    DropdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsermanagmentModule { }
