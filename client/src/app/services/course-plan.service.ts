import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CoursePlan} from '../models/coursePlan.model';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CoursePlanService {
  constructor(private http: HttpClient, private router: Router) {
  }

  getList(): Observable<CoursePlan[]> {
    return this.http.get<CoursePlan[]>('/api/course_plans/');
  }

  get(id: number): Observable<CoursePlan> {
    return this.http.get<CoursePlan>(`/api/course_plans/${id}`)
  }

  create(coursePlan: CoursePlan) {
    this.http
      .post('/api/course_plans/', coursePlan, {
        headers: new HttpHeaders(
          'Authorization: Token ' + localStorage.getItem('token')
        ),
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('user-details');
        },
        (error) => {
          console.log(error);
          this.router.navigateByUrl('');
        }
      );
  }
}
