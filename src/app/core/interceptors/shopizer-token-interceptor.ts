import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication';
import { environment } from '@env/environment';
import { LoginRes } from '@models';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap } from 'rxjs';

@Injectable()
export class ShopizerTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;

  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private LOGIN_ROUTE = '/auth/login';
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (
      req.url.includes(environment.apiUrl) &&
      !req.url.includes('login') &&
      !req.url.includes('signup')
    ) {
      const token = rememberMe ? localStorage.getItem('token') : sessionStorage.getItem('token');
      if (!token) {
        this.router.navigate([this.LOGIN_ROUTE]);
        return next.handle(req);
      }

      req = this.addAuthenticationToken(req, rememberMe);
    }
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.handle401Error(req, next, rememberMe);
        } else {
          throw err;
        }
      })
    );
  }

  handle401Error(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    rememberMe: boolean
  ): Observable<HttpEvent<unknown>> {
    // 如果过期
    if (this.refreshTokenInProgress) {
      // 如果 refreshTokenInProgress 为真, 我们需要等到 refreshTokenSubject 有非 null 值
      // 此时才意味着新的 token 已经准备好了，我们可以重试请求
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next.handle(this.addAuthenticationToken(req, rememberMe))),
        tap(() => {
          this.refreshTokenInProgress = false;
        })
      );
    } else {
      this.refreshTokenInProgress = true;

      // 设置 refreshTokenSubject 为 null，这样后继的请求会等待新 token 的生成
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((res: LoginRes) => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(res.token);
          if (rememberMe) {
            localStorage.setItem('token', res.token);
          } else {
            sessionStorage.setItem('token', res.token);
          }
          return next.handle(this.addAuthenticationToken(req, rememberMe));
        }),
        catchError(err => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(null);
          if (rememberMe) {
            localStorage.removeItem('token');
          } else {
            sessionStorage.removeItem('token');
          }
          this.router.navigate([this.LOGIN_ROUTE]);
          return next.handle(req);
        })
      );
    }
  }

  addAuthenticationToken(request: HttpRequest<unknown>, rememberMe: boolean): HttpRequest<unknown> {
    const accessToken = rememberMe
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token');

    // 如果 access token 是 null，说明用户没有登录
    // 直接返回原来的请求
    if (!accessToken) {
      return request;
    }

    // clone 请求, 添加 header
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
  }
}
