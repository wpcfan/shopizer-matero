import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Category, Pageable } from '@models';
import { flatMap } from 'lodash';
import { map, Observable } from 'rxjs';

const getFlatCategories = (categories: Category[]): Category[] => {
  return flatMap(
    categories.map(category =>
      category.children && category.children.length > 0
        ? [category, ...getFlatCategories(category.children)]
        : [category]
    )
  );
};

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
            data: getFlatCategories(it.categories),
          } as Pageable<Category>;
        })
      );
  }

  update(id: number, category: Partial<Category>) {
    return this.http.put<Category>(`${this.url}/v1/category/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/v1/category/${id}`);
  }

  create(category: Partial<Category>) {
    return this.http.post<Category>(`${this.url}/v1/private/category`, category);
  }

  getById(id: number) {
    return this.http.get<Category>(`${this.url}/v1/category/${id}`);
  }

  unique(code: string) {
    return this.http.get(`${this.url}/v1/category/unique`, { params: { code } });
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
      .pipe(map(it => getFlatCategories(it.categories)));
  }
}
