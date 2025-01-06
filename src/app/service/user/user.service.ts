import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Borrow, CreateBorrowDTO } from '../../models/borrow.model';
import { BorrowsService } from '../api/borrows.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private borrowsService: BorrowsService) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData);
  }

  // Borrow a book
  borrowBook(createBookDTO :CreateBorrowDTO): Observable<Borrow | string> {
    return this.borrowsService.createBorrow(createBookDTO);
  }

  // Get user's borrowed books
  getMyBorrows(): Observable<Borrow[]> {
    return this.borrowsService.getMyBorrows();
  }

  returnBook(borrowId: number): Observable<any> {
    return this.borrowsService.returnBook(borrowId);
  }

  reserveBook(bookId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve/${bookId}`, {});
  }

  cancelReservation(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reserve/${bookId}`);
  }
}
