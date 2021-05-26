import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';

import { TokenInterceptorService } from './token-interceptor.service';

const URL = '/api/users';

@Injectable()
class MockDataService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(URL);
  }
}

describe('TokenInterceptorService', () => {
  let service: MockDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockDataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(MockDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const dummyToken = '1234';
    localStorage.setItem('TOKEN', dummyToken);

    service.getUsers().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(URL);
    expect(request.request.headers.has('Authorization')).toEqual(true);
    expect(request.request.headers.get('Authorization')).toBe(
      `Bearer ${dummyToken}`
    );
  });
});
