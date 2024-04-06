import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`).pipe(
      tap((_) => console.log('Users fetched.')),
      catchError(this.handleError<User[]>('Get Users', []))
    );
  }

  getUser(id: any): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${id}`).pipe(
      tap((_) => console.log(`User fetched: ${id}`)),
      catchError(this.handleError<User>(`Get User id=${id}`))
    );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users`, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`User added: ${newUser.id}`)),
      catchError(this.handleError<User>('Create User'))
    );
  }

  updateUser(id: any, user: User): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/users/${id}`, user, this.httpOptions).pipe(
      tap((_) => console.log(`User updated: ${id}`)),
      catchError(this.handleError<User[]>('Update User'))
    );
  }

  deleteUser(id: any): Observable<User[]> {
    return this.httpClient.delete<User[]>(`${this.baseUrl}/users/${id}`, this.httpOptions).pipe(
      tap((_) => console.log(`User deleted: ${id}`)),
      catchError(this.handleError<User[]>('Delete User'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
