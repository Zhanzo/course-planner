import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Course } from '../models/course.model';
import { CoursePlan } from '../models/coursePlan.model';

import { CoursePlanService } from './course-plan.service';

describe('CoursePlanService', () => {
  let service: CoursePlanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CoursePlanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getId() returns course plan id from localStorage', () => {
    const dummyId = '1';
    localStorage.setItem('COURSE_PLAN_ID', dummyId);
    expect(service.getId()).toBe(dummyId);
  });

  it('#setId() sets the course plan id in localStorage', () => {
    const dummyId = '1';
    service.storeId(dummyId);
    expect(localStorage.getItem('COURSE_PLAN_ID')).toBe(dummyId);
  });

  it('#getList() should send a get request for a list of courses', () => {
    const dummyCoursePlans: CoursePlan[] = [
      {
        id: '1',
        owner: 'example@mail.com',
        title: 'Spring 2020',
        courses: [],
      },
      {
        id: '2',
        owner: 'example2@mail.com',
        title: 'Fall 2020',
        courses: [],
      },
    ];

    service.getList().subscribe((courseList) => {
      expect(courseList).toBe(dummyCoursePlans);
    });

    const request = httpMock.expectOne('/api/course_plans/');
    expect(request.request.method).toBe('GET');
    request.flush(dummyCoursePlans);
  });

  it('#get() should send a get request for a specific course plan', () => {
    const dummyCoursePlan: CoursePlan = {
      id: '1',
      owner: 'example@mail.com',
      title: 'Spring 2020',
      courses: [],
    };

    service.get(dummyCoursePlan.id).subscribe((courseList) => {
      expect(courseList).toBe(dummyCoursePlan);
    });

    const request = httpMock.expectOne(
      `/api/course_plans/${dummyCoursePlan.id}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(dummyCoursePlan);
  });

  it('#create() should send a post request with a title and a list of courses', () => {
    const dummyTitle = 'Spring 2020';
    const dummyCourses: Course[] = [];

    service.create(dummyTitle, dummyCourses).subscribe((response) => {
      expect(response).toBeTrue();
    });

    const request = httpMock.expectOne('/api/course_plans/');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.title).toBe(dummyTitle);
    expect(request.request.body.courses).toBe(dummyCourses);
  });

  it('#update() should send a patch request with the title and a list of courses', () => {
    const dummyId = '1';
    const dummyTitle = 'Spring 2020';
    const dummyCourses: Course[] = [];

    service.update(dummyId, dummyTitle, dummyCourses).subscribe((response) => {
      expect(response).toBeTrue();
    });

    const request = httpMock.expectOne(`/api/course_plans/${dummyId}`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body.title).toBe(dummyTitle);
    expect(request.request.body.courses).toBe(dummyCourses);
  });

  it('#delete() should send a delete request with an id', () => {
    const dummyId = '1';

    service.delete(dummyId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`/api/course_plans/${dummyId}`);
    expect(request.request.method).toBe('DELETE');
  });
});
