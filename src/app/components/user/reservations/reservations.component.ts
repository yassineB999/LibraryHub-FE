import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../../service/api/reservations.service';
import { BooksService } from '../../../service/api/books.service';
import { DeleteReservationDTO, Reservation } from '../../../models/reservation.model';
import { forkJoin } from 'rxjs';

interface ViewMode {
  label: string;
  value: 'all' | 'active';
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = false;
  searchQuery: string = '';
  viewMode: 'all' | 'active' = 'all';
  selectedReservation: Reservation | null = null;

  viewModes: ViewMode[] = [
    { label: 'All Reservations', value: 'all' },
    { label: 'Active Reservations', value: 'active' }
  ];

  constructor(
    private reservationsService: ReservationsService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    const request = this.viewMode === 'active' 
      ? this.reservationsService.getMyActiveReservations()
      : this.reservationsService.getMyReservations();

    request.subscribe({
      next: (reservations) => {
        // Create an array of book requests
        const bookRequests = reservations.map(reservation =>
          this.booksService.getBookById(reservation.idBook)
        );

        // Fetch all books in parallel
        forkJoin(bookRequests).subscribe({
          next: (books) => {
            this.reservations = reservations.map((reservation, index) => ({
              ...reservation,
              book: books[index]
            }));
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading books:', error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.loading = false;
      }
    });
  }

  onViewModeChange(): void {
    this.loadReservations();
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Not Available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatAuthors(author: string | string[]): string {
    if (Array.isArray(author)) {
      return author.join(', ');
    }
    return String(author);
  }

  filterReservations(): Reservation[] {
    if (!this.searchQuery) return this.reservations;

    const query = this.searchQuery.toLowerCase();
    return this.reservations.filter(reservation => 
      reservation.book?.title.toLowerCase().includes(query)
    );
  }

  getStatusClass(reservation: Reservation): string {
    return reservation.isActive ? 'active' : 'inactive';
  }

  cancelReservation(reservation: Reservation): void {
    // Prepare the DTO
    const deleteReservationDTO: DeleteReservationDTO = {
      idReservation: reservation.idReservation
    };

    // Call delete method with DTO
    this.reservationsService.deleteReservation(deleteReservationDTO).subscribe({
      next: () => {
        // Remove the reservation from the list
        this.reservations = this.reservations.filter(r => r.idReservation !== reservation.idReservation);
        // Optional: Add a success message or toast notification
      },
      error: (error) => {
        console.error('Error canceling reservation:', error);
        // Optional: Add an error message or toast notification
      }
    });
  }
}