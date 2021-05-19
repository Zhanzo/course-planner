import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CoursePlanService } from '../../services/course-plan.service';
import { CoursePlan } from 'src/app/models/coursePlan.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  coursePlans: CoursePlan[] = [];

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,
    private coursePlanService: CoursePlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('coursePlanId');

    const userId = this.userService.getUserId();
    if (!userId) {
      return;
    }

    this.userService.get(userId).subscribe((user: User) => {
      // get course plans
      for (const coursePlanId of user.coursePlans) {
        this.coursePlanService
          .get(coursePlanId)
          .subscribe((coursePlan) => this.coursePlans.push(coursePlan));
      }
    });
  }

  onSelect(coursePlan: CoursePlan): void {
    if (coursePlan.id) {
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
    this.router.navigateByUrl('course-plan-details');
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('');
  }
}
