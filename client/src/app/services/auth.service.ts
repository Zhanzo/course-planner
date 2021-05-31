import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Token } from '../models/token.model';

export const clientId = 'Y9tWhEXa9GmbD6X6uT4FP7BIB1JWjNMrRCsJBtrk';
export const clientSecret =
  'TOTrfKjqU9hYF3sTQgcn0WZm0nHmzdHgnSCDXwzeqFYrKuNuNKIM7k8S2QaZRQAbCjN6WRtjFuDVqSu4Gx9C7A2B71kwk4t5GjRUYtOWlueRjrKVJjUDYChM6Q5j5wEM';
export const tokenKey = 'TOKEN';
export const refreshTokenKey = 'REFRESH_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(authToken: string, backend: string): Observable<boolean> {
    return this.http
      .post<Token>(
        '/auth/convert-token/',
        {
          grantType: 'convert_token',
          clientId,
          clientSecret,
          backend,
          token: authToken,
        },
        {
          headers: {
            noAuth: 'true',
          },
        }
      )
      .pipe(
        tap((token: Token) => this.storeTokens(token)),
        mapTo(true),
        catchError((error) => {
          alert(error.error);
          return of(false);
        })
      );
  }

  logout(): Observable<boolean> {
    return this.http
      .post('/auth/invalidate-sessions/', {
        clientId,
      })
      .pipe(
        tap(() => this.removeTokens()),
        mapTo(true),
        catchError((error) => {
          alert(error.error);
          return of(false);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() || !!this.getRefreshToken();
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<Token>(
        '/auth/token/',
        {
          grantType: 'refresh_token',
          clientId,
          clientSecret,
          refreshToken: this.getRefreshToken(),
        },
        {
          headers: {
            noAuth: 'true',
          },
        }
      )
      .pipe(
        tap({
          next: (token: Token) => {
            this.storeTokens(token);
          },
        }),
        catchError(() => {
          this.removeTokens();
          this.router.navigateByUrl('login');
          return of(null);
        })
      );
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(refreshTokenKey);
  }

  private storeTokens(token: Token): void {
    this.storeToken(token.accessToken);
    this.storeRefreshToken(token.refreshToken);
  }

  private storeToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(refreshTokenKey, refreshToken);
  }

  private removeTokens(): void {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(refreshTokenKey);
  }
}
