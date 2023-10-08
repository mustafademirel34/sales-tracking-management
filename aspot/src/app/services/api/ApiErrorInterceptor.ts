import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        // Burada API çağrısından dönen hataları ele alabilirsiniz
        if (error.status === 0) {
          // Sunucuya bağlanılamadı, istenilen sayfaya yönlendir
          this.router.navigate(['not-found'], { queryParams: { wha: 0} });
          console.error("HATA HATA HATA HATA HATA")
        }

        return throwError(error);
      })
    );
  }
}
