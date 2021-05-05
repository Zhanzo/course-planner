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
    let courseIds: number[] = [];
    for (const course of this.selected) {
      if (course.id != null) {
        courseIds.push(course.id);
      }
    }

    if (this.coursePlan) {
      localStorage.deleteItem('courseIDs');
      this.coursePlan.title = this.coursePlanForm.value.name;
      this.coursePlan.courses = courseIds;
      this.coursePlanService.create(this.coursePlan);
    } else if (this.user) {
      const coursePlan = new CoursePlan(this.user.email, this.coursePlanForm.value.name, courseIds);
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
          const id = localStorage.getItem('coursePlanId');
          if (id) {
            this.coursePlanService.get(Number(id)).subscribe(
              coursePlan => {
                // TODO: Remove courses that are in the course plan from courses to selected
                console.log(coursePlan);
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
}
