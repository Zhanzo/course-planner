import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
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
  coursePlanId?: string;
  name = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  courses: Course[] = [];
  selectedCourses: Course[] = [];
  coursePlanForm = this.formBuilder.group({
    name: this.name,
  });

  constructor(
    private router: Router,
    private courseService: CourseService,
    private coursePlanService: CoursePlanService,
    private formBuilder: FormBuilder
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
    if (this.coursePlanId) {
      localStorage.removeItem('coursePlanId');
      this.coursePlanService.update(
        this.coursePlanId,
        this.name.value,
        this.selectedCourses
      );
    } else if (this.email) {
      const coursePlan = new CoursePlan(
        this.email,
        this.name.value,
        this.selectedCourses
      );
      this.coursePlanService.create(coursePlan);
    }
  }

  onDelete(): void {
    if (this.coursePlanId) {
      localStorage.removeItem('coursePlanId');
      this.coursePlanService.delete(this.coursePlanId);
    } else {
      this.router.navigateByUrl('user-details');
    }
  }

  ngOnInit(): void {
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

    const coursePlanId = localStorage.getItem('coursePlanId');
    if (coursePlanId) {
      this.coursePlanService.get(coursePlanId).subscribe((coursePlan) => {
        this.coursePlanId = coursePlanId;
        this.moveCourseToSelected(coursePlan);
        this.name.setValue(coursePlan.title);
      });
    }
  }

  private moveCourseToSelected(coursePlan: CoursePlan): void {
    // Moves the previously selected courses to selected
    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      for (const coursePlanCourse of coursePlan.courses) {
        if (course.id === coursePlanCourse.id) {
          this.selectedCourses.push(course);
          this.courses.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
}
