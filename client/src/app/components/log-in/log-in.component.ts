import { Component, OnInit } from '@angular/core';
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
export class LogInComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('user-details');
    }
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => this.signIn(user.authToken, 'google-oauth2'),
      (error) => console.log(error)
    );
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => this.signIn(user.authToken, 'facebook'),
      (error) => console.log(error)
    );
  }

  private signIn(authToken: string, backend: string): void {
    this.authService.login(authToken, backend).subscribe((success: boolean) => {
      if (success) {
        this.router.navigateByUrl('user-details');
      }
    });
  }
}
