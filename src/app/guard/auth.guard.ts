import { Injectable } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { PLATFORM_ID, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuard extends KeycloakAuthGuard {
  private platformId = inject(PLATFORM_ID);

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Allow access during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }

    // Get the roles required from the route.
    const requiredRoles: string[] = route.data['expectedRoles'];

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    try {
      const userRoles = this.keycloak.getUserRoles();
      return requiredRoles.some((role: string) => userRoles.includes(role));
    } catch (error) {
      console.error('Error checking user roles:', error);
      return false;
    }
  }
}