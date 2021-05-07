import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';

const baseUrl = '/api/users/';
const loginUrl = '/rest-auth/google/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  get(email: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}${email}`);
  }

  signIn(user: SocialUser): void {
    const data = {
      accessToken: user.authToken,
    };

    this.http.post<Token>(`${loginUrl}`, data).subscribe(
      (token) => {
        localStorage.setItem('token', token.key);
        localStorage.setItem('email', user.email);
        this.router.navigateByUrl('user-details');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
