import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Group, Merchant, Profile } from '@models';
import { PublicService } from './public.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private publicService: PublicService) {}

  user() {
    return this.http.get<Profile>(`${this.url}/v1/private/user/profile`);
  }

  groups() {
    return this.http.get<Group[]>(`${this.url}/v1/sec/private/groups`);
  }

  languages() {
    return this.publicService.languages();
  }

  countries() {
    return this.publicService.countries();
  }

  zones(countryCode: string) {
    return this.publicService.zones(countryCode);
  }

  stores() {
    return this.http.get<Merchant[]>(`${this.url}/v1/private/stores/names`);
  }

  update(param: Partial<Profile>, id: number, merchant: string) {
    return this.http.put<Profile>(`${this.url}/v1/private/user/${id}`, param, {
      params: { store: merchant },
    });
  }
}
