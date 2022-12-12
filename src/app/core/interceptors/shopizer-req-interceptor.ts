import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class ShopizerReqInterceptor implements HttpInterceptor {
  constructor(private local: LocalStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.apiUrl)) {
      return next.handle(req);
    }
    const language = this.local.get('settings').language || 'en';
    const params = req.params.set('lang', language);
    if (!params.has('store')) {
      params.set('store', localStorage.getItem('store') ?? environment.defaultStore);
    }
    const clonedReq = req.clone({
      params,
    });
    return next.handle(clonedReq);
  }
}
