import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import {SocialUser} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Array<User> = [];

//  constructor(private http: HttpClient) { }
constructor() { }

  get(email: string): User | null {
    for (const user of this.users) {
      if ((user.email === email)) {
        return user;
      }
    }
    return null;
  }
  
/*
  get(email: string): Observable<User> {
    return this.http.get(`${baseUrl}/${email}`);
  }
*/

/*
  logIn(socialUser: SocialUser): boolean {
    this.get(socialUser.email).subscribe(user=>{
      if (user.token === socialUser.authToken)
    })
    if (user.email )
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
*/
 
  logIn(socialUser: SocialUser): boolean {
    console.log(socialUser.authToken);
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
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'})
  export class TutorialService 
  {
    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Tutorial[]> {
      return this.http.get<Tutorial[]>(baseUrl);
    }
    
    get(id: any): Observable<Tutorial> {
      return this.http.get(`${baseUrl}/${id}`);
    }
    
    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data);
    }
    
    update(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }
    
    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }
    
    deleteAll(): Observable<any> {
      return this.http.delete(baseUrl);
    }
    
    findByTitle(title: any): Observable<Tutorial[]> {
      return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
    }
  }
  */