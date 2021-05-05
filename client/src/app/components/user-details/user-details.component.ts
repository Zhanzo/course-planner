import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {SocialAuthService} from 'angularx-social-login';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursePlan} from "../../models/coursePlan.model";
import {CoursePlanService} from "../../services/course-plan.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user?: User;
  coursePlans: CoursePlan[] = [];

  constructor(private authService: SocialAuthService,
              private userService: UserService,
              private coursePlanService: CoursePlanService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      // get course plans
      this.userService.get(email).subscribe(
        user => {
          console.log(user);
          this.user = user;
          this.coursePlanService.getList().subscribe(
            coursePlans => {
              this.coursePlans = coursePlans;
            },
            error => console.log(error)
          );
        }, error => {
          console.log(error);
          this.router.navigateByUrl('');
        }
      );
    }
  }

  onSelect(coursePlan: CoursePlan): void {
    if (coursePlan.id) {
      localStorage.setItem('coursePlanId', String(coursePlan.id));
      this.router.navigateByUrl('course-plan-details');
    }
  }

  createNewCoursePlan(): void {
    if (this.user) {
      this.router.navigateByUrl('course-plan-details');
    }
  }

  signOut(): void {
    this.authService.signOut().then(
      () => {
        if (this.user) {
          localStorage.deleteItem('token');
          localStorage.deleteItem('email')
          this.router.navigateByUrl('');
        }
      });
  }
}
