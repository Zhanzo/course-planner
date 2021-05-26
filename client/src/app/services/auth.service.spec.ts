import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
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
  */
});
