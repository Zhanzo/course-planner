import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Token } from '../models/token.model';

const clientId = 'Y9tWhEXa9GmbD6X6uT4FP7BIB1JWjNMrRCsJBtrk';
const clientSecret =
  'TOTrfKjqU9hYF3sTQgcn0WZm0nHmzdHgnSCDXwzeqFYrKuNuNKIM7k8S2QaZRQAbCjN6WRtjFuDVqSu4Gx9C7A2B71kwk4t5GjRUYtOWlueRjrKVJjUDYChM6Q5j5wEM';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'TOKEN';
  private readonly refreshTokenKey = 'REFRESH_TOKEN';

  constructor(private http: HttpClient) {}

  login(authToken: string, backend: string) {
    return this.http
      .post<Token>('/auth/convert-token/', {
        grantType: 'convert_token',
        clientId,
        clientSecret,
        backend,
        token: authToken,
      })
      .pipe(
        tap((token: Token) => this.storeTokens(token)),
        mapTo(true),
        catchError((error) => {
          alert(error.error);
          return of(false);
        })
      );
  }

  logout() {
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

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() || !!this.getRefreshToken();
  }

  refreshToken() {
    return this.http
      .post<Token>('/auth/token/', {
        grantType: 'refresh_token',
        clientId,
        clientSecret,
        refreshToken: this.getRefreshToken(),
      })
      .pipe(tap((token: Token) => this.storeTokens(token)));
  }

  private getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private storeTokens(token: Token) {
    this.storeToken(token.accessToken);
    this.storeRefreshToken(token.refreshToken);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeRefreshToken(refreshToken: string) {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}
