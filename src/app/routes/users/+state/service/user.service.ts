import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Pageable, Profile } from '@models';

@Injectable()
export class UserService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Pageable<Profile>>(`${this.url}/v1/private/users?`);
  }
}
