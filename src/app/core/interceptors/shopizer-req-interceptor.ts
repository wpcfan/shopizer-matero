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
    const language = this.local.get('settings').language ?? environment.defaultLanguage;

    const clonedReq = req.clone({
      params: req.params
        .set('lang', language)
        .set(
          'store',
          !req.url.includes('/v1/private/user/profile') &&
            !req.url.includes('/v1/languages') &&
            !req.url.includes('/v1/countries')
            ? localStorage.getItem('store') ?? environment.defaultStore
            : environment.defaultStore
        ),
    });
    return next.handle(clonedReq);
  }
}
