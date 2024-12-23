import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  DataBookDTO,
  CreateBookDTO, 
  UpdateBookDTO, 
  UpdateBookAvailabilityDTO,
  AddThemeToBookDTO,
  RecoverBookDTO,
  DeleteBookDTO,
  DeleteThemeFromBookDTO 
} from '../../models/book.model';

import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = `${environment.apiUrl}/MS-BOOKS/api/v1/books`;

  constructor(private http: HttpClient) { }

  // Get all books
  getBooks(): Observable<DataBookDTO[]> {
    return this.http.get<DataBookDTO[]>(`${this.apiUrl}`);
  }

  // Get all books by pagination
  getBooksByPagination(page: number, size: number, search?: string, category?: string): Observable<any> {
    let url = `${this.apiUrl}/${page}/${size}`;
    if (search) {
      this.getSearchedBooks(search);
    }
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return this.http.get<any>(url);
  }

  // Get searched books
  getSearchedBooks(search: string): Observable<DataBookDTO[]> {
    return this.http.get<DataBookDTO[]>(`${this.apiUrl}/search?title=${search}`);
  }

  // Get available books (Admin only)
  getAvailableBooks(): Observable<DataBookDTO[]> {
    return this.http.get<DataBookDTO[]>(`${this.apiUrl}/available`);
  }

  // Get unavailable books (Admin only)
  getUnavailableBooks(): Observable<DataBookDTO[]> {
    return this.http.get<DataBookDTO[]>(`${this.apiUrl}/unavailable`);
  }

  // Get book by ID
  getBookById(idBook: number): Observable<DataBookDTO> {
    return this.http.get<DataBookDTO>(`${this.apiUrl}/${idBook}`);
  }

  // Get all deleted books (Admin only)
  getDeletedBooks(): Observable<DataBookDTO[]> {
    return this.http.get<DataBookDTO[]>(`${this.apiUrl}/deletedBooks`);
  }

  // Get deleted book by ID (Admin only)
  getDeletedBookById(idBook: number): Observable<DataBookDTO> {
    return this.http.get<DataBookDTO>(`${this.apiUrl}/deletedBooks/${idBook}`);
  }

  // Create new book (Admin only)
  createBook(createBookDTO: CreateBookDTO): Observable<DataBookDTO | string> {
    return this.http.post<DataBookDTO | string>(`${this.apiUrl}/create`, createBookDTO);
  }

  // Update book (Admin only)
  updateBook(updateBookDTO: UpdateBookDTO): Observable<DataBookDTO | string> {
    return this.http.put<DataBookDTO | string>(`${this.apiUrl}/update`, updateBookDTO);
  }

  // Update book availability
  updateBookAvailability(updateBookAvailabilityDTO: UpdateBookAvailabilityDTO): Observable<DataBookDTO | string> {
    return this.http.put<DataBookDTO | string>(`${this.apiUrl}/update/availability`, updateBookAvailabilityDTO);
  }

  // Add theme to book (Admin only)
  addThemeToBook(addThemeToBookDTO: AddThemeToBookDTO): Observable<DataBookDTO | string> {
    return this.http.put<DataBookDTO | string>(`${this.apiUrl}/update/addThemeToBook`, addThemeToBookDTO);
  }

  // Recover deleted book (Admin only)
  recoverBook(recoverBookDTO: RecoverBookDTO): Observable<DataBookDTO | string> {
    return this.http.put<DataBookDTO | string>(`${this.apiUrl}/recover`, recoverBookDTO);
  }

  // Delete book (Admin only)
  deleteBook(deleteBookDTO: DeleteBookDTO): Observable<DataBookDTO | string> {
    return this.http.delete<DataBookDTO | string>(`${this.apiUrl}/delete`, { body: deleteBookDTO });
  }

  // Delete theme from book (Admin only)
  deleteThemeFromBook(deleteThemeFromBookDTO: DeleteThemeFromBookDTO): Observable<DataBookDTO | string> {
    return this.http.delete<DataBookDTO | string>(`${this.apiUrl}/delete/deleteThemeFromBook`, { body: deleteThemeFromBookDTO });
  }
}