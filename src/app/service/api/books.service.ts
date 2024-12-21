import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  Book, 
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
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  // Get available books (Admin only)
  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/available`);
  }

  // Get unavailable books (Admin only)
  getUnavailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/unavailable`);
  }

  // Get book by ID
  getBookById(idBook: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${idBook}`);
  }

  // Get all deleted books (Admin only)
  getDeletedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/deletedBooks`);
  }

  // Get deleted book by ID (Admin only)
  getDeletedBookById(idBook: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/deletedBooks/${idBook}`);
  }

  // Create new book (Admin only)
  createBook(createBookDTO: CreateBookDTO): Observable<Book | string> {
    return this.http.post<Book | string>(`${this.apiUrl}/create`, createBookDTO);
  }

  // Update book (Admin only)
  updateBook(updateBookDTO: UpdateBookDTO): Observable<Book | string> {
    return this.http.put<Book | string>(`${this.apiUrl}/update`, updateBookDTO);
  }

  // Update book availability
  updateBookAvailability(updateBookAvailabilityDTO: UpdateBookAvailabilityDTO): Observable<Book | string> {
    return this.http.put<Book | string>(`${this.apiUrl}/update/availability`, updateBookAvailabilityDTO);
  }

  // Add theme to book (Admin only)
  addThemeToBook(addThemeToBookDTO: AddThemeToBookDTO): Observable<Book | string> {
    return this.http.put<Book | string>(`${this.apiUrl}/update/addThemeToBook`, addThemeToBookDTO);
  }

  // Recover deleted book (Admin only)
  recoverBook(recoverBookDTO: RecoverBookDTO): Observable<Book | string> {
    return this.http.put<Book | string>(`${this.apiUrl}/recover`, recoverBookDTO);
  }

  // Delete book (Admin only)
  deleteBook(deleteBookDTO: DeleteBookDTO): Observable<Book | string> {
    return this.http.delete<Book | string>(`${this.apiUrl}/delete`, { body: deleteBookDTO });
  }

  // Delete theme from book (Admin only)
  deleteThemeFromBook(deleteThemeFromBookDTO: DeleteThemeFromBookDTO): Observable<Book | string> {
    return this.http.delete<Book | string>(`${this.apiUrl}/delete/deleteThemeFromBook`, { body: deleteThemeFromBookDTO });
  }
}