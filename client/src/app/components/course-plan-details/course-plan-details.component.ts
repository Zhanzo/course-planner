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
  title = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  courses: Course[] = [];
  selectedCourses: Course[] = [];
  coursePlanForm = this.formBuilder.group({
    title: this.title,
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
    const coursePlanId = this.coursePlanService.getId();
    if (coursePlanId) {
      this.coursePlanService
        .update(coursePlanId, this.title.value, this.selectedCourses)
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigateByUrl('user-details');
          } else {
            alert('Course plan could not be saved');
          }
        });
    } else {
      this.coursePlanService
        .create(this.title.value, this.selectedCourses)
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigateByUrl('user-details');
          } else {
            alert('Course plan could not be saved.');
          }
        });
    }
  }

  onDelete(): void {
    const id = this.coursePlanService.getId();
    if (id) {
      this.coursePlanService.delete(id).subscribe((success: boolean) => {
        if (success) {
          this.router.navigateByUrl('user-details');
        } else {
          alert('Course plan could not be deleted');
        }
      });
    } else {
      this.router.navigateByUrl('user-details');
    }
  }

  ngOnInit(): void {
    this.courseService.get().subscribe(
      (courses) => {
        this.courses = courses;
        const coursePlanId = this.coursePlanService.getId();
        if (coursePlanId) {
          this.coursePlanService.get(coursePlanId).subscribe((coursePlan) => {
            this.moveCourseToSelected(coursePlan);
            this.title.setValue(coursePlan.title);
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
