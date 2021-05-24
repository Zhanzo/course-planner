import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
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

    expect(service.getUserId())
      .withContext('service returned user id')
      .toBe(dummyUserId);
  });

  it('#get should be able to retrieve a user given an id', () => {
    const dummyUser: User = {
      id: '1',
      email: 'mail@example.com',
      coursePlans: [1, 2, 3],
    };

    service.get(dummyUser.id).subscribe((user) => {
      expect(user).withContext('service returned user').toBe(dummyUser);
    });

    const request = httpMock.expectOne(`/api/users/${dummyUser.id}`);
    expect(request.request.method)
      .withContext('service sent get request')
      .toBe('GET');
    request.flush(dummyUser);
  });

  it('#getToken should get a token from the backend', () => {
    const dummyToken = '1234';
    const dummyServerToken: Token = {
      accessToken: 'abcd',
      expiresIn: 60,
      tokenType: '',
      scope: '',
      refreshToken: '1234abcd',
    };
    const dummyBackend = 'google';

    service.getToken(dummyToken, dummyBackend).subscribe((token) => {
      expect(token)
        .withContext('service returned token')
        .toBe(dummyServerToken);
    });

    const request = httpMock.expectOne('/auth/convert-token');
    expect(request.request.method)
      .withContext('service sent post request')
      .toBe('POST');
    expect(request.request.body.token)
      .withContext('service sent token')
      .toBe(dummyToken);
    expect(request.request.body.backend)
      .withContext('service sent backend')
      .toBe(dummyBackend);
    request.flush(dummyServerToken);
  });

  it('#getCurrentUser should get the currently signed in user from the backend', () => {
    const dummyUser: User = {
      id: '1',
      email: 'example@mail.com',
      coursePlans: [1, 2, 3],
    };

    service.getCurrentUser().subscribe((user) => {
      expect(user).withContext('service returned user').toBe(dummyUser);
    });

    const request = httpMock.expectOne('/api/current_user/');
    expect(request.request.method)
      .withContext('service sent get request')
      .toBe('GET');
    request.flush(dummyUser);
  });
});
