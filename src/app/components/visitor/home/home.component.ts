import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  selectedCategory: string = 'all';
  categories = ['All', 'Fiction', 'Non-Fiction', 'Science', 'History'];
  
  trendingBooks = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'assets/images/book1.jpg',
      rating: 4.5,
      category: 'Fiction'
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      cover: 'assets/images/book2.jpg',
      rating: 4.8,
      category: 'Non-Fiction'
    },
    {
      title: 'Brief History of Time',
      author: 'Stephen Hawking',
      cover: 'assets/images/book3.jpg',
      rating: 4.7,
      category: 'Science'
    }
  ];

  features = [
    {
      title: 'Secured',
      description: 'Enterprise-grade security powered by Keycloak authentication server',
      icon: 'pi pi-shield',
      iconBg: '#2196F3'
    },
    {
      title: 'Fast & Reliable',
      description: 'High-performance Spring Boot backend with optimized database queries',
      icon: 'pi pi-bolt',
      iconBg: '#4CAF50'
    },
    {
      title: 'User Friendly',
      description: 'Intuitive interface built with Angular and PrimeNG components',
      icon: 'pi pi-users',
      iconBg: '#FF9800'
    },
    {
      title: 'Modern Stack',
      description: 'Built with Spring Boot, Angular, MongoDB, PostgreSQL, and Keycloak',
      icon: 'pi pi-code',
      iconBg: '#9C27B0'
    }
  ];
  
  private scrollHandler: (() => void) | null = null;
  isMenuOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private keycloak: KeycloakService
  ) {}

  ngOnInit() {
    this.initializeMenu();
    
    if (isPlatformBrowser(this.platformId)) {
      this.scrollHandler = this.onWindowScroll.bind(this);
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const header = document.querySelector('.header') as HTMLElement;
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }
  }

  private initializeMenu() {
    this.menuItems = [
      {
        label: 'Explore',
        icon: 'pi pi-compass',
        items: [
          { label: 'Categories', icon: 'pi pi-list' },
          { label: 'New Releases', icon: 'pi pi-star' },
          { label: 'Popular', icon: 'pi pi-chart-line' }
        ]
      },
      {
        label: 'Community',
        icon: 'pi pi-users'
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle'
      }
    ];
  }

  selectCategory(category: string) {
    this.selectedCategory = category.toLowerCase();
  }

  async login() {
    try {
      await this.keycloak.login({
        redirectUri: window.location.origin + '/LibraryHub/User/Dashboard'
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  getFilteredBooks() {
    if (this.selectedCategory === 'all') {
      return this.trendingBooks;
    }
    return this.trendingBooks.filter(book => 
      book.category.toLowerCase() === this.selectedCategory
    );
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Close menu after clicking a link on mobile
      if (window.innerWidth <= 768) {
        this.isMenuOpen = false;
      }
    }
  }
}