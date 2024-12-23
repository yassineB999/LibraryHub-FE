import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataBookDTO } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = `${environment.apiUrl}/api/v1/books`;

  constructor(private http: HttpClient) {}

  getBooks(offset: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${offset}/${pageSize}`);
  }
}
