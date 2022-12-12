import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { Pageable, Profile } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(page = 0, filterParams?: Record<string, string>, pageSize = 20) {
    const params = { count: pageSize.toString(), page: page.toString() };
    if (filterParams) {
      Object.assign(params, filterParams);
    }
    return this.http.get<Pageable<Profile>>(`${this.url}/v1/private/users?`, {
      params,
    });
  }

  create(data: Partial<Profile>) {
    return this.http.post<Profile>(`${this.url}/v1/private/user/`, {
      ...data,
      userName: data.emailAddress,
    });
  }

  update(id: number, data: Partial<Profile>) {
    return this.http.put<Profile>(`${this.url}/v1/private/user/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/v1/private/user/${id}`);
  }

  getById(id: number) {
    return this.http.get<Profile>(`${this.url}/v1/private/users/${id}`);
  }

  uniqueEmail(email: string): Observable<ValidationErrors | null> {
    return this.http
      .post<{ exists: boolean }>(`${this.url}/v1/private/user/unique`, {
        unique: email,
      })
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }
}
