import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  DataThemeDTO,
  CreateThemeDTO,
  UpdateThemeDTO,
  DeleteThemeDTO
} from '../../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private apiUrl = `${environment.apiUrl}/MS-BOOKS/api/v1/themes`;

  constructor(private http: HttpClient) { }

  // Get all themes (Admin and User)
  getThemes(): Observable<DataThemeDTO[]> {
    return this.http.get<DataThemeDTO[]>(`${this.apiUrl}`);
  }

  // Get theme by ID (Admin only)
  getThemeById(idTheme: number): Observable<DataThemeDTO> {
    return this.http.get<DataThemeDTO>(`${this.apiUrl}/${idTheme}`);
  }

  // Create new theme (Admin only)
  createTheme(createThemeDTO: CreateThemeDTO): Observable<DataThemeDTO | string> {
    return this.http.post<DataThemeDTO | string>(`${this.apiUrl}/create`, createThemeDTO);
  }

  // Update theme (Admin only)
  updateTheme(updateThemeDTO: UpdateThemeDTO): Observable<DataThemeDTO | string> {
    return this.http.put<DataThemeDTO | string>(`${this.apiUrl}/update`, updateThemeDTO);
  }

  // Delete theme (Admin only)
  deleteTheme(deleteThemeDTO: DeleteThemeDTO): Observable<DataThemeDTO | string> {
    return this.http.delete<DataThemeDTO | string>(`${this.apiUrl}/delete`, { body: deleteThemeDTO });
  }
}
