import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BooksService } from '../../../service/api/books.service';

interface BookStats {
  borrowed: number;
  returned: number;
  reserved: number;
}

interface RecentBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: 'borrowed' | 'reserved' | 'returned';
  dueDate?: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  RID: string = 'U';
  bookStats: BookStats = {
    borrowed: 3,
    returned: 5,
    reserved: 1,
  };
  recentBooks: RecentBook[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      coverUrl: 'https://covers.openlibrary.org/b/id/11983442-M.jpg',
      status: 'borrowed',
      dueDate: new Date('2024-01-05')
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      coverUrl: 'https://covers.openlibrary.org/b/id/9269962-M.jpg',
      status: 'reserved',
      dueDate: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      coverUrl: 'https://covers.openlibrary.org/b/id/679461-M.jpg',
      status: 'returned'
    }
  ];
  chartData: any;
  chartOptions: any;

  constructor(
    private booksService: BooksService,
    private keycloak: KeycloakService
  ) {
    this.initChartData();
  }

  async ngOnInit() {
    try {
      // Ensure we're authenticated
      const isLoggedIn = await this.keycloak.isLoggedIn();
      if (!isLoggedIn) {
        console.log('User not logged in, redirecting to login');
        await this.keycloak.login();
        return;
      }

      // Load user profile
      const userProfile = await this.keycloak.loadUserProfile();
      this.username = userProfile.firstName || userProfile.username || '';
      
      // Check roles
      const roles = this.keycloak.getUserRoles();
      console.log('User roles:', roles);
      if (roles.includes('ROLE_ADMIN')) {
        this.RID = 'A';
      }

      // Get token and log it (for debugging)
      const token = await this.keycloak.getToken();
      console.log('Token available:', token ? 'yes' : 'no');

      this.initChartData();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
    }
  }

  private initChartData() {
    this.chartData = {
      labels: ['Borrowed', 'Reserved', 'Returned'],
      datasets: [
        {
          data: [
            this.bookStats.borrowed,
            this.bookStats.reserved,
            this.bookStats.returned
          ],
          backgroundColor: [
            '#42A5F5', // Light Blue
            '#FFA726', // Orange
            '#66BB6A'  // Green
          ],
          hoverBackgroundColor: [
            '#1E88E5', // Darker Blue
            '#FB8C00', // Darker Orange
            '#43A047'  // Darker Green
          ]
        }
      ]
    };

    this.chartOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: '#495057',
            usePointStyle: true,
            font: {
              size: 14
            }
          },
          position: 'bottom'
        }
      }
    };
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'borrowed':
        return 'status-borrowed';
      case 'reserved':
        return 'status-reserved';
      case 'returned':
        return 'status-returned';
      default:
        return '';
    }
  }

  formatDueDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }
}
