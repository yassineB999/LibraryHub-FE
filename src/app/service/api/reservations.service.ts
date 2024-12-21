import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Reservation,
  GetMyReservationsDTO,
  GetMyActiveReservationsDTO,
  GetReservationDTO,
  GetMyReservationUserDTO,
  GetActiveReservationDTO,
  GetMyActiveReservationDTO,
  CreateReservationDTO,
  DeleteReservationDTO
} from '../../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = `${environment.apiUrl}/MS-RESERVATIONS/api/v1/reservations`;

  constructor(private http: HttpClient) { }

  // Get all reservations (Admin only)
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
  }

  // Get user's reservations
  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/myReservations`);
  }

  // Get all active reservations (Admin only)
  getActiveReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/activeReservations`);
  }

  // Get user's active reservations
  getMyActiveReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/myReservations/myActiveReservations`);
  }

  // Get specific reservation by id (Admin only)
  getReservation(idReservation: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${idReservation}`);
  }

  // Get user's specific reservation
  getMyReservation(idReservation: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/myReservation/${idReservation}`);
  }

  // Get specific active reservation (Admin only)
  getActiveReservation(idReservation: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/activeReservations/${idReservation}`);
  }

  // Get user's specific active reservation
  getMyActiveReservation(idReservation: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/myReservations/myActiveReservation/${idReservation}`);
  }

  // Create a new reservation
  createReservation(createReservationDTO: Omit<CreateReservationDTO, 'idUser'>): Observable<Reservation | string> {
    return this.http.post<Reservation | string>(`${this.apiUrl}/create`, createReservationDTO);
  }

  // Delete a reservation
  deleteReservation(deleteReservationDTO: DeleteReservationDTO): Observable<Reservation | string> {
    return this.http.delete<Reservation | string>(`${this.apiUrl}/delete`, { body: deleteReservationDTO });
  }
}