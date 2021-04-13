import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import {SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Array<User> = [];

  constructor() {}

  get(email: string): User | null {
    for (const user of this.users) {
      if ((user.email === email)) {
        return user;
      }
    }
    return null;
  }

  logIn(socialUser: SocialUser): boolean {
    for (const user of this.users) {
      if (user.email === socialUser.email) {
        if (user.token === socialUser.authToken) {
          user.isLoggedIn = true;
          return true;
        }
        else {
          user.token = socialUser.authToken;
          user.isLoggedIn = true;
          return true;
        }
      }
    }

    const newUser = new User(socialUser.email, socialUser.authToken);
    newUser.isLoggedIn = true;
    this.users.push(newUser);
    return true;
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
