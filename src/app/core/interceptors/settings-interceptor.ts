import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsInterceptor implements HttpInterceptor {
  constructor(private local: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const settings = this.local.get('settings');
    const language = settings ? settings.language : environment.defaultLanguage;
    return next.handle(
      request.clone({
        headers: request.headers.append('Accept-Language', language),
      })
    );
  }
}
