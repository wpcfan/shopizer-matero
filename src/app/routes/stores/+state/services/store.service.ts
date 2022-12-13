import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Currency, Measure, Merchant, Pageable } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class StoreService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  stores(page = 0, filterParams?: Record<string, string>, pageSize = environment.defaultPageSize) {
    const params = { count: pageSize.toString(), page: page.toString() };
    if (filterParams) {
      Object.assign(params, filterParams);
    }
    return this.http.get<Pageable<Merchant>>(`${this.url}/v1/private/stores`, {
      params,
    });
  }

  currencies() {
    return this.http.get<Currency[]>(`${this.url}/v1/currency`);
  }

  measures(): Observable<Measure> {
    return this.http
      .get<{ measures: string[]; weights: string[] }>(`${this.url}/v1/measures`)
      .pipe(map(({ measures, weights }) => ({ dimensions: measures, weights })));
  }

  zones() {
    return this.http.get<Zone[]>(`${this.url}/v1/zones`);
  }

  retailers(): Observable<Merchant[]> {
    return this.http
      .get<Pageable<Merchant>>(`${this.url}/v1/private/stores`, {
        params: {
          start: 0,
          length: 1500,
          retailers: true,
        },
      })
      .pipe(map(({ data }) => data));
  }
}
