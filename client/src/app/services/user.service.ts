import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';

const baseUrl = '/api/users';
const loginUrl = '/rest-auth/google/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  get(email: string): Observable<User> {
    return this.http.get(`${baseUrl}/${email}`, {
      headers: new HttpHeaders('Authorization: Token ' + localStorage.getItem('token'))
    });
  }

  signIn(user: SocialUser): void {
    const data = {
      access_token: user.authToken,
    };

    this.http.post<Token>(`${loginUrl}`, data).subscribe(
      token => {
        console.log(token);
        localStorage.setItem('token', token.key);
        localStorage.setItem('email', user.email);
        this.router.navigateByUrl('user-details', {state: {email: user.email}});
      }, error => {
        console.log(error);
      }
    );
  }

  /*
  signIn(socialUser: SocialUser): void {
    this.get(socialUser.email).subscribe(
      (user) => {
        console.log(user);
      },
      () => {
        const data = {
          email: socialUser.email,
          //token: socialUser.authToken,
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
  */

  logOut(user: User): boolean {
    /*
    for (const signedInUser of this.users) {
      if (signedInUser.email === user.email) {
        if (signedInUser.token === user.token) {
          signedInUser.isLoggedIn = false;
          signedInUser.token = '';
          return true;
        }
      }
    }
    */
    return false;
  }
}
