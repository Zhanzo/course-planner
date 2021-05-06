import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoursePlan } from '../models/coursePlan.model';
import { Course } from '../models/course.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const baseUrl = '/api/course_plans/';

@Injectable({
  providedIn: 'root',
})
export class CoursePlanService {
  constructor(private http: HttpClient, private router: Router) {}

  getList(): Observable<CoursePlan[]> {
    return this.http.get<CoursePlan[]>(baseUrl);
  }

  get(id: number): Observable<CoursePlan> {
    return this.http.get<CoursePlan>(`${baseUrl}${id}`);
  }

  create(coursePlan: CoursePlan) {
    this.http
      .post(baseUrl, coursePlan, {
        headers: new HttpHeaders(
          'Authorization: Token ' + localStorage.getItem('token')
        ),
      })
      .subscribe(
        () => {
          this.router.navigateByUrl('user-details');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  update(id: number, title: string, courses: Course[]): void {
    const data = {
      title,
      courses,
    };
    this.http
      .patch(`${baseUrl}${id}`, data, {
        headers: new HttpHeaders(
          'Authorization: Token ' + localStorage.getItem('token')
        ),
      })
      .subscribe(() => this.router.navigateByUrl('user-details'));
  }

  delete(id: number) {
    this.http
      .delete(`${baseUrl}${id}`, {
        headers: new HttpHeaders(
          'Authorization: Token ' + localStorage.getItem('token')
        ),
      })
      .subscribe(() => this.router.navigateByUrl('user-details'));
  }
}
