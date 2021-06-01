import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { LogInComponent } from './log-in.component';

const dummyToken = '1234';
const dummySocialUser: SocialUser = {
  id: '',
  provider: '',
  email: '',
  name: '',
  photoUrl: '',
  firstName: '',
  lastName: '',
  authToken: dummyToken,
  idToken: '',
  authorizationCode: '',
  response: '',
};

describe('LogInComponent', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let socialAuthServiceSpy: jasmine.SpyObj<SocialAuthService>;
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
    ]);
    socialAuthServiceSpy = jasmine.createSpyObj<SocialAuthService>(
      'SocialAuthService',
      ['signIn']
    );

    authServiceSpy.login.and.returnValue(of(true));
    socialAuthServiceSpy.signIn.and.returnValue(
      Promise.resolve(dummySocialUser)
    );

    await TestBed.configureTestingModule({
      declarations: [LogInComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SocialAuthService, useValue: socialAuthServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to login with Facebook', fakeAsync(() => {
    component.logInWithFacebook();
    tick();
    expect(socialAuthServiceSpy.signIn).toHaveBeenCalledTimes(1);
    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
      dummyToken,
      'facebook'
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user');
  }));

  it('should be able to login with Google', fakeAsync(() => {
    component.logInWithGoogle();
    tick();
    expect(socialAuthServiceSpy.signIn).toHaveBeenCalledTimes(1);
    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
      dummyToken,
      'google-oauth2'
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user');
  }));
});
