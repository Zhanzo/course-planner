import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user.model';

const dummyUser: User = {
  id: '1',
  email: 'example@mail.com',
  coursePlans: [1, 2, 3],
};

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
    localStorage.setItem('userId', dummyUser.id);
    expect(service.getUserId()).toBe(dummyUser.id);
  });

  it('#get should be able to retrieve a user from the server by giving an id', () => {
    service.get(dummyUser.id).subscribe((user) => {
      expect(user).toBe(dummyUser);
    });

    const request = httpMock.expectOne(`/api/users/${dummyUser.id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });

  it('#getCurrentUser should get the currently signed in user from the server', () => {
    service.getCurrentUser().subscribe((user) => {
      expect(user).toBe(dummyUser);
    });

    const request = httpMock.expectOne('/api/current_user/');
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });
});
