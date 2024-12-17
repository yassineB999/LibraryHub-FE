import { KeycloakService } from 'keycloak-angular';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export function initializeKeycloak(keycloak: KeycloakService, platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      return keycloak.init({
        config: {
          url: 'http://localhost:6491',
          realm: 'library-hub-services',
          clientId: 'library-hub-api',
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
          pkceMethod: 'S256',
        },
      });
    }
    return Promise.resolve(true);
  };
}