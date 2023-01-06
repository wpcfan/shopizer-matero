import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { Pageable, ProductOptionValue } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductOptionValueService {
  url = environment.apiUrl + '/v1/private/product/option/value';
  listUrl = environment.apiUrl + '/v1/private/product/options/values';

  constructor(private http: HttpClient) {}

  list(page = 0, filterParams?: Record<string, string>, pageSize = environment.defaultPageSize) {
    const params = { count: pageSize.toString(), page: page.toString() };
    if (filterParams) {
      Object.assign(params, filterParams);
    }
    return this.http
      .get<{
        totalPages: number;
        recordsTotal: number;
        recordsFiltered: number;
        number: number;
        optionValues: ProductOptionValue[];
      }>(`${this.listUrl}`, { params })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.optionValues,
          } as Pageable<ProductOptionValue>;
        })
      );
  }

  update(id: number, manufacturer: Partial<ProductOptionValue>) {
    return this.http.put<ProductOptionValue>(`${this.url}/${id}`, manufacturer, {
      params: { lang: '_all' },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  create(manufacturer: Partial<ProductOptionValue>) {
    return this.http.post<ProductOptionValue>(`${this.url}`, manufacturer);
  }

  getById(id: number) {
    return this.http.get<ProductOptionValue>(`${this.url}/${id}`, { params: { lang: '_all' } });
  }

  unique(code: string): Observable<ValidationErrors | null> {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/unique`, { params: { code } })
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }
}
