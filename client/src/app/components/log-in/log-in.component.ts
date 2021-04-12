import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
    isSignedIn: false,
  };
  newUser: User = {
    username: '',
    password: '',
    isSignedIn: false,
  };
  submitted = false;
  userMessage = '';
  newUserMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  logIn(): void {
    if (this.userService.signIn(this.user)) {
      this.submitted = true;
    } else {
      this.userMessage = 'User does not exist!';
    }
  }

  createUser(): void {
    if (this.userService.create(this.newUser)) {
      this.newUserMessage = 'User created successfully';
    } else {
      this.newUserMessage = 'User already exists!';
    }
  }
}
