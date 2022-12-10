import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LoginRes, Signup } from '@models';
import { BehaviorSubject, map, merge, Observable, of, share, switchMap, tap } from 'rxjs';
import { isEmptyObject } from './helpers';
import { User } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  private user$ = new BehaviorSubject<User>({});

  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }

  login(username: string, password: string): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${this.url}/v1/private/login`, {
      username,
      password,
    });
  }

  register(param: Partial<Signup>): Observable<any> {
    return this.http.post(`${this.url}/v1/store/signup`, param);
  }

  refresh() {
    return this.http.get<LoginRes>(`${this.url}/v1/auth/refresh`, {});
  }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }
  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }
}
