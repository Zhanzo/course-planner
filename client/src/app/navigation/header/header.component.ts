import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}


  logOut(): void {
    this.authService.logout().subscribe((success) => {
      if (success) {
        this.router.navigateByUrl('login');
      }
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
