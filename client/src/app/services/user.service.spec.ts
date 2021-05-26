import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getUserId should return value from localStorage', () => {
    const dummyUserId = '1';
    localStorage.setItem('userId', dummyUserId);

    expect(service.getUserId()).toBe(dummyUserId);
  });

  it('#get should be able to retrieve a user given an id', () => {
    const dummyUser: User = {
      id: '1',
      email: 'mail@example.com',
      coursePlans: [1, 2, 3],
    };

    service.get(dummyUser.id).subscribe((user) => {
      expect(user).toBe(dummyUser);
    });

    const request = httpMock.expectOne(`/api/users/${dummyUser.id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });

  it('#getCurrentUser should get the currently signed in user from the backend', () => {
    const dummyUser: User = {
      id: '1',
      email: 'example@mail.com',
      coursePlans: [1, 2, 3],
    };

    service.getCurrentUser().subscribe((user) => {
      expect(user).toBe(dummyUser);
    });

    const request = httpMock.expectOne('/api/current_user/');
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });
});
