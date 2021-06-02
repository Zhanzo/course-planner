import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursePlan } from '../models/coursePlan.model';
import { Course } from '../models/course.model';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

const baseUrl = '/api/course_plans/';

@Injectable({
  providedIn: 'root',
})
export class CoursePlanService {
  constructor(private http: HttpClient) {}

  getList(): Observable<CoursePlan[]> {
    return this.http.get<CoursePlan[]>(baseUrl);
  }

  get(id: number): Observable<CoursePlan> {
    return this.http.get<CoursePlan>(`${baseUrl}${id}`);
  }

  create(title: string, courses: Course[]): Observable<boolean> {
    return this.http
      .post(baseUrl, {
        title,
        courses,
      })
      .pipe(
        mapTo(true),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  update(id: number, title: string, courses: Course[]): Observable<boolean> {
    return this.http
      .patch(`${baseUrl}${id}`, {
        title,
        courses,
      })
      .pipe(
        mapTo(true),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}${id}`).pipe(
      mapTo(true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
