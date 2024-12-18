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
          clientId: 'library-hub-api'
        },
        loadUserProfileAtStartUp: false,
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          checkLoginIframe: false,
          pkceMethod: 'S256',
        },
      });
    }
    return Promise.resolve(true);
  };
}