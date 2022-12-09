import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Group, Language, Profile } from '@models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  user() {
    return this.http.get<Profile>(`${this.url}/v1/private/user/profile`);
  }

  languages() {
    return this.http.get<Language[]>(`${this.url}/v1/languages`);
  }

  countries() {
    return this.http.get<string[]>(`${this.url}/v1/countries`);
  }

  groups() {
    return this.http.get<Group[]>(`${this.url}/v1/sec/private/groups`);
  }

  update(param: Partial<Profile>, id: number, merchant: string) {
    return this.http.put<Profile>(`${this.url}/v1/private/user/${id}`, param, {
      params: { store: merchant },
    });
  }
}
