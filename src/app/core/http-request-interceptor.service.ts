import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

// import { NgProgress } from '@ngx-progressbar/core';

import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



import { AuthenticationService } from '../services/authentication.service';
import { HttpError } from '../model/http-error.model';

@Injectable()
export class HttpRequestInterceptorService implements HttpInterceptor {
  private _inProgressCount = 0;

  constructor(private authService: AuthenticationService, ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let headerChangeReq = null;

    this._inProgressCount++;



    if (!req.headers.has('Content-Type')) {
      // add header here
      headerChangeReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!req.headers.has('Accept')) {
      // add header here
      headerChangeReq = req.clone({
        setHeaders: {
          Accept: 'application/json'
        }
      });
    }

    if (!req.url.includes("api/authenticate")) {
      let currentUser = this.authService.currentUserValue;
      if (currentUser && currentUser.token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    }

    if (!headerChangeReq) {
      headerChangeReq = req;
    }

    // extend server response observable with logging
    return next.handle(headerChangeReq).pipe(
      catchError((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authService.logout();
            location.reload(true);
          }
          let errorObj: HttpError = { code: '' };
          if (err.error && err.error.code) {
            errorObj = <HttpError>err.error;
          } else {
            errorObj.code = '' + err.status;
            errorObj.message = this.getHTTPMessageByCode(err.status);
          }
          return throwError(errorObj);
        }
        console.error('unexpected error', err);
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${headerChangeReq.method} "${headerChangeReq.urlWithParams}" in ${elapsed} ms.`;
        console.log(`Request Completed -> ${msg}`);

        this._inProgressCount--;
        // if (this._inProgressCount === 0) {

        // }
      })
    );
  }

  private getHTTPMessageByCode(code: number): string {
    let message = '';
    switch (code) {
      case 400:
        message = 'The server cannot process the request due to an unknown error';
        break;
      case 401:
        message = 'Your session has been expired.';
        break;
      case 404:
        message = 'The requested resource could not be found.';
        break;
      case 408:
        message = 'The server timed out waiting for the request.';
        break;
      case 413:
        message = 'Request Entity Too Large.';
        break;
      case 414:
        message = 'Request-URI Too Long.';
        break;
      case 414:
        message = 'Request-URI Too Long.';
        break;
      case 500:
        message = 'Internal Server Error.';
        break;
      case 501:
        message = 'The server was unable to fulfill the request.';
        break;
      case 502:
        message = 'Bad Gateway.';
        break;
      case 503:
        message = 'The server is currently unavailable.';
        break;
      case 504:
        message = 'Gateway Timeout.';
        break;
      default:
        message = 'Something went wrong. Please retry.';
        break;
    }
    return message;
  }
}
