import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    HomePageComponent
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
export class HomePageModule { }
