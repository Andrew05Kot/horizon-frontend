import {AuthService} from 'src/app/_services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(`${environment.apiUrl}`) && !request.url.startsWith(`${environment.apiUrl}` + '/auth')) {
      if (this.cookieService.get('userToken')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.cookieService.get('userToken')}`
          }
        });

      }
    }
    return next.handle(request).pipe(catchError((error) => {
      return this.handleErrorResponse(error, request, next)
    }));
  }

  handleErrorResponse(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Error Event');
      } else {
        switch (error.status) {
          case 401:
            this.authService.logOut();
            break;
          case 426:
            return this.authService.getAuthUser(this.cookieService.get('userToken'))
              .pipe(switchMap((token) => {
                return this.intercept(request, next);
              }));
            break;
        }
      }
    } else {
      console.error('some thing else happened', error);
    }
    return throwError(error);
  }

}
