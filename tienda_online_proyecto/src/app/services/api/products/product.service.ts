import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`).pipe(
      tap((_) => console.log('Users fetched.')),
      catchError(this.handleError<Product[]>('Get Users', []))
    );
  }

  getProduct(id: any): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      tap((_) => console.log(`User fetched: ${id}`)),
      catchError(this.handleError<Product>(`Get User id=${id}`))
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}/products`, product, this.httpOptions).pipe(
      tap((newProduct: Product) => console.log(`User added: ${newProduct.id}`)),
      catchError(this.handleError<Product>('Create User'))
    );
  }

  updateProduct(id: any, product: Product): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/products/${id}`, product, this.httpOptions).pipe(
      tap((_) => console.log(`User updated: ${id}`)),
      catchError(this.handleError<Product[]>('Update User'))
    );
  }

  deleteProducts(id: any): Observable<Product[]> {
    return this.httpClient.delete<Product[]>(`${this.baseUrl}/products/${id}`, this.httpOptions).pipe(
      tap((_) => console.log(`User deleted: ${id}`)),
      catchError(this.handleError<Product[]>('Delete User'))
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

