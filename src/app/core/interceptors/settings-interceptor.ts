import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const settings = localStorage.getItem('settings');
    const language = settings ? JSON.parse(settings).language : 'en-US';
    return next.handle(
      request.clone({
        headers: request.headers.append('Accept-Language', language),
      })
    );
  }
}
