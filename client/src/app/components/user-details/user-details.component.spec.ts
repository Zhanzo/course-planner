import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { CoursePlan } from 'src/app/models/coursePlan.model';
import { User } from 'src/app/models/user.model';
import { CoursePlanService } from 'src/app/services/course-plan.service';
import { UserService } from 'src/app/services/user.service';

import { UserDetailsComponent } from './user-details.component';

const dummyUser: User = {
  id: 1,
  email: 'example@mail.com',
  coursePlans: [1, 2],
};
const dummyCoursePlans: CoursePlan[] = [
  {
    id: dummyUser.coursePlans[0],
    owner: dummyUser.email,
    title: 'Spring 2020',
    courses: [],
  },
  {
    id: dummyUser.coursePlans[1],
    owner: dummyUser.email,
    title: 'Fall 2021',
    courses: [],
  },
];

describe('UserDetailsComponent', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let coursePlanServiceSpy: jasmine.SpyObj<CoursePlanService>;

  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    coursePlanServiceSpy = jasmine.createSpyObj('CoursePlanService', [
      'removeId',
      'get',
      'storeId',
      'delete',
    ]);

    userServiceSpy.getCurrentUser.and.returnValue(of(dummyUser));
    coursePlanServiceSpy.get
      .withArgs(dummyCoursePlans[0].id)
      .and.returnValue(of(dummyCoursePlans[0]));
    coursePlanServiceSpy.get
      .withArgs(dummyCoursePlans[1].id)
      .and.returnValue(of(dummyCoursePlans[1]));

    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: CoursePlanService, useValue: coursePlanServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.coursePlans).toEqual(dummyCoursePlans);
  });

  it('should be able to delete a course plan', fakeAsync(() => {
    coursePlanServiceSpy.delete.and.returnValue(of(true));
    component.onDelete(dummyCoursePlans[0]);

    tick();

    expect(coursePlanServiceSpy.delete).toHaveBeenCalledOnceWith(
      dummyCoursePlans[0].id
    );
    expect(component.coursePlans).toEqual([dummyCoursePlans[1]]);
  }));
});
