import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Borrow,
  GetMyBorrowsDTO,
  GetMyBorrowByIdDTO,
  GetLatestBorrowByIdBookDTO,
  GetBorrowByIdDTO,
  CreateBorrowDTO,
  UpdateBorrowDTO,
  DeleteBorrowDTO
} from '../../models/borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {
  private apiUrl = `${environment.apiUrl}/MS-BORROWS/api/v1/borrows`;

  constructor(private http: HttpClient) { }

  // Get all borrows (Admin only)
  getBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}`);
  }

  getBorrowBookAvailability(isbn: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.apiUrl}/borrowedBook/${isbn}`);
  }

  // Get user's borrows
  getMyBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/myBorrows`);
  }

  // Get specific borrow by id for the authenticated user
  getMyBorrow(idBorrow: number): Observable<Borrow> {
    return this.http.get<Borrow>(`${this.apiUrl}/myBorrow/${idBorrow}`);
  }

  // Get latest borrow for a specific book
  getLatestBorrowByIdBook(idBook: number): Observable<Borrow> {
    return this.http.get<Borrow>(`${this.apiUrl}/latestBorrowedBook/${idBook}`);
  }

  // Get specific borrow by id (Admin only)
  getBorrowById(idBorrow: number): Observable<Borrow> {
    return this.http.get<Borrow>(`${this.apiUrl}/${idBorrow}`);
  }

  // Create a new borrow
  createBorrow(createBorrowDTO: Omit<CreateBorrowDTO, 'idUser'>): Observable<Borrow | string> {
    return this.http.post<Borrow | string>(`${this.apiUrl}/create`, createBorrowDTO);
  }

  // Update a borrow
  updateBorrow(updateBorrowDTO: Omit<UpdateBorrowDTO, 'idUser'>): Observable<Borrow | string> {
    return this.http.put<Borrow | string>(`${this.apiUrl}/update`, updateBorrowDTO);
  }

  // Delete a borrow
  deleteBorrow(deleteBorrowDTO: DeleteBorrowDTO): Observable<Borrow | string> {
    return this.http.delete<Borrow | string>(`${this.apiUrl}/delete`, { body: deleteBorrowDTO });
  }

}