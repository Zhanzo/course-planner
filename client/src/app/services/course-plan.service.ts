import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursePlan } from '../models/coursePlan.model';
import { Course } from '../models/course.model';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

const baseUrl = '/api/course_plans/';

@Injectable({
  providedIn: 'root',
})
export class CoursePlanService {
  private idKey = 'COURSE_PLAN_ID';

  constructor(private http: HttpClient) {}

  getId(): string | null {
    return localStorage.getItem(this.idKey);
  }

  storeId(id: string): void {
    localStorage.setItem(this.idKey, id);
  }

  getList(): Observable<CoursePlan[]> {
    return this.http.get<CoursePlan[]>(baseUrl);
  }

  get(id: any): Observable<CoursePlan> {
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

  update(id: string, title: string, courses: Course[]): Observable<boolean> {
    return this.http
      .patch(`${baseUrl}${id}`, {
        title,
        courses,
      })
      .pipe(
        tap(() => this.removeId()),
        mapTo(true),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}${id}`).pipe(
      tap(() => this.removeId()),
      mapTo(true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  removeId(): void {
    localStorage.removeItem(this.idKey);
  }
}
