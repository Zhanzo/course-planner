import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { LogInComponent } from 'src/app/components/log-in/log-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  isloggedIn?: boolean;
  constructor() {}

  ngOnInit(): void {}
  /*
  constructor(private logincomponent: LogInComponent) {}

  ngOnInit(): void {}
    if (this.logincomponent.loggedIn) {
      this.isloggedIn = true;
    }
  }
*/
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  /*
  signOut(): void {
    this.authService.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.router.navigateByUrl('home');
    });
  }
*/
}
