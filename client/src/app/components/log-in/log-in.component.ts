import { Component } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router
  ) {}

  logInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => this.logIn(user.authToken, 'google-oauth2'),
      (error) => console.log(error)
    );
  }

  logInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => this.logIn(user.authToken, 'facebook'),
      (error) => console.log(error)
    );
  }

  private logIn(authToken: string, backend: string): void {
    this.authService.login(authToken, backend).subscribe((success: boolean) => {
      if (success) {
        this.router.navigateByUrl('user');
      }
    });
  }
}
