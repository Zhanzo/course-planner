import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import { Course } from '../../models/course.model';
import {CoursePlan} from '../../models/coursePlan.model';

@Component({
  selector: 'app-course-plan-details',
  templateUrl: './course-plan-details.component.html',
  styleUrls: ['./course-plan-details.component.css']
})
export class CoursePlanDetailsComponent implements OnInit {
  user?: User;
  coursePlanForm = this.formBuilder.group({
    name: '',
    courses: []
  });
  courses = [
    {
      code: 'TDDD27',
      name: 'Advanced Web Programming',
      credits: 6,
      semester: ['VT2'],
      level: 'A1X',
      module: [3] 
    },
    {
      code: 'TDDE41',
      name: 'Software Architecture',
      credits: 6,
      semester: ['VT2'],
      level: 'A1X',
      module: [1]
    },
    {
      code: 'TDDD38',
      name: 'Advanced Programming in C++',
      credits: 6,
      semester: ['VT1, VT2'],
      level: 'A1X',
      module: [2, 2]
    },
    {
      code: 'TDDD97',
      name: 'Web Programming',
      credits: 6,
      semester: ['VT1'],
      level: 'G1X',
      module: [3]
    },
  ];
  selected: Course[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    console.log('Running CoursePlanDetailsComponent');
    const email = localStorage.getItem('email');
    if (email) {
      this.userService.get(email).subscribe(
          user => {
            this.user = user;
          }, error => {
            console.log(error);
            this.router.navigateByUrl('');
          }
      );
    }
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
    console.log(this.coursePlanForm);

    this.router.navigateByUrl('user-details').then(
      r => {
        console.log(r);
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
