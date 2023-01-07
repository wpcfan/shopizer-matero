import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Params } from '@angular/router';
import { environment } from '@env/environment';
import { Pageable } from '@models';
import { ContentPage } from '@models/content';
import { map, Observable } from 'rxjs';

@Injectable()
export class ContentPageService {
  url = environment.apiUrl + '/v1/private/content/page';
  listUrl = environment.apiUrl + '/v1/private/content/pages';
  getUrl = environment.apiUrl + '/v1/content/pages';
  constructor(private http: HttpClient) {}

  create(data: Partial<ContentPage>) {
    return this.http.post<{ id: number }>(this.url, data);
  }

  update(id: number, data: Partial<ContentPage>) {
    return this.http.put(this.url + '/' + id, data);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  get(code: string): Observable<ContentPage> {
    return this.http.get<ContentPage>(this.getUrl + '/' + code, { params: { lang: '_all' } });
  }

  list(params: Params): Observable<Pageable<ContentPage>> {
    let p = params;
    if (!p.page) {
      p = { ...p, page: 0 };
    }
    if (!p.count) {
      p = { ...p, count: environment.defaultPageSize };
    }
    return this.http
      .get<{
        totalPages: number;
        number: number;
        recordsTotal: number;
        recordsFiltered: number;
        items: ContentPage[];
      }>(this.listUrl, { params: p })
      .pipe(
        map(it => ({
          totalPages: it.totalPages,
          number: it.number,
          recordsTotal: it.recordsTotal,
          recordsFiltered: it.recordsFiltered,
          data: it.items,
        }))
      );
  }

  unique(code: string): Observable<ValidationErrors | null> {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/${code}/exists`)
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }
}
