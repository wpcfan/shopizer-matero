import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { Category, Pageable } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  url = environment.apiUrl;
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
        categories: Category[];
      }>(`${this.url}/v1/category`, {
        params,
      })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.categories,
          } as Pageable<Category>;
        })
      );
  }

  update(id: number, category: Partial<Category>) {
    return this.http.put<Category>(`${this.url}/v1/private/category/${id}`, category, {
      params: { lang: '_all' },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/v1/private/category/${id}`);
  }

  create(category: Partial<Category>) {
    return this.http.post<Category>(`${this.url}/v1/private/category`, category);
  }

  getById(id: number) {
    return this.http.get<Category>(`${this.url}/v1/category/${id}`, { params: { lang: '_all' } });
  }

  unique(code: string): Observable<ValidationErrors | null> {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/v1/private/category/unique`, { params: { code } })
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }

  allCategories(): Observable<Category[]> {
    return this.http
      .get<{
        totalPages: number;
        recordsTotal: number;
        recordsFiltered: number;
        number: number;
        categories: Category[];
      }>(`${this.url}/v1/category`, { params: { count: '1000' } })
      .pipe(map(it => it.categories));
  }

  toggleVisible(id: number, visible: boolean) {
    return this.http.patch(`${this.url}/v1/private/category/${id}/visible`, { visible });
  }

  moveToParent(id: number, parentId: number) {
    return this.http.put(`${this.url}/v1/private/category/${id}/move/${parentId}`, null);
  }
}
