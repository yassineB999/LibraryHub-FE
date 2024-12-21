import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  // Book Management
  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, bookData);
  }

  updateBook(bookId: string, bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${bookId}`, bookData);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }

  // User Management
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUserStatus(userId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/status`, { status });
  }

  // Library Statistics
  getBorrowingStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/borrowing`);
  }

  getOverdueBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/overdue`);
  }

  getPopularBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/popular-books`);
  }

  // Category Management
  addCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, categoryData);
  }

  updateCategory(categoryId: string, categoryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${categoryId}`, categoryData);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${categoryId}`);
  }
}
