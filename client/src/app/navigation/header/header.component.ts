import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { CoursePlan } from 'src/app/models/coursePlan.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  user?: SocialUser;
  coursePlans: CoursePlan[] = [];
  loggedIn?: boolean;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigateByUrl('');
      return;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.router.navigateByUrl('home');
    });
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
