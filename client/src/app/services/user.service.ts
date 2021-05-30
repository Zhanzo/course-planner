import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<User> {
    return this.http.get<User>('/api/users/' + id);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/current_user/');
  }
}
