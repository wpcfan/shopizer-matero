import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class ShopizerReqInterceptor implements HttpInterceptor {
  constructor(private local: LocalStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const language = this.local.get('settings').language || 'en';
    const clonedReq = req.clone({
      headers: req.headers.set('Accept-Language', language),
      params: req.params.set('lang', language),
    });
    return next.handle(clonedReq);
  }
}
