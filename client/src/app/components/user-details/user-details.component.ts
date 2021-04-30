import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {SocialAuthService} from 'angularx-social-login';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user?: User;

  constructor(private authService: SocialAuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    const email = localStorage.getItem('email');
    if (email) {
      // get course plans
      this.userService.get(email).subscribe(
          user => {
            this.user = user;
            console.log(user);
          }, error => {
            console.log(error);
            this.router.navigateByUrl('');
          }
      );
    }
  }

  ngOnInit(): void {
  }

  createNewCoursePlan(): void {
    if (this.user) {
      this.router.navigateByUrl('course-plan-details');
    }
  }

  viewCoursePlan(name: string): void {
    if (this.user) {
      this.router.navigateByUrl('course-plan-details').then(
        r => {
          console.log(r);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  signOut(): void {
    this.authService.signOut().then(
      () => {
        if (this.user) {
          this.userService.logOut(this.user);
          this.router.navigateByUrl('');
        }
      },
      error => {
        console.log(error);
      });
  }
}
