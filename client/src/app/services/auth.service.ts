import { Injectable } from '@angular/core';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken(): Token | null {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null;
  }
}
