import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Country, Language } from '@models';

/**
 * These are public apis that do not require authentication,
 * and they are located in the references-api section of the swagger docs
 */
@Injectable({ providedIn: 'root' })
export class PublicService {
  url = environment.apiUrl + '/v1';
  constructor(private http: HttpClient) {}

  languages() {
    return this.http.get<Language[]>(`${this.url}/languages`);
  }

  countries() {
    return this.http.get<Country[]>(`${this.url}/country`);
  }
}
