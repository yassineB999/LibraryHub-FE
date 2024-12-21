import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakService } from 'keycloak-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { NavbarModule } from './components/user/shared/navbar/navbar.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NavbarModule],
  providers: [
    provideAnimationsAsync(),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, PLATFORM_ID],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
