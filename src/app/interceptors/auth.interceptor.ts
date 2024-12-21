import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if user is logged in
    if (!this.keycloak.isLoggedIn()) {
      console.log('User is not logged in');
      return next.handle(request);
    }

    // Get token
    return from(this.keycloak.getToken()).pipe(
      switchMap(token => {
        console.log('Got token:', token ? 'yes' : 'no');
        
        if (token) {
          const authRequest = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          console.log('Making request to:', request.url);
          console.log('With headers:', authRequest.headers.keys());
          
          return next.handle(authRequest);
        }
        return next.handle(request);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        
        if (error.status === 401) {
          console.log('Got 401, trying to refresh token');
          return from(this.keycloak.updateToken(20)).pipe(
            switchMap(() => {
              console.log('Token refreshed, retrying request');
              return this.intercept(request, next);
            }),
            catchError(refreshError => {
              console.error('Token refresh failed:', refreshError);
              this.keycloak.login();
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
