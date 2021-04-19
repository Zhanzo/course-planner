import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {CoursePlan} from '../../models/coursePlan.model';

@Component({
  selector: 'app-course-plan-details',
  templateUrl: './course-plan-details.component.html',
  styleUrls: ['./course-plan-details.component.css']
})
export class CoursePlanDetailsComponent implements OnInit {
  user?: User;
  coursePlan?: CoursePlan;

  constructor(private router: Router, private userService: UserService) {
    console.log('Running CoursePlanDetailsComponent');
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.userService.get(state.email).subscribe(user => {
        this.user = user;
        if (state.coursePlanName) {
          const coursePlanName = state.coursePlanName;
          if (coursePlanName !== '') {
            /*
            const coursePlan = user.getCoursePlan(coursePlanName);
            if (coursePlan) {
              this.coursePlan = coursePlan;
              return;
            }
             */
          } else {
            this.coursePlan = new CoursePlan('');
            return;
          }
        }
      }, error => {
        console.log(error);
        this.router.navigateByUrl('');
      });
    }
  }

  ngOnInit(): void {
  }

}
