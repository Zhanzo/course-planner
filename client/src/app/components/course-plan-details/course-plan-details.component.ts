import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CoursePlan } from '../../models/coursePlan.model';
import { CoursePlanService } from '../../services/course-plan.service';

@Component({
  selector: 'app-course-plan-details',
  templateUrl: './course-plan-details.component.html',
  styleUrls: ['./course-plan-details.component.css'],
})
export class CoursePlanDetailsComponent implements OnInit {
  email?: string;
  coursePlan?: CoursePlan;
  coursePlanForm = new FormGroup({
    name: new FormControl(''),
    courses: new FormControl([]),
  });
  courses: Course[] = [];
  selected: Course[] = [];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private coursePlanService: CoursePlanService,
    private userService: UserService
  ) {}

  drop(event: CdkDragDrop<Course[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSave(): void {
    // Send to database and go back
    if (this.coursePlan && this.coursePlan.id) {
      localStorage.removeItem('coursePlanId');
      this.coursePlanService.update(
        this.coursePlan.id,
        this.coursePlanForm.value.name,
        this.selected
      );
    } else if (this.email) {
      const coursePlan = new CoursePlan(
        this.email,
        this.coursePlanForm.value.name,
        this.selected
      );
      this.coursePlanService.create(coursePlan);
    }
  }

  onDelete(): void {
    if (this.coursePlan && this.coursePlan.id) {
      localStorage.removeItem('coursePlanId');
      this.coursePlanService.delete(this.coursePlan.id);
    } else {
      this.router.navigateByUrl('user-details');
    }
  }

  ngOnInit(): void {
    console.log('Init courseplan');
    const email = localStorage.getItem('email');

    if (!email) {
      this.router.navigateByUrl('');
      return;
    }

    this.email = email;
    this.courseService.get().subscribe(
      (courses) => (this.courses = courses),
      (error) => console.log(error)
    );

    console.log('Get courseplan');
    const coursePlanId = localStorage.getItem('coursePlanId');
    console.log('From localStorage');
    if (coursePlanId) {
      console.log('Send request');
      this.coursePlanService
        .get(Number(coursePlanId))
        .subscribe((coursePlan) => {
          // Move the previously selected courses to selected
          console.log(coursePlan);
          this.coursePlan = coursePlan;
          console.log('Moving courses');
          this.moveCourseToSelected(coursePlan);
          this.coursePlanForm.patchValue({ name: coursePlan.title });
        });
    }
  }

  moveCourseToSelected(coursePlan: CoursePlan): void {
    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      for (const coursePlanCourse of coursePlan.courses) {
        if (course.id === coursePlanCourse.id) {
          this.selected.push(course);
          this.courses.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
}
