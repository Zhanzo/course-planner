import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${token.accessToken}`
        ),
      });
    }

    return next.handle(request).pipe(
      tap(
        () => {},
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigateByUrl('');
          }
        }
      )
    );
  }
}
