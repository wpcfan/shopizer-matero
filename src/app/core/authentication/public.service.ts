import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Language } from '@models';

@Injectable({ providedIn: 'root' })
export class PublicService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  languages() {
    return this.http.get<Language[]>(`${this.url}/v1/languages`);
  }

  countries() {
    return this.http.get<string[]>(`${this.url}/v1/countries`);
  }
}
