import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CoursePlanService } from 'src/app/services/course-plan.service';
import { CoursePlan } from 'src/app/models/coursePlan.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-plan-details',
  templateUrl: './course-plan-details.component.html',
  styleUrls: ['./course-plan-details.component.css'],
})
export class CoursePlanDetailsComponent implements OnInit {
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
      this.coursePlanService.update(
        this.coursePlanId,
        this.name.value,
        this.selectedCourses
      );
    } /*if (this.userId)*/ else {
      const coursePlan: CoursePlan = {
        //owner: this.userId,
        title: this.name.value,
        courses: this.selectedCourses,
      };
      this.coursePlanService.create(coursePlan);
    }
  }

  onDelete(): void {
    if (this.coursePlanId) {
      this.coursePlanService.delete(this.coursePlanId);
    } else {
      this.router.navigateByUrl('user-details');
    }
  }

  ngOnInit(): void {
    this.courseService.get().subscribe(
      (courses) => {
        this.courses = courses;
        const coursePlanId = localStorage.getItem('coursePlanId');
        if (coursePlanId) {
          this.coursePlanService.get(coursePlanId).subscribe((coursePlan) => {
            this.coursePlanId = coursePlanId;
            this.moveCourseToSelected(coursePlan);
            this.name.setValue(coursePlan.title);
          });
        }
      },
      (error) => console.log(error)
    );
  }

  private moveCourseToSelected(coursePlan: CoursePlan): void {
    // Moves the previously selected courses to selected
    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      for (const coursePlanCourse of coursePlan.courses) {
        if (
          course.id === coursePlanCourse.id &&
          course.semester === coursePlanCourse.semester
        ) {
          this.selectedCourses.push(course);
          this.courses.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
}
