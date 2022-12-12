import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LoginRes, Signup } from '@models';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(private loginService: LoginService, private http: HttpClient) {}

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
}
