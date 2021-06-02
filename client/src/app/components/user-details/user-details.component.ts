import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CoursePlanService } from 'src/app/services/course-plan.service';
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
    private userService: UserService,
    private coursePlanService: CoursePlanService,
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      // get course plans
      for (const coursePlanId of user.coursePlans) {
        this.coursePlanService
          .get(coursePlanId)
          .subscribe((coursePlan) => this.coursePlans.push(coursePlan));
      }
    });
  }

  onDelete(coursePlan: CoursePlan): void {
    if (coursePlan.id) {
      this.coursePlanService
        .delete(coursePlan.id)
        .subscribe((success: boolean) => {
          if (success) {
            const index = this.coursePlans.indexOf(coursePlan);
            this.coursePlans.splice(index, 1);
          } else {
            alert('Course plan could not be deleted');
          }
        });
    }
  }
}
