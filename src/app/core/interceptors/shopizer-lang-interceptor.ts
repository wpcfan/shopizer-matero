import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class ShopizerLanguageInterceptor implements HttpInterceptor {
  constructor(private local: LocalStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.apiUrl) || req.url.includes('/v1/languages')) {
      return next.handle(req);
    }
    const language = this.local.get('settings').language ?? environment.defaultLanguage;

    const clonedReq = req.clone({
      params: req.params.set('lang', language),
    });
    return next.handle(clonedReq);
  }
}
