import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Params } from '@angular/router';
import { environment } from '@env/environment';
import { Pageable, TaxClass } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class TaxService {
  url = environment.apiUrl + '/v1/private/tax';
  constructor(private http: HttpClient) {}

  list(params: Params): Observable<Pageable<TaxClass>> {
    return this.http
      .get<{
        recordsTotal: number;
        recordsFiltered: number;
        number: number;
        totalPages: number;
        items: TaxClass[];
      }>(this.url + '/class', { params })
      .pipe(
        map(it => ({
          recordsTotal: it.recordsTotal,
          recordsFiltered: it.recordsFiltered,
          number: it.number,
          totalPages: it.totalPages,
          data: it.items,
        }))
      );
  }

  create(data: Partial<TaxClass>): Observable<TaxClass> {
    return this.http.post<TaxClass>(`${this.url}/class`, data);
  }

  update(id: number, data: Partial<TaxClass>): Observable<void> {
    return this.http.put<void>(`${this.url}/class/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/class/${id}`);
  }

  getByCode(code: string): Observable<TaxClass> {
    return this.http.get<TaxClass>(`${this.url}/class/${code}`);
  }

  unique(code: string): Observable<ValidationErrors | null> {
    return this.http
      .get<{ exists: boolean }>(`${this.url}/class/unique`, { params: { code } })
      .pipe(map(res => (res.exists ? { unique: true } : null)));
  }
}
