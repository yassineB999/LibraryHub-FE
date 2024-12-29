import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  username: string | undefined = '';
  userRoles: string[] = [];
  isMenuVisible: boolean = false;
  isMobileView: boolean = window.innerWidth <= 768;

  constructor(
    private keycloak: KeycloakService,
    private router: Router
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isMenuVisible = false;
    }
  }

  async ngOnInit() {
    await this.initializeUser();
    this.initializeMenu();
  }

  private async initializeUser() {
    try {
      if (await this.keycloak.isLoggedIn()) {
        const userProfile = await this.keycloak.loadUserProfile();
        this.username = (userProfile.firstName + " " + userProfile.lastName) || userProfile.username || '';
        this.userRoles = await this.keycloak.getUserRoles(true); // true to get only realm roles
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.username = '';
      this.userRoles = [];
    }
  }

  private initializeMenu() {
    // Common menu items for all users
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: [this.userRoles.includes('ROLE_ADMIN') ? '/LibraryHub/Admin/Dashboard' : '/LibraryHub/User/Dashboard'],
        command: () => this.closeMenu()
      },
      {
        label: 'Books',
        icon: 'pi pi-book',
        routerLink: [this.userRoles.includes('ROLE_ADMIN') ? '/LibraryHub/Admin/Books' : '/LibraryHub/User/Books'],
        command: () => this.closeMenu()
      },
      {
        label: 'My Reservations',
        icon: 'pi pi-calendar',
        routerLink: [this.userRoles.includes('ROLE_ADMIN') ? '/LibraryHub/Admin/Reservations' : '/LibraryHub/User/Reservations'],
        command: () => this.closeMenu()
      }
    ];

    // Role-based menu items
    if (this.userRoles.includes('ROLE_ADMIN')) {
      this.menuItems.push(
        {
          label: 'Users Management',
          icon: 'pi pi-users',
          routerLink: ['/admin/users'],
          command: () => this.closeMenu()
        },
        {
          label: 'Books Management',
          icon: 'pi pi-book',
          routerLink: ['/admin/books'],
          command: () => this.closeMenu()
        }
      );
    }

    // User menu items
    this.userMenuItems = [
      {
        label: this.username,
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: ['/profile'],
            command: () => this.closeMenu()
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: ['/settings'],
            command: () => this.closeMenu()
          },
          {
            separator: true
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      }
    ];
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  closeMenu() {
    if (this.isMobileView) {
      this.isMenuVisible = false;
    }
  }

  async logout() {
    try {
      await this.keycloak.logout(window.location.origin);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}