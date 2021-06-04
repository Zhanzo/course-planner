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
  searchTextSelected = '';
  coursePlan?: CoursePlan;
  courses: Course[] = [];
  selectedCourses: Course[] = [];
  coursePlanForm = this.formBuilder.group({
    title: this.title,
  });
  totalCredits?: number = 0;
  advancedCredits?: number = 0;
  basicCredits?: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private coursePlanService: CoursePlanService,
    private formBuilder: FormBuilder
  ) {}

  drop(event: CdkDragDrop<Course[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.sortCourses();
      this.sortSelectedCourses();
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

  hasCollision(course: Course): boolean {
    for (const otherCourse of this.selectedCourses) {
      if (course.code === otherCourse.code) {
        continue;
      } else if (course.semester === otherCourse.semester) {
        if (course.period.length === 3 && otherCourse.period.length === 3) {
          if (
            course.module === otherCourse.module ||
            course.module[0] === otherCourse.module[0] ||
            course.module[2] === otherCourse.module[2]
          ) {
            return true;
          }
        } else if (
          course.period.length === 1 &&
          otherCourse.period.length === 3
        ) {
          const otherCourseModule = otherCourse.module.split(',');
          const periodIdx = Number(course.period) - 1;

          if (course.module === otherCourseModule[periodIdx]) {
            return true;
          }
        } else if (
          course.period.length === 3 &&
          otherCourse.period.length === 1
        ) {
          const courseModule = course.module.split(',');
          const periodIdx = Number(otherCourse.period) - 1;

          if (otherCourse.module === courseModule[periodIdx]) {
            return true;
          }
        } else if (
          course.period === otherCourse.period &&
          course.module === otherCourse.module
        ) {
          return true;
        }
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.courseService.get().subscribe(
      (courses) => {
        this.courses = courses;
        this.sortCourses();
        const coursePlanId = Number(this.activatedRoute.snapshot.params.id);
        if (coursePlanId !== -1) {
          this.coursePlanService
            .get(coursePlanId)
            .subscribe((coursePlan: CoursePlan) => {
              this.coursePlan = coursePlan;
              this.moveCourseToSelected(this.coursePlan);
              this.sortSelectedCourses();
              this.statistics();
              this.title.setValue(this.coursePlan.title);
            });
        }
      },
      (error) => console.log(error)
    );
  }

  private sortCourses(): void {
    this.courses.sort((a, b) => {
      const compareSemester = a.semester.localeCompare(b.semester);
      const comparePeriod = a.period.localeCompare(b.period);
      const compareModule = a.module.localeCompare(b.module);
      return compareSemester || comparePeriod || compareModule;
    });
  }

  private sortSelectedCourses(): void {
    this.selectedCourses.sort((a, b) => {
      const compareSemester = a.semester.localeCompare(b.semester);
      const comparePeriod = a.period.localeCompare(b.period);
      const compareModule = a.module.localeCompare(b.module);
      return compareSemester || comparePeriod || compareModule;
    });
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
