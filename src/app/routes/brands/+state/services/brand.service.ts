import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { Manufacturer, Pageable } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class BrandService {
  url = environment.apiUrl + '/v1';

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
        manufacturers: Manufacturer[];
      }>(`${this.url}/private/manufacturers/`, { params })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.manufacturers,
          } as Pageable<Manufacturer>;
        })
      );
  }

  update(id: number, manufacturer: Partial<Manufacturer>) {
    return this.http.put<Manufacturer>(`${this.url}/private/manufacturer/${id}`, manufacturer, {
      params: { lang: '_all' },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/private/manufacturer/${id}`);
  }

  create(manufacturer: Partial<Manufacturer>) {
    return this.http.post<Manufacturer>(`${this.url}/private/manufacturer`, manufacturer);
  }

  getById(id: number) {
    return this.http.get<Manufacturer>(`${this.url}/manufacturer/${id}`, {
      params: { lang: '_all' },
    });
  }

  unique(code: string): Observable<ValidationErrors | null> {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/private/manufacturer/unique`, { params: { code } })
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }
}
