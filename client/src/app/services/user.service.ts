import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

const clientId = 'Y9tWhEXa9GmbD6X6uT4FP7BIB1JWjNMrRCsJBtrk';
const clientSecret =
  'TOTrfKjqU9hYF3sTQgcn0WZm0nHmzdHgnSCDXwzeqFYrKuNuNKIM7k8S2QaZRQAbCjN6WRtjFuDVqSu4Gx9C7A2B71kwk4t5GjRUYtOWlueRjrKVJjUDYChM6Q5j5wEM';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  get(id: any): Observable<User> {
    return this.http.get<User>('/api/users/' + id);
  }

  getToken(authToken: string, backend: string): Observable<Token> {
    const data = {
      grantType: 'convert_token',
      clientId,
      clientSecret,
      backend,
      token: authToken,
    };

    return this.http.post<Token>('/auth/convert-token', data);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/current_user/');
  }
}
