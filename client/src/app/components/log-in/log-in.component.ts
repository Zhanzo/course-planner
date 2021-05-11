import { Component, OnInit } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user?: SocialUser;
  loggedIn?: boolean;
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;

  constructor(
    private authService: SocialAuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => this.userService.signIn(user),
      (error) => console.log(error)
    );
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user) => this.userService.signIn(user),
      (error) => console.log(error)
    );
  }
}
