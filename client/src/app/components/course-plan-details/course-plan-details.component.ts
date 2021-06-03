import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';
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
  searchText = '';
  coursePlan?: CoursePlan;
  courses: Course[] = [];
  selectedCourses: Course[] = [];
  coursePlanForm = this.formBuilder.group({
    title: this.title,
  });
  totalCredits?: number;
  advancedCredits?: number;
  basicCredits?: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
      this.statistics();
    }
  }

  onSave(): void {
    // Send to database and go back
    if (this.coursePlan) {
      this.coursePlanService
        .update(this.coursePlan.id, this.title.value, this.selectedCourses)
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigateByUrl('user');
          } else {
            alert('Course plan could not be saved');
          }
        });
    } else {
      this.coursePlanService
        .create(this.title.value, this.selectedCourses)
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigateByUrl('user');
          } else {
            alert('Course plan could not be saved.');
          }
        });
    }
  }

  onDelete(): void {
    if (this.coursePlan) {
      this.coursePlanService
        .delete(this.coursePlan.id)
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigateByUrl('user');
          } else {
            alert('Course plan could not be deleted');
          }
        });
    } else {
      this.router.navigateByUrl('user');
    }
  }

  ngOnInit(): void {
    this.courseService.get().subscribe(
      (courses) => {
        this.courses = courses;
        const coursePlanId = Number(this.activatedRoute.snapshot.params.id);
        if (coursePlanId !== -1) {
          this.coursePlanService
            .get(coursePlanId)
            .subscribe((coursePlan: CoursePlan) => {
              this.coursePlan = coursePlan;
              this.moveCourseToSelected(this.coursePlan);
              this.statistics();
              this.title.setValue(this.coursePlan.title);
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

  private statistics(): void {
    this.advancedCredits = 0;
    this.basicCredits = 0;
    for (const course of this.selectedCourses) {
      if (course.level === 'A1X') {
        this.advancedCredits += course.credits;
      } else if (course.level === 'G2X' || course.level === 'G1X') {
        this.basicCredits += course.credits;
      }
      this.totalCredits = this.advancedCredits + this.basicCredits;
    }
  }
}
