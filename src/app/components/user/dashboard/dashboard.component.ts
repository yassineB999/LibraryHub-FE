import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BooksService } from '../../../service/api/books.service';
import { UsersService } from '../../../service/api/users.service';

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
  showRoleDialog: boolean = false;
  selectedRole: string = '';
  bookStats: BookStats = {
    borrowed: 0,
    returned: 0,
    reserved: 0
  };
  recentBooks: RecentBook[] = [];
  chartData: any;
  chartOptions: any;

  constructor(
    private booksService: BooksService,
    private keycloak: KeycloakService,
    private usersService: UsersService
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

      // Check if account exists
      this.usersService.checkAccountExist().subscribe(
        (exists) => {
          console.log('Account exists:', exists);
          if (!exists) {
            this.showRoleDialog = true;
          }
        },
        (error) => {
          console.error('Error checking account:', error);
        }
      );

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

      this.loadDashboardStats();
    } catch (error) {
      console.error('Error in dashboard initialization:', error);
    }
  }

  loadDashboardStats() {
    this.usersService.getMyTotalDashboardInformation().subscribe({
      next: (response: any) => {
        this.bookStats = {
          borrowed: response.borrowsCount || 0,
          reserved: response.reservationsCount || 0,
          returned: response.returnedBorrowsCount || 0
        };

        this.recentBooks = response.recentReturnedBooks.map((book: any) => ({
          id: book.idBook,
          title: book.title,
          author: book.author,
          coverUrl: book.imageUrl,
          status: 'returned',
          dueDate: book.publicationYear
        }));
        this.initChartData();
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });
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
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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

  selectRole(role: string): void {
    this.selectedRole = role;
    this.createUser();
  }

  createUser(): void {
    this.usersService.createKeyCloakUser(this.selectedRole).subscribe(
      response => {
        if (response) { 
          console.log('User created:', response);
          this.showRoleDialog = false; 
          // Optionally, navigate to another page or show a success message
        }
      },
      error => {
        console.error('Error creating user:', error);
        // Handle error response (e.g., show an error message)
      }
    );
  }
}
