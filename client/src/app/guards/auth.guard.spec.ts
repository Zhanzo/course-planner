import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

class AuthServiceMock {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const routeMock = {} as ActivatedRouteSnapshot;
  const routeStateMock = {} as RouterStateSnapshot;
  const routerMock = { navigate: jasmine.createSpy('navigate') };
  const authService = new AuthServiceMock();
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: routerMock },
      ],
      imports: [HttpClientTestingModule],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthorized user to the home page', () => {
    authService.authenticated = false;
    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });

  it('should allow an authenticated user to access the app', () => {
    authService.authenticated = true;
    expect(guard.canActivate(routeMock, routeStateMock)).toBeTrue();
  });
});
