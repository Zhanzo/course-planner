import { Component, OnInit } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => this.signIn(user.authToken, 'google-oauth2'),
      (error) => console.log(error)
    );
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user) => this.signIn(user.authToken, 'facebook'),
      (error) => console.log(error)
    );
  }

  private signIn(authToken: string, backend: string): void {
    this.userService.getToken(authToken, backend).subscribe((token) => {
      localStorage.setItem('token', JSON.stringify(token));
      this.userService.getCurrentUser().subscribe((user) => {
        localStorage.setItem('userId', String(user.id));
        this.router.navigateByUrl('user-details');
      });
    });
  }
}
