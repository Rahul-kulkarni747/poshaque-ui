import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private globalService: GlobalService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");
    if (token != null)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    return next.handle(request).pipe(
      catchError((err: any) => {
        this.globalService.hideLoader();
        if (typeof err.error.body !== "undefined") {
          if (err.error.body.error == "Unauthorized") {
            this.globalService.addAlert("danger", "Session Expired");
            this.router.navigate(['login']);
          }
          else {
            this.globalService.addAlert("danger", "Servers are unreachable. Try again later.");
          }
        }
        else {
          this.globalService.addAlert("danger", "Servers are unreachable. Try again later.");
        }
        return of(err);
      })
    );
  }
}