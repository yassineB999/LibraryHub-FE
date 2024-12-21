import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData);
  }

  getBorrowedBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/borrowed-books`);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations`);
  }

  borrowBook(bookId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow/${bookId}`, {});
  }

  returnBook(bookId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/return/${bookId}`, {});
  }

  reserveBook(bookId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve/${bookId}`, {});
  }

  cancelReservation(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reserve/${bookId}`);
  }
}
