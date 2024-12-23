import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {
  private apiUrl = `${environment.apiUrl}/api/v1/borrows`;

  constructor(private http: HttpClient) {}

  borrowBook(bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow/${bookId}`, {});
  }

  reserveBook(bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve/${bookId}`, {});
  }
}
