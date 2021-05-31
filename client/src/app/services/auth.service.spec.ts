import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Token } from '../models/token.model';

import {
  AuthService,
  clientId,
  clientSecret,
  tokenKey,
  refreshTokenKey,
} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(refreshTokenKey);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login() should send an accessToken to the server', () => {
    const dummyToken = '1234';
    const dummyBackend = 'google';
    const dummyServerToken: Token = {
      accessToken: 'abcd',
      expiresIn: 60,
      tokenType: 'Bearer',
      scope: 'read write',
      refreshToken: '1234abcd',
    };

    service.login(dummyToken, dummyBackend).subscribe((response) => {
      expect(response).toBeTrue();
      expect(localStorage.getItem(tokenKey)).toBe(dummyServerToken.accessToken);
      expect(localStorage.getItem(refreshTokenKey)).toBe(
        dummyServerToken.refreshToken
      );
    });

    const request = httpMock.expectOne('/auth/convert-token/');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.token).toBe(dummyToken);
    expect(request.request.body.backend).toBe(dummyBackend);
    expect(request.request.body.grantType).toBe('convert_token');
    expect(request.request.body.clientId).toBe(clientId);
    expect(request.request.body.clientSecret).toBe(clientSecret);
    request.flush(dummyServerToken);
  });

  it('#logout() should send a post request with client id to the server', () => {
    localStorage.setItem(tokenKey, '1234');
    localStorage.setItem(refreshTokenKey, 'abcd1234');

    service.logout().subscribe((response) => {
      expect(response).toBeTrue();
      expect(localStorage.getItem(tokenKey)).toBeNull();
      expect(localStorage.getItem(refreshTokenKey)).toBeNull();
    });

    const request = httpMock.expectOne('/auth/invalidate-sessions/');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.clientId).toBe(clientId);
    request.flush(null, {
      status: 200,
      statusText: 'Tokens removed successfully',
    });
  });

  it('#getToken() should return token from localStorage', () => {
    const dummyToken = '1234';
    localStorage.setItem(tokenKey, dummyToken);

    expect(service.getToken()).toBe(dummyToken);
  });

  it('#isAuthenticated() should return true as long as a token or refresh token exists in localStorage', () => {
    localStorage.setItem(tokenKey, '1234');
    expect(service.isAuthenticated()).toBeTrue();

    localStorage.removeItem(tokenKey);
    localStorage.setItem(refreshTokenKey, 'abcd1234');
    expect(service.isAuthenticated()).toBeTrue();

    localStorage.removeItem(refreshTokenKey);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('#refreshToken() should send a post request with a refresh token', () => {
    const dummyRefreshToken = 'abcd';
    const dummyServerToken: Token = {
      accessToken: '1234',
      expiresIn: 60,
      tokenType: 'Bearer',
      scope: 'read write',
      refreshToken: '1234abcd',
    };

    localStorage.setItem(refreshTokenKey, dummyRefreshToken);
    service.refreshToken().subscribe((token) => {
      expect(localStorage.getItem(tokenKey)).toBe(dummyServerToken.accessToken);
      expect(localStorage.getItem(refreshTokenKey)).toBe(
        dummyServerToken.refreshToken
      );
      expect(token).toBe(dummyServerToken);
    });

    const request = httpMock.expectOne('/auth/token/');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.grantType).toBe('refresh_token');
    expect(request.request.body.clientId).toBe(clientId);
    expect(request.request.body.clientSecret).toBe(clientSecret);
    expect(request.request.body.refreshToken).toBe(dummyRefreshToken);
    request.flush(dummyServerToken);
  });

  it('#removeTokens() should remove tokens from localStorage', () => {
    localStorage.setItem(tokenKey, '1234');
    localStorage.setItem(refreshTokenKey, 'abcd');

    service.removeTokens();

    expect(localStorage.getItem(tokenKey)).toBeNull();
    expect(localStorage.getItem(refreshTokenKey)).toBeNull();
  });
});
