import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../../service/api/reservations.service';
import { Reservation } from '../../../models/reservation.model';

interface ViewMode {
  label: string;
  value: string;
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
    private reservationsService: ReservationsService
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
        this.reservations = reservations;
        this.loading = false;
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

  cancelReservation(reservation: Reservation): void {
    this.loading = true;
    this.reservationsService.deleteReservation({ idReservation: reservation.id }).subscribe({
      next: () => {
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error canceling reservation:', error);
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isExpired(expirationDate: string): boolean {
    return new Date(expirationDate) < new Date();
  }

  getDaysUntilExpiration(expirationDate: string): number {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getStatusClass(reservation: Reservation): string {
    if (!reservation.isActive) return 'inactive';
    return this.isExpired(reservation.expirationDate) ? 'expired' : 'active';
  }

  filterReservations(): Reservation[] {
    return this.reservations.filter(reservation => {
      const bookId = reservation.idBook.toString();
      const query = this.searchQuery.toLowerCase();

      return !this.searchQuery || bookId.includes(query);
    });
  }
}
