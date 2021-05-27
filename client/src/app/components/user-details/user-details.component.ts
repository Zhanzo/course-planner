import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { SocialAuthService } from 'angularx-social-login';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CoursePlan } from '../../models/coursePlan.model';
import { CoursePlanService } from '../../services/course-plan.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user?: User;
  coursePlans: CoursePlan[] = [];

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,
    private coursePlanService: CoursePlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigateByUrl('');
      return;
    }

    this.userService.get(email).subscribe(
      (user) => {
        console.log(user);
        this.user = user;
        // get course plans
        for (const coursePlanId of this.user.coursePlans) {
          this.coursePlanService
            .get(coursePlanId)
            .subscribe((coursePlan) => this.coursePlans.push(coursePlan));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelect(coursePlan: CoursePlan): void {
    if (coursePlan.id) {
      console.log('Set local');
      localStorage.setItem('coursePlanId', String(coursePlan.id));
      this.router.navigateByUrl('course-plan-details');
    }
  }

  onDelete(coursePlan: CoursePlan): void {
    if (coursePlan.id) {
      this.coursePlanService.delete(coursePlan.id);
      const index = this.coursePlans.indexOf(coursePlan);
      this.coursePlans.splice(index, 1);
    }
  }

  onCreate(): void {
    if (this.user) {
      this.router.navigateByUrl('course-plan-details');
    }
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.router.navigateByUrl('home');
    });
  }
}
