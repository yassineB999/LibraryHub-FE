import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/`;

  constructor(private http: HttpClient) { }

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
