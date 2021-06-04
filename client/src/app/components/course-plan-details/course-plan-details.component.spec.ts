import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CourseFilterPipe } from 'src/app/filters/course-filter.pipe';
import { Course } from 'src/app/models/course.model';
import { CoursePlan } from 'src/app/models/coursePlan.model';
import { CoursePlanService } from 'src/app/services/course-plan.service';
import { CourseService } from 'src/app/services/course.service';

import { CoursePlanDetailsComponent } from './course-plan-details.component';

const dummyCourses: Course[] = [
  {
    id: 1,
    code: 'TDDD38',
    name: 'Advanced Programming in C++',
    credits: 6,
    period: '1,2',
    semester: '1',
    level: 'A1X',
    module: '2,2',
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
    code: 'TDDD27',
    name: 'Advanced Web Programming',
    credits: 6,
    period: '2',
    semester: '2',
    level: 'A1X',
    module: '3',
  },
];
const dummyCoursePlan: CoursePlan = {
  id: 1,
  owner: 'example@mail.com',
  title: 'Spring 2020',
  courses: [dummyCourses[0], dummyCourses[1]],
};

export class MockActivatedRoute {
  private params = { id: 0 };

  constructor(id: number) {
    this.params.id = id;
  }

  get snapshot() {
    return { params: this.params, queryParams: this.params };
  }
}

describe('CoursePlanDetailsComponent with a CoursePlan', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let coursePlanServiceSpy: jasmine.SpyObj<CoursePlanService>;
  let component: CoursePlanDetailsComponent;
  let fixture: ComponentFixture<CoursePlanDetailsComponent>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    courseServiceSpy = jasmine.createSpyObj('CourseService', ['get']);
    coursePlanServiceSpy = jasmine.createSpyObj('CoursePlanService', [
      'get',
      'delete',
      'create',
      'update',
    ]);

    coursePlanServiceSpy.get.withArgs(1).and.returnValue(of(dummyCoursePlan));
    courseServiceSpy.get.and.returnValue(of(dummyCourses.slice()));

    await TestBed.configureTestingModule({
      declarations: [CoursePlanDetailsComponent, CourseFilterPipe],
      providers: [
        FormBuilder,
        HttpClientModule,
        { provide: Router, useValue: routerSpy },
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: CoursePlanService, useValue: coursePlanServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: new MockActivatedRoute(dummyCoursePlan.id),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(courseServiceSpy.get).toHaveBeenCalledTimes(1);
    expect(coursePlanServiceSpy.get).toHaveBeenCalledOnceWith(1);
    expect(component.coursePlan).toBe(dummyCoursePlan);
    expect(component.courses).toEqual([dummyCourses[2]]);
    expect(component.selectedCourses).toEqual([
      dummyCourses[0],
      dummyCourses[1],
    ]);
    expect(component.title.value).toEqual(dummyCoursePlan.title);
  });

  it('#onSave() should call update() on CoursePlanService and navigate to user page', fakeAsync(() => {
    coursePlanServiceSpy.update.and.returnValue(of(true));
    component.onSave();

    tick();

    expect(coursePlanServiceSpy.update).toHaveBeenCalledOnceWith(
      dummyCoursePlan.id,
      dummyCoursePlan.title,
      dummyCoursePlan.courses
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user');
  }));

  it('#onDelete() should call delete() on CoursePlanService and navigate to the user page', fakeAsync(() => {
    coursePlanServiceSpy.delete.and.returnValue(of(true));
    component.onDelete();

    tick();

    expect(coursePlanServiceSpy.delete).toHaveBeenCalledOnceWith(
      dummyCoursePlan.id
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user');
  }));
});

describe('CoursePlanDetailsComponent without a CoursePlan', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let coursePlanServiceSpy: jasmine.SpyObj<CoursePlanService>;
  let component: CoursePlanDetailsComponent;
  let fixture: ComponentFixture<CoursePlanDetailsComponent>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    courseServiceSpy = jasmine.createSpyObj('CourseService', ['get']);
    coursePlanServiceSpy = jasmine.createSpyObj('CoursePlanService', [
      'get',
      'delete',
      'create',
      'update',
    ]);

    coursePlanServiceSpy.get
      .withArgs(dummyCoursePlan.id)
      .and.returnValue(of(dummyCoursePlan));
    courseServiceSpy.get.and.returnValue(of(dummyCourses.slice()));

    await TestBed.configureTestingModule({
      declarations: [CoursePlanDetailsComponent, CourseFilterPipe],
      providers: [
        FormBuilder,
        HttpClientModule,
        { provide: Router, useValue: routerSpy },
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: CoursePlanService, useValue: coursePlanServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: new MockActivatedRoute(-1),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(courseServiceSpy.get).toHaveBeenCalledTimes(1);
    expect(component.coursePlan).toBe(undefined);
    expect(component.courses).toEqual(dummyCourses);
    expect(component.selectedCourses).toEqual([]);
    expect(component.title.value).toEqual('');
  });

  it('#onSave() should call create() on CoursePlanService and navigate to user page', fakeAsync(() => {
    coursePlanServiceSpy.create.and.returnValue(of(true));
    component.onSave();

    tick();

    expect(coursePlanServiceSpy.create).toHaveBeenCalledOnceWith('', []);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user');
  }));

  it('#onDelete() should navigate to the user page', fakeAsync(() => {
    component.onDelete();

    tick();

    expect(coursePlanServiceSpy.delete).toHaveBeenCalledTimes(0);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user');
  }));
});
