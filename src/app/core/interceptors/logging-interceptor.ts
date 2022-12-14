import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '@shared';
import { finalize, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private messenger: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req).pipe(
      tap({
        next: event => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: error => (ok = 'failed'),
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        this.messenger.add(msg);
      })
    );
  }
}
