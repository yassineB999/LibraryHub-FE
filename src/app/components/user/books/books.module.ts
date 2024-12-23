import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './books.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { BooksRoutingModule } from './books-routing.module';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    NavbarModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SelectButtonModule,
    TableModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ChipModule,
    DialogModule,
    CalendarModule
  ]
})
export class BooksModule { }
