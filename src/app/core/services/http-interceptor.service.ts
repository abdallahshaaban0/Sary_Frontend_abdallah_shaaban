import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private router: Router, private toastr: ToastrService, private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method == "GET" && !req.url.includes('.json') && req.url.includes('api/v1') && !location.pathname.includes('company-profile') && !req.url.includes('apps/type?type=APP')) {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);
    }

    let header = req.headers.set('Content-Type', 'application/json');
    req = req.clone(
      { headers: header }
    );


    const _this = this;
    return next.handle(req).pipe(
      map((res: any) => {
        if (res['ok']) {
          if (req.method == 'POST') {
            _this.toastr.success('New Item has been created successfully', 'Added');
          } else if (req.method == 'PUT' || req.method == "PATCH") {
            _this.toastr.success('Updated successfully', 'Updated');
          } else if (req.method == 'DELETE') {
            _this.toastr.success('Deleted successfully', 'Deleted');
          }
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 401) {
          _this.router.navigateByUrl('/login');
        }
        else if (error.status === 400) {
          _this.toastr.error(error.error.debugMessage, 'Error Message : ');
        }
        // _this.toastr.show(error.error.message, 'danger');
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${
            error.error.message
            }`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
