import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Course} from '../../models/course.model';
import {CourseService} from "../../services/course.service";
import {CoursePlan} from "../../models/coursePlan.model";
import {CoursePlanService} from "../../services/course-plan.service";

@Component({
  selector: 'app-course-plan-details',
  templateUrl: './course-plan-details.component.html',
  styleUrls: ['./course-plan-details.component.css']
})
export class CoursePlanDetailsComponent implements OnInit {
  user?: User;
  coursePlan?: CoursePlan;
  coursePlanForm = new FormGroup({
    name: new FormControl(''),
    courses: new FormControl([]),
  });
  courses: Course[] = [];
  selected: Course[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private courseService: CourseService,
              private coursePlanService: CoursePlanService,
              private userService: UserService
  ) {
  }

  drop(event: CdkDragDrop<Course[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onCreate(): void {
    // Send to database and go back
    if (this.coursePlan && this.coursePlan.id) {
      localStorage.removeItem('courseIDs');
      this.coursePlanService.update(this.coursePlan.id, this.coursePlanForm.value.name, this.selected);
    } else if (this.user) {
      const coursePlan = new CoursePlan(this.user.email, this.coursePlanForm.value.name, this.selected);
      this.coursePlanService.create(coursePlan);
    }
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.userService.get(email).subscribe(
        user => {
          console.log(user);
          this.user = user;
          this.courseService.get().subscribe(
            courses => this.courses = courses,
            error => console.log(error)
          );
          const coursePlanId = localStorage.getItem('coursePlanId');
          if (coursePlanId) {
            this.coursePlanService.get(Number(coursePlanId)).subscribe(
              coursePlan => {
                // Move the previously selected courses to selected
                this.coursePlan = coursePlan;
                this.moveCourseToSelected(coursePlan)
                this.coursePlanForm.patchValue({name: coursePlan.title})
              });
          }
        }, error => {
          console.log(error);
          this.router.navigateByUrl('');
        }
      );
    }
  }

  moveCourseToSelected(coursePlan: CoursePlan): void {
    for (var i = 0; i < this.courses.length;) {
      var course = this.courses[i];
      var foundCourse = false;
      for (const coursePlanCourse of coursePlan.courses) {
        if (course.id == coursePlanCourse.id)  {
          this.selected.push(course);
          this.courses.splice(i, 1);
          foundCourse = true;
          break;
        }
      }
      if (!foundCourse) {
        i++;
      }
    }
  }
}
