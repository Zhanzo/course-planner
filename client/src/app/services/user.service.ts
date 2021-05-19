import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

const clientId = 'Y9tWhEXa9GmbD6X6uT4FP7BIB1JWjNMrRCsJBtrk';
const clientSecret =
  'TOTrfKjqU9hYF3sTQgcn0WZm0nHmzdHgnSCDXwzeqFYrKuNuNKIM7k8S2QaZRQAbCjN6WRtjFuDVqSu4Gx9C7A2B71kwk4t5GjRUYtOWlueRjrKVJjUDYChM6Q5j5wEM';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  get(id: string): Observable<User> {
    return this.http.get<User>('/api/users/' + id);
  }

  signIn(socialUser: SocialUser, backend: string): void {
    const data = {
      grantType: 'convert_token',
      clientId,
      clientSecret,
      backend,
      token: socialUser.authToken,
    };

    this.http.post<Token>('/auth/convert-token', data).subscribe(
      (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.http.get<User>('/api/current_user/').subscribe(
          (user) => {
            localStorage.setItem('userId', String(user.id));
            this.router.navigateByUrl('user-details');
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
}
