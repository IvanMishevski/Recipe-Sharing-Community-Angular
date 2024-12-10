import { HttpInterceptorFn } from '@angular/common/http';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';

const { apiUrl } = environment

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const API = '/api';
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true
    });
  }
  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else {
        errorMsgService.setError(err);
        router.navigate(['/error'])
      }
      return throwError(() => err);
    })
  )
};
