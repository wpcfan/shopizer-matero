import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Params } from '@angular/router';
import { environment } from '@env/environment';
import { Pageable } from '@models';
import { ContentBox } from '@models/content';
import { map, Observable } from 'rxjs';

@Injectable()
export class ContentBoxService {
  url = environment.apiUrl + '/v1/private/content/box';
  listUrl = environment.apiUrl + '/v1/private/content/boxes';
  constructor(private http: HttpClient) {}

  create(data: Partial<ContentBox>) {
    return this.http.post<{ id: number }>(this.url, data);
  }

  update(id: number, data: Partial<ContentBox>) {
    return this.http.put(this.url + '/' + id, data);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  get(id: number): Observable<ContentBox> {
    return this.http.get<ContentBox>(this.url + '/' + id);
  }

  list(params: Params): Observable<Pageable<ContentBox>> {
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
        items: ContentBox[];
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
