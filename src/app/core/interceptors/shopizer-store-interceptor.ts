import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class ShopizerStoreInterceptor implements HttpInterceptor {
  constructor(private local: LocalStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      !req.url.includes(environment.apiUrl) ||
      req.url.includes('/v1/private/user/profile') ||
      // req.url.includes('/v1/private/stores') ||
      req.url.includes('/v1/languages') ||
      req.url.includes('/v1/countries')
    ) {
      return next.handle(req);
    }
    const clonedReq = req.clone({
      params: req.params.set('store', localStorage.getItem('store') ?? environment.defaultStore),
    });
    return next.handle(clonedReq);
  }
}
