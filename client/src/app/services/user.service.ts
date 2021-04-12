import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Array<User> = [];

  constructor() {}

  create(user: User): boolean {
    for (let _user of this.users) {
      if (_user.username == user.username) {
        return false;
      }
    }
    this.users.push(user);
    return true;
  }

  get(username: string): User | null {
    for (let _user of this.users) {
      if ((_user.username = username)) {
        return _user;
      }
    }
    return null;
  }

  signIn(user: User): boolean {
    for (let _user of this.users) {
      if (_user.username == user.username && _user.password == user.password) {
        _user.isSignedIn = true;
        return true;
      }
    }
    return false;
  }
}
