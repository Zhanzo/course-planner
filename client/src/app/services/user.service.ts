import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Array<User> = [];

  constructor(private http: HttpClient) {}

  get(email: string): Observable<User> {
    return this.http.get(`${baseUrl}/${email}`);
  }

  create(data: any): Observable<User> {
    return this.http.post(`${baseUrl}`, data);
  }

  signIn(socialUser: SocialUser): void {
    this.get(socialUser.email).subscribe(
      (user) => {
        console.log(user);
      },
      () => {
        const data = {
          email: socialUser.email,
          token: socialUser.authToken,
        };

        this.create(data).subscribe(
          (user) => {
            console.log(user);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
  }

  logOut(user: User): boolean {
    for (const signedInUser of this.users) {
      if (signedInUser.email === user.email) {
        if (signedInUser.token === user.token) {
          signedInUser.isLoggedIn = false;
          signedInUser.token = '';
          return true;
        }
      }
    }
    return false;
  }
}
