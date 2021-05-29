import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

import { TokenInterceptorService } from './token-interceptor.service';

const url = '/api/users';
const dummyToken = '1234';

@Injectable()
class MockDataService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(url);
  }
}

describe('TokenInterceptorService', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let service: MockDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    authServiceSpy.getToken.and.returnValue(dummyToken);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockDataService,
        { provide: AuthService, useValue: authServiceSpy },
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
    service.getUsers().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(url);
    expect(request.request.headers.has('Authorization')).toEqual(true);
    expect(request.request.headers.get('Authorization')).toBe(
      `Bearer ${dummyToken}`
    );
  });
});
