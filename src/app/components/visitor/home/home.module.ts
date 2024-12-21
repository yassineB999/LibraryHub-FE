import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    // Angular Modules
    CommonModule,
    HomePageRoutingModule,
    
    // PrimeNG Modules
    ButtonModule,
    CardModule,
    CarouselModule,
    DividerModule,
    ImageModule,
    MenubarModule,
    RippleModule,
    ToolbarModule
  ]
})
export class HomeModule { }
