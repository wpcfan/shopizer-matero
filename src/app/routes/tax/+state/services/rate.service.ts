import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { PublicService } from '@core';
import { environment } from '@env/environment';
import { TaxRate } from '@models';
import { map } from 'rxjs';

@Injectable()
export class RateService {
  url = environment.apiUrl + '/v1/private/tax';
  constructor(private http: HttpClient, private publicService: PublicService) {}

  list(params: Params) {
    return this.http
      .get<{
        items: TaxRate[];
        totalPages: number;
        number: number;
        recordsTotal: number;
        recordsFiltered: number;
      }>(`${this.url}/rates`, {
        params,
      })
      .pipe(
        map(it => ({
          recordsTotal: it.recordsTotal,
          recordsFiltered: it.recordsFiltered,
          totalPages: it.totalPages,
          number: it.number,
          data: it.items,
        }))
      );
  }

  create(data: Partial<TaxRate>) {
    return this.http.post<TaxRate>(`${this.url}/rate`, data);
  }

  update(id: number, data: Partial<TaxRate>) {
    return this.http.put<void>(`${this.url}/rate/${id}`, {
      ...data,
      store: localStorage.getItem('store'),
    });
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/rate/${id}`);
  }

  unique(code: string) {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/rate/unique`, { params: { code } })
      .pipe(map(it => (it.exists ? { unique: true } : null)));
  }

  getById(id: number) {
    return this.http.get<TaxRate>(`${this.url}/rate/${id}`);
  }

  countries() {
    return this.publicService.countries();
  }
}
