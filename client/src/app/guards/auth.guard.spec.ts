import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const routeMock = {} as ActivatedRouteSnapshot;
  const routeStateMock = {} as RouterStateSnapshot;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let guard: AuthGuard;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [HttpClientTestingModule],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthorized user to the home page', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalledTimes(1);
  });

  it('should allow an authenticated user to access the app', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toBeTrue();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalledTimes(1);
  });
});
