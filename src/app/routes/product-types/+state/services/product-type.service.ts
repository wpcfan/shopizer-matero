import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { Pageable, ProductType } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductTypeService {
  url = environment.apiUrl + '/v1/private/product/type';

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
        list: ProductType[];
      }>(`${this.url}s`, { params })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.list,
          } as Pageable<ProductType>;
        })
      );
  }

  update(id: number, manufacturer: Partial<ProductType>, lang: string) {
    return this.http.put<ProductType>(`${this.url}/${id}`, manufacturer, {
      params: { lang },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  create(manufacturer: Partial<ProductType>) {
    return this.http.post<ProductType>(`${this.url}`, manufacturer);
  }

  getById(id: number, lang: string) {
    return this.http.get<ProductType>(`${this.url}/${id}`, { params: { lang } });
  }

  unique(code: string): Observable<ValidationErrors | null> {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/unique`, { params: { code } })
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }
}
