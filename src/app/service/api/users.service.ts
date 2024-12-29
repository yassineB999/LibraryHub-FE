import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  RecoverUserDTO,
  DeleteUserDTO
} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/MS-USERS/api/v1/users`;

  constructor(private http: HttpClient) { }

  
  checkAccountExist(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/accountExist`);
  }

  createKeyCloakUser(selectedRole: string): Observable<User | string>{
    return this.http.post<User | string>(`${this.apiUrl}/createUserFromKeyCloak`, {userType : selectedRole.replace('ROLE_', '')});
  }

  // Get authenticated user ID
  getAuthenticatedUser(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/authenticatedUser`);
  }

  // Get all users (Admin only)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // Get user by ID (Admin only)
  getUserById(idUser: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${idUser}`);
  }

  // Get all deleted users (Admin only)
  getDeletedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/deleteUsers`);
  }

  // Get deleted user by ID (Admin only)
  getDeletedUserById(idUser: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/deletedUsers/${idUser}`);
  }

  getMyTotalDashboardInformation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myTotalDashboardInformation`);
  }

  // Create new user (Admin only)
  createUser(createUserDTO: CreateUserDTO): Observable<User | string> {
    return this.http.post<User | string>(`${this.apiUrl}/create`, createUserDTO);
  }

  // Update user (Admin only)
  updateUser(updateUserDTO: UpdateUserDTO): Observable<User | string> {
    return this.http.put<User | string>(`${this.apiUrl}/update`, updateUserDTO);
  }

  // Recover deleted user
  recoverUser(recoverUserDTO: RecoverUserDTO): Observable<User | string> {
    return this.http.put<User | string>(`${this.apiUrl}/recover`, recoverUserDTO);
  }

  // Delete user (Admin only)
  deleteUser(deleteUserDTO: DeleteUserDTO): Observable<User | string> {
    return this.http.delete<User | string>(`${this.apiUrl}/delete`, { body: deleteUserDTO });
  }


}