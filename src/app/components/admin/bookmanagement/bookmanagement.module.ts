import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookmanagementRoutingModule } from './bookmanagement-routing.module';
import { BookmanagementComponent } from './bookmanagement.component';
import { NavbarModule } from '../../user/shared/navbar/navbar.module';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    BookmanagementComponent
  ],
  imports: [
    CommonModule,
    BookmanagementRoutingModule,
    FormsModule,
    NavbarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    TooltipModule,
    DialogModule,
    InputNumberModule,
    ChipsModule,
    MultiSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookmanagementModule { }
