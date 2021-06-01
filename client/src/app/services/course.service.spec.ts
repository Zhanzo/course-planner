import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Course } from '../models/course.model';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#get() should give a list of courses', () => {
    const dummyCourses: Course[] = [
      {
        id: 1,
        code: 'TDDD27',
        name: 'Advanced Web Programming',
        credits: 6,
        period: '2',
        semester: '2',
        level: 'A1X',
        module: '3',
      },
      {
        id: 2,
        code: 'TDDE41',
        name: 'Software Architecture',
        credits: 6,
        period: '2',
        semester: '2',
        level: 'A1X',
        module: '1',
      },
      {
        id: 3,
        code: 'TDDD38',
        name: 'Advanced Programming in C++',
        credits: 6,
        period: '1,2',
        semester: '1',
        level: 'A1X',
        module: '2,2',
      },
    ];

    service.get().subscribe((courseList) => {
      expect(courseList).toBe(dummyCourses);
    });

    const request = httpMock.expectOne('/api/courses/');
    expect(request.request.method).toBe('GET');
    request.flush(dummyCourses);
  });
});
